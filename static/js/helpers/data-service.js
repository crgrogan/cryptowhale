// get ticker price and render to screen
export const getTicker = (currency) => {
  const tickerPriceElement = document.getElementById("ticker-price");
  let lastPrice = null;
  let tickerWs = new WebSocket(
    `wss://stream.binance.com:9443/ws/${currency.toLowerCase()}@trade`
  );

  tickerWs.onmessage = (e) => {
    let data = JSON.parse(e.data);
    let price = parseFloat(data.p).toFixed(2);
    tickerPriceElement.innerText = price;
    tickerPriceElement.style.color =
      !lastPrice || lastPrice === price
        ? "black"
        : price < lastPrice
        ? "red"
        : "green";
    lastPrice = price;
  };
};

// get candlestick data and render candlestick chart to screen
export const getCandlestick = (currency, interval) => {
  const chartElement = document.getElementById("chart");
  const url = `https://api.binance.com/api/v3/klines?symbol=${currency}&interval=${interval}`;
  let candlesticksArr = [];
  let chart = LightweightCharts.createChart(chartElement, {
    width: 600,
    height: 300,
    layout: {
      backgroundColor: "#000000",
      textColor: "rgba(255, 255, 255, 0.9)",
    },
    grid: {
      vertLines: {
        color: "rgba(197, 203, 206, 0.5)",
      },
      horzLines: {
        color: "rgba(197, 203, 206, 0.5)",
      },
    },
    crosshair: {
      mode: LightweightCharts.CrosshairMode.Normal,
    },
    rightPriceScale: {
      borderColor: "rgba(197, 203, 206, 0.8)",
    },
    timeScale: {
      borderColor: "rgba(197, 203, 206, 0.8)",
    },
  });

  let candleSeries = chart.addCandlestickSeries({
    upColor: "#009933",
    downColor: "#ff1a1a",
    borderDownColor: "#ff1a1a",
    borderUpColor: "#009933",
    wickDownColor: "#ff1a1a",
    wickUpColor: "#009933",
  });

  fetch(url)
    .then((res) => res.json())
    .then((candlesticks) => {
      candlesticks.forEach((candle) => {
        let [time, open, high, low, close] = candle;
        let candleObj = {
          time: time / 1000, // binance gives timestamp including milliseconds, divide by 1000 to counteract this
          open,
          high,
          low,
          close,
        };
        candlesticksArr.push(candleObj);
      });
      candleSeries.setData(candlesticksArr);
    });

  // update chart with new candles from websocket stream
  let candlestickWs = new WebSocket(
    `wss://stream.binance.com:9443/ws/${currency.toLowerCase()}@kline_${interval}`
  );

  candlestickWs.onmessage = (e) => {
    let data = JSON.parse(e.data);
    let newCandlestick = data.k;
    candleSeries.update({
      time: newCandlestick.t / 1000,
      open: newCandlestick.o,
      high: newCandlestick.h,
      low: newCandlestick.l,
      close: newCandlestick.c,
    });
  };
};
