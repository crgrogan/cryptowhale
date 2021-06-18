import { app } from "../index";
import { getContainerWidth } from "./get-container-width";
import { changeCurrency } from "./change-currency";
import { numberFormatter } from "./number-formatter";

/* get ticker price and render to screen */
export const getTicker = (coinList) => {
  // loop through coin list and build params list
  let params = coinList.map((coin) => {
    return `${coin.replace("/", "").toLowerCase()}@miniTicker`;
  });

  // connect to websocket
  let tickerWs = new WebSocket(`wss://stream.binance.com:9443/ws`);

  tickerWs.onopen = () => {
    tickerWs.send(
      JSON.stringify({
        method: "SUBSCRIBE",
        params: params,
        id: 1,
      })
    );
  };

  tickerWs.onmessage = (e) => {
    let data = JSON.parse(e.data);
    // only execute if stream returns market data, as opposed to the null
    // object that is returned on subscribe/unsubscribe
    if (data.s) {
      let price = parseFloat(data.c);
      let high = parseFloat(data.h);
      let low = parseFloat(data.l);
      let volume = numberFormatter(data.q);
      let percentChange = (((data.c - data.o) / data.o) * 100).toFixed(2);
      // find dom element with the id that matches the currency symbol
      const tickerPriceElement = document.getElementById(`${data.s}-price`);
      const tickerChangeElement = document.getElementById(`${data.s}-change`);
      const tickerHighElement = document.getElementById(`${data.s}-high`);
      const tickerLowElement = document.getElementById(`${data.s}-low`);
      const tickerVolumeElement = document.getElementById(`${data.s}-volume`);
      if (tickerPriceElement) {
        tickerPriceElement.innerText = price;
      }
      if (tickerChangeElement) {
        tickerChangeElement.innerText = `${percentChange}%`;
        if (percentChange > 0) {
          tickerChangeElement.style.color = "green";
        } else {
          tickerChangeElement.style.color = "red";
        }
      }
      if (tickerHighElement) {
        tickerHighElement.innerText = high;
      }
      if (tickerLowElement) {
        tickerLowElement.innerText = low;
      }
      if (tickerVolumeElement) {
        tickerVolumeElement.innerText = volume;
      }
    }
  };

  // unsubscribe from websocket stream
  const unsubscribe = (e) => {
    const newCurrency = e.target.textContent;
    tickerWs.send(
      JSON.stringify({
        method: "UNSUBSCRIBE",
        params: params,
        id: 1,
      })
    );
    app.load(newCurrency);
  };

  // add event listener for currency change in navbar
  const currencyOptions = document.querySelectorAll(".currency-option");
  currencyOptions.forEach((option) =>
    option.addEventListener("click", (e) => {
      if (window.location.pathname === "/") {
        const currencyChanged = changeCurrency(e);
        // only unsubscribe from stream if current
        // currency was changed to a new currency
        if (currencyChanged) {
          unsubscribe(e);
        }
      } else {
        changeCurrency(e);
      }
    })
  );
};

/* get candlestick data and render candlestick chart to screen */
export const getCandlestick = (currency, interval) => {
  const chartElement = document.getElementById("candlestick-chart");
  const url = `https://api.binance.com/api/v3/klines?symbol=${currency.replace(
    "/",
    ""
  )}&interval=${interval}`;

  let candlesticksArr = [];
  let lastPrice = null;

  // configure general style for chart
  let chart = LightweightCharts.createChart(chartElement, {
    width: getContainerWidth(),
    height: 300,
    layout: {
      backgroundColor: "#1a1a1a",
      textColor: "rgba(255, 255, 255, 0.9)",
    },
    grid: {
      vertLines: {
        color: "rgba(197, 203, 206, 0.1)",
      },
      horzLines: {
        color: "rgba(197, 203, 206, 0.1)",
      },
    },
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
    },
    crosshair: {
      mode: LightweightCharts.CrosshairMode.Normal,
    },
    rightPriceScale: {
      borderColor: "rgba(197, 203, 206, 0.6)",
    },
    timeScale: {
      borderColor: "rgba(197, 203, 206, 0.6)",
    },
  });

  // resize chart on window resize
  const resize = new ResizeObserver(() => {
    chart.resize(getContainerWidth(), 300);
  });

  resize.observe(document.body);

  chart.applyOptions({
    priceFormat: {
      type: "custom",
      minMove: "0.00000001",
      formatter: (price) => {
        if (price < 0.001) return parseFloat(price).toFixed(8);
        else if (price >= 0.001 && price < 1)
          return parseFloat(price).toFixed(6);
        else return parseFloat(price);
      },
    },
    priceScale: {
      autoScale: true,
    },
    localization: {
      locale: "en-US",
      priceFormatter: (price) => {
        if (price < 0.001) return parseFloat(price).toFixed(8);
        else if (price >= 0.001 && price < 1)
          return parseFloat(price).toFixed(6);
        else return parseFloat(price);
      },
    },
  });

  // configure style for candlestck chart
  let candleSeries = chart.addCandlestickSeries({
    upColor: "#009933",
    downColor: "#ff1a1a",
    borderDownColor: "#ff1a1a",
    borderUpColor: "#009933",
    wickDownColor: "#ff1a1a",
    wickUpColor: "#009933",
  });

  // fetch data from binance api and pass to candlestick chart
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
    const candleStickTickerElement = document.getElementById(
      "candlestick-info-ticker"
    );
    let price = parseFloat(newCandlestick.c);
    candleStickTickerElement.textContent = price;
    candleStickTickerElement.style.color =
      !lastPrice || lastPrice === price
        ? "black"
        : price < lastPrice
        ? "red"
        : "green";
    lastPrice = price;

    candleSeries.update({
      time: newCandlestick.t / 1000,
      open: newCandlestick.o,
      high: newCandlestick.h,
      low: newCandlestick.l,
      close: newCandlestick.c,
    });
  };
};
