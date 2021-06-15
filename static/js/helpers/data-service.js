// get ticker price and render to screen
export const getTicker = (currencyList) => {
  // loop through currency list and build url
  let urlParams = currencyList
    .map((currency) => {
      return `${currency.replace("/", "").toLowerCase()}@miniTicker`;
    })
    .join("/");
  let tickerWs = new WebSocket(`wss://stream.binance.com:9443/ws/${urlParams}`);

  tickerWs.onmessage = (e) => {
    let data = JSON.parse(e.data);
    let price = parseFloat(data.c);
    let percentChange = (((data.c - data.o) / data.o) * 100).toFixed(2);
    // find dom element with the id that matches the currency symbol
    const tickerPriceElement = document.getElementById(`${data.s}-price`);
    const tickerChangeElement = document.getElementById(`${data.s}-change`);
    tickerPriceElement.innerText = price;
    if (percentChange > 0) {
      tickerChangeElement.innerText = `+${percentChange}%`;
      tickerChangeElement.style.color = "green";
    } else {
      tickerChangeElement.innerText = `+${percentChange}%`;
      tickerChangeElement.style.color = "red";
    }
  };
};

// get candlestick data and render candlestick chart to screen
export const getCandlestick = (currency, interval) => {
  const chartElement = document.getElementById("chart");
  const url = `https://api.binance.com/api/v3/klines?symbol=${currency.replace(
    "/",
    ""
  )}&interval=${interval}`;
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
    `wss://stream.binance.com:9443/ws/${currency
      .replace("/", "")
      .toLowerCase()}@kline_${interval}`
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
