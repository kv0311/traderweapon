import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const stream = {
  BTCUSDT_PRICE : 'btcusdt@markPrice@1s',
  BNBUSDT_PRICE : 'bnbusdt@markPrice@1s',
  BTCUSDT_1m : 'btcusdt@kline_1m',
  BNBUSDT_1m : 'bnbusdt@kline_1m',
  BTCUSDT_5m : 'btcusdt@kline_5m',
  BNBUSDT_5m : 'bnbusdt@kline_5m',
  BTCUSDT_15m : 'btcusdt@kline_15m',
  BNBUSDT_15m : 'bnbusdt@kline_15m',
  BTCUSDT_1h : 'btcusdt@kline_1h',
  BNBUSDT_1h : 'bnbusdt@kline_1h',
  BTCUSDT_4h : 'btcusdt@kline_4h',
  BNBUSDT_4h : 'bnbusdt@kline_4h',
  BTCUSDT_1D : 'btcusdt@ticker',
  BNBUSDT_1D : 'bnbusdt@ticker',
}

function App() {
  const [btcPrice, setBtcPrice ] = useState("");
  const [bnbPrice, setBnbPrice] = useState("");
  const [btcVolumn1m, setBtcVolumn1m] = useState("");
  const [bnbVolumn1m, setBnbVolumn1m] = useState("");
  const [btcVolumn5m, setBtcVolumn5m] = useState("");
  const [bnbVolumn5m, setBnbVolumn5m] = useState("");
  const [btcVolumn15m, setBtcVolumn15m] = useState("");
  const [bnbVolumn15m, setBnbVolumn15m] = useState("");
  const [btcVolumn1h, setBtcVolumn1h] = useState("");
  const [bnbVolumn1h, setBnbVolumn1h] = useState("");
  const [btcVolumn4h, setBtcVolumn4h] = useState("");
  const [bnbVolumn4h, setBnbVolumn4h] = useState("");

  const [btcPriceChange, setBtcPriceChange] = useState(0);
  const [bnbPriceChange, setBnbPriceChange] = useState(0);






  useEffect(() => {
    const socket = new WebSocket(`wss://fstream.binance.com/stream?streams=${stream.BTCUSDT_PRICE}/${stream.BNBUSDT_PRICE}/${stream.BTCUSDT_1m}/${stream.BNBUSDT_1m}/${stream.BNBUSDT_5m}/${stream.BNBUSDT_5m}/${stream.BTCUSDT_15m}/${stream.BNBUSDT_15m}/${stream.BNBUSDT_1h}/${stream.BNBUSDT_1h}/${stream.BNBUSDT_4h}/${stream.BNBUSDT_4h}/${stream.BTCUSDT_1D}/${stream.BNBUSDT_1D}`);

    console.log(`wss://fstream.binance.com/stream?streams=${stream.BTCUSDT_PRICE}/
    ${stream.BNBUSDT_PRICE}/
    ${stream.BTCUSDT_1m}/
    ${stream.BNBUSDT_1m}/
    ${stream.BNBUSDT_5m}/
    ${stream.BNBUSDT_5m}/
    ${stream.BTCUSDT_15m}/
    ${stream.BNBUSDT_15m}/
    ${stream.BTCUSDT_1h}/
    ${stream.BNBUSDT_1h}/
    ${stream.BTCUSDT_4h}/
    ${stream.BNBUSDT_4h}/
    ${stream.BTCUSDT_1D}/
    ${stream.BNBUSDT_1D}`)

    socket.onmessage =  (data) => {
      switch (JSON.parse(data.data).stream) {
        case stream.BTCUSDT_PRICE:
          console.log(parseFloat(JSON.parse(data.data).data.p))
          setBtcPrice(parseFloat(JSON.parse(data.data).data.p));
          break;
        case stream.BNBUSDT_PRICE:
          setBnbPrice(JSON.parse(data.data).data.p);
          break;
        case stream.BTCUSDT_1m:
          setBtcVolumn1m(JSON.parse(data.data).data.k.q);
          break;
        case stream.BNBUSDT_1m:
          setBnbVolumn1m(JSON.parse(data.data).data.k.q);
          break;
        case stream.BTCUSDT_5m:
          setBtcVolumn5m(JSON.parse(data.data).data.k.q);
          break;
        case stream.BNBUSDT_5m:
          setBnbVolumn5m(JSON.parse(data.data).data.k.q);
          break;
        case stream.BTCUSDT_15m:
          setBtcVolumn15m(JSON.parse(data.data).data.k.q);
          break;
        case stream.BNBUSDT_15m:
          setBnbVolumn15m(JSON.parse(data.data).data.k.q);
          break;
        case stream.BTCUSDT_1h:
          setBtcVolumn1h(JSON.parse(data.data).data.k.q);
          break;
        case stream.BNBUSDT_1h:
          setBnbVolumn1h(JSON.parse(data.data).data.k.q);
          break;
        case stream.BTCUSDT_4h:
          setBtcVolumn4h(JSON.parse(data.data).data.k.q);
          break;
        case stream.BNBUSDT_4h:
          setBnbVolumn4h(JSON.parse(data.data).data.k.q);
          break;
        case stream.BTCUSDT_1D:
          console.log(btcPrice)
          // console.log(parseFloat(btcPrice))
          setBtcPriceChange(btcPrice - parseFloat(JSON.parse(data.data).data.o));
          // setBtcPriceChange(JSON.parse(data.data).data.k.q);
          break;
        case stream.BNBUSDT_1D:
          // console.log(JSON.parse(data.data))
          setBnbVolumn4h(JSON.parse(data.data).data.k.q);
          break;
      }
    }

  }, []);

  return (
    <div>
<table>
        <tr>
          <th>Pair</th>
          <th>Price</th>
          <th>24H change Price</th>

          {/* <th>1m Volumn</th>
          <th>5m Volumn</th>
          <th>15m Volumn</th>
          <th>1h Volumn</th>
          <th>4h Volumn</th> */}

        </tr>
        <tr>
          <td>BTC/USDT</td>
          <td>${btcPrice}</td>
          <td>${btcPriceChange}</td>

          {/* <td>${btcVolumn1m}</td>
          <td>${btcVolumn5m}</td>
          <td>${btcVolumn15m}</td>
          <td>${btcVolumn1h}</td>
          <td>${btcVolumn4h}</td> */}
        </tr>
        <tr>
        <td>BNB/USDT</td>
          <td>${bnbPrice}</td>
          {/* <td>${bnbVolumn1m}</td>
          <td>${bnbVolumn5m}</td>
          <td>${bnbVolumn15m}</td>
          <td>${bnbVolumn1h}</td>
          <td>${bnbVolumn4h}</td> */}
        </tr>
      </table>
{/*       
    <p>
      BTC/USDT Price: {btcPrice}
    </p>
    <p>
      BNB/USDT Price: {bnbPrice}
    </p>
    <p>
      BTC/USDT Volumn 15m: {btcVolumn15m}
    </p>
    <p>
      BNB/USDT Volumn 15m: {bnbVolumn15m}
    </p> */}
    </div>
  );
}



export default App;
