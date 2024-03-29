import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message as toast } from "antd";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { IsAuthenticated } from "../Utils/Auth";
import { redux_setLogin } from "../redux-tools/userSlice";
import Footer from "../Components/Footer";
import {
  _BACKEND_BASE_URL,
  _BACKEND_BOT_CEX_TO_CEX_URL,
  _BACKEND_BOT_DEX_OPP_END_GET_URL,
  _BACKEND_BOT_DEX_TO_DEX_URL,
} from "../Services/APIRoutes";

import io from "socket.io-client";
const socket = io.connect("http://192.168.1.37:8000");
// const socket = new WebSocket('ws://192.168.1.37'); // Replace with your actual WebSocket server URL

const Bot = () => {
  let tvScriptLoadingPromise;
  const navigate = useNavigate();
  const cexBotRef = useRef(null);

  const onLoadScriptRef = useRef();

  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.wallet.address);
  const [getData, setGetData] = useState();
  const [getCexData, setGetCexData] = useState([]);

  const [cexBtn, setCexBtn] = useState(
    localStorage.getItem("cex_bot") || false
  );
  const [dexBtn, setDexBtn] = useState(
    localStorage.getItem("dex_bot") || false
  );

  const [dropdownBtn1, setDropdownBtn1] = useState(false);
  const [dropdownCEX, setDropdownCEX] = useState(true);
  const [cexData, setCexData] = useState({
    api_key_binance: "",
    secret_binance: "",
    api_key_huobi: "",
    secret_huobi: "",
    qty: 50,
  });

  const [dexData, setDexData] = useState({
    amount: "",
  });

  const stopCEX_botData = async () => {
    try {
      localStorage.removeItem("cex_bot");
      setCexBtn(false);
      const response = await axios.post(
        { key: undefined },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } catch (error) {
      console.log(error);
      toast.success("bot stop successfully.");
      localStorage.removeItem("cex_bot");
      setCexBtn(false);
    }
  };

  const getCEX_botData = async () => {
    const formData = new FormData();
    if (!cexData?.api_key_binance) return toast.error("Enter binance key");
    if (!cexData?.api_key_huobi) return toast.error("Enter huobi key");
    if (!cexData?.secret_binance) return toast.error("Enter binance secret");
    if (!cexData?.secret_huobi) return toast.error("Enter huobi secret");
    if (!cexData?.qty >= 50) return toast.error("Enter valied Quntity");

    for (const key in cexData) {
      formData.append(key, cexData[key]);
    }
    // let formData = new FormData();
    // formData.append(
    //   "api_key_binance",
    //   "DZE3RSZvdPJcmsVZLehkc7SqyfX8fKQqtEz9CnSaibARorrV7QHBb2VWesTnW722"
    // );
    // formData.append(
    //   "secret_binance",
    //   "bBcaH4GfGRUg58QnXEz9YqFuLo1EpxRTkLy6ShKaoQbp6p3d7unZkCK59UH4btCP"
    // );
    // formData.append("api_key_huobi", "1cf4140c-1hrfj6yhgg-76c65352-c74d0");
    // formData.append("secret_huobi", "07fc71d0-d59fbebd-47859775-ffbf3");
    // formData.append("qty", "60");
    try {
      //call socket

      const handleConsoleData = (data) => {
        console.log("cex data: ", data);
        let newData;
        if (data?.binance_ask) {
          newData = {
            huobi_ask: data.huobi_ask,
            binance_ask: data.binance_ask,
            total_spent: data.total_spent,
            total_earned: data.total_earned,
            profit_or_loss: data.profit_or_loss,
          };
        } else {
          newData = { msg: data };
        }

        setGetCexData((prevData) => [...prevData, newData]);
        // cexBotRef.current.scrollTop = cexBotRef.current.scrollHeight;
      };

      if (socket?.connected) {
        socket.on("console_data", handleConsoleData);
        localStorage.setItem("cex_bot", "true");
        setCexBtn(true);
      }

      toast.success("bot started.");

      const response = await axios.post(
        "https://18.171.200.156:8000/" + _BACKEND_BOT_CEX_TO_CEX_URL,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      // const response = '';
      console.log("bot response", response);
      if (response?.data) {
        setGetCexData(response?.data);
        return;
      } else {
        toast.error(
          response?.error || response?.message || "server internal error"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("server internal error");
      setCexBtn(false);
    }
  };

  const stopDEX_botData = async () => {
    try {
      const response = await axios.post(
        "https://apeiron.finance:8000/" + _BACKEND_BOT_DEX_TO_DEX_URL,
        { key: undefined },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      // const response = '';
      localStorage.setItem("dex_bot", "false");
      setDexBtn(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.success("bot stop successfully");
      localStorage.removeItem("dex_bot");
      setDexBtn(false);
    }
  };

  const getDEX_botData = async () => {
    const formData = new FormData();
    if (!dexData?.mnemonic) return toast.error("Enter mnemonic");
    if (!dexData?.amount) return toast.error("Enter amount");

    for (const key in dexData) {
      formData.append(key, dexData[key]);
    }
    // let data = new FormData();
    // data.append('api_key_binance', 'DZE3RSZvdPJcmsVZLehkc7SqyfX8fKQqtEz9CnSaibARorrV7QHBb2VWesTnW722');
    // data.append('secret_binance', 'bBcaH4GfGRUg58QnXEz9YqFuLo1EpxRTkLy6ShKaoQbp6p3d7unZkCK59UH4btCP');
    // data.append('api_key_huobi', '1cf4140c-1hrfj6yhgg-76c65352-c74d0');
    // data.append('secret_huobi', '07fc71d0-d59fbebd-47859775-ffbf3');
    // data.append('qty', '60');

    try {
      const { data } = await axios.get(
        _BACKEND_BASE_URL + _BACKEND_BOT_DEX_OPP_END_GET_URL
      );
      console.log("get res: ", data);
      setGetData(data);
    } catch (error) {
      toast.error("server error");
      console.log(error);
    }

    try {
      localStorage.setItem("dex_bot", "true");
      setDexBtn(true);
      toast.success("bot start");
      const response = await axios.post(
        "https://apeiron.finance:8000/" + _BACKEND_BOT_DEX_TO_DEX_URL,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // const response = '';
      console.log(response);
    } catch (error) {
      console.log("error--->", error);
      toast.error("bot server internal error");
      setDexBtn(false);
    }
  };

  useEffect(() => {
    onLoadScriptRef.current = createWidget;
    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;
        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_1b8d2") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          width: "100%",
          height: 610,
          symbol: "CRYPTO:ALGOUSD",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "in",
          enable_publishing: true,
          withdateranges: true,
          range: "YTD",
          hide_side_toolbar: false,
          allow_symbol_change: true,
          details: true,
          hotlist: true,
          calendar: true,
          show_popup_button: true,
          popup_width: "1000",
          popup_height: "650",
          container_id: "tradingview_1b8d2",
        });
      }
    }
  }, []);

  useEffect(() => {
    const { token } = IsAuthenticated();
    console.log("token is : ", token);
    if (token === null || token === undefined) {
      dispatch(redux_setLogin(false));
      navigate("/login");
    } else {
      dispatch(redux_setLogin(true));
    }
  }, []);

  const [socketData, setSocketData] = useState([]);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  useEffect(() => {
    const socket = io.connect("http://192.168.1.37:8000");
    setIsSocketConnected(socket);

    // const handleConsoleData = (data) => {
    //   console.log("cex data: ", data);
    //   let newData;
    //   if (data?.binance_ask) {
    //     newData = {
    //       huobi_ask: data.huobi_ask,
    //       binance_ask: data.binance_ask,
    //       total_spent: data.total_spent,
    //       total_earned: data.total_earned,
    //       profit_or_loss: data.profit_or_loss,
    //     };
    //   } else {
    //     newData = { msg: data };
    //   }

    //   setGetCexData((prevData) => [...prevData, newData]);
    //   // cexBotRef.current.scrollTop = cexBotRef.current.scrollHeight;
    // };

    // socket.on("console_data", handleConsoleData);

    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    if (cexBotRef.current) {
      cexBotRef.current.scrollTop = cexBotRef.current.scrollHeight;
    }
  }, [getCexData]);

  // useEffect(() => {
  //   socket?.on("connect", () => {
  //     console.log("Socket connected.");
  //     setIsSocketConnected(true);
  //   });

  //   socket?.on("disconnect", () => {
  //     console.log("Socket disconnected.");
  //     setIsSocketConnected(false);
  //   });

  //   // socket?.on("data", (data) => {
  //   //   console.log("Socket Received data:", data);
  //   //   setSocketData(data);
  //   // });
  //   const handleConsoleLog = (message) => {
  //     if (socketData) setSocketData((prevLogs) => [...prevLogs, message]);
  //   };

  //   // Attach the event handler
  //   socket.on("console_log", handleConsoleLog);

  //   return () => {
  //     socket?.disconnect();
  //   };
  // }, []);

  // const [botStart, setBotStart] = useState(false);
  // const startBot = () => {
  //   if (isSocketConnected) {
  //     if (botStart) {
  //       setBotStart(false);
  //       socket?.emit("stop");
  //     } else {
  //       setBotStart(true);
  //       socket?.emit("start");
  //       console.log(`Socket is started`);
  //     }
  //   }
  // };

  useEffect(() => {
    console.log("Socket :", isSocketConnected);
  }, [isSocketConnected]);

  useEffect(() => {
    console.log("socket data: ", getCexData);
  });

  return (
    <div className="body header-fixed is_dark">
      <Header />
      <section className="pt-5">
        {/* <button
          className={`btn ${botStart ? "btn-danger" : "btn-success"}`}
          onClick={startBot}
        >
          {botStart ? `Stop ${parseFloat(socketData)?.toFixed(2)}` : `Start`}
        </button>
        <br /> */}

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-7 mb-4">
              <div className="tradingview-widget-container">
                <div id="tradingview_1b8d2" />
              </div>
            </div>

            <div className="col-lg-5 mb-4">
              <div className="ct_side_bot_bg">
                <div>
                  <div className="form-group mb-2">
                    <label htmlFor="" className="mb-2">
                      Bot
                    </label>

                    <div className="ct_select_drop">
                      <div
                        className={`ct_wrapper-dropdown ${
                          dropdownBtn1 ? "active" : ""
                        }`}
                        id="ct_custom_dropdown"
                      >
                        <span
                          onClick={() => setDropdownBtn1(!dropdownBtn1)}
                          className="w-100"
                        >
                          <span className="selected-display" id="destination">
                            {/* Select Your Bot */}
                            {dropdownCEX ? "CEX to CEX" : "DEX to DEX"}
                          </span>
                          <svg
                            id="drp-arrow"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="arrow transition-all ml-auto rotate-180"
                          >
                            <path
                              d="M7 14.5l5-5 5 5"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </span>
                        <ul className="ct_custom_dropdown">
                          <li
                            className="item ct_cex_cex_click"
                            onClick={() => {
                              setDropdownCEX(true);
                              setDropdownBtn1(!dropdownBtn1);
                            }}
                          >
                            CEX to CEX
                          </li>
                          <li
                            className="item ct_dex_dex_click"
                            onClick={() => {
                              setDropdownCEX(false);
                              setDropdownBtn1(!dropdownBtn1);
                            }}
                          >
                            DEX to DEX
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {dropdownCEX ? (
                    // ct CEX_CEX
                    <div className="ct_cex_cex show">
                      <div
                        className="ct_empty_box mb-4"
                        ref={cexBotRef}
                        style={{ overflowY: "auto" }}
                      >
                        {getCexData?.map((item, key) =>
                          item?.huobi_ask ? (
                            <div key={key}>
                              <p>
                                Huobi ALGO/USDT ask price: {item?.huobi_ask}
                              </p>
                              <p>
                                Binance ALGO/USDT ask price: {item?.binance_ask}
                              </p>
                              <p>Total Spent: {item?.total_spent}</p>
                              <p>Total Earned: {item?.total_earned}</p>
                              <p>Profit or Loss: {item?.profit_or_loss}</p>
                              <br />
                            </div>
                          ) : (
                            <div key={key}>
                              <p>{item?.msg}</p> <br />
                            </div>
                          )
                        )}
                        {/* {getCexData?.huobi_ask ? (
                          <>
                            <p>
                              Huobi ALGO/USDT ask price :{" "}
                              {getCexData?.huobi_ask}{" "}
                            </p>
                            <p>
                              Binance ALGO/USDT ask price :{" "}
                              {getCexData?.binance_ask}
                            </p>
                            <p>Total Spent : {getCexData?.total_spent} </p>
                            <p>Total Earned : {getCexData?.total_earned} </p>
                            <p>
                              Profit or Loss : {getCexData?.profit_or_loss}{" "}
                            </p>
                          </>
                        ) : (
                          <>{getCexData}</>
                        )} */}
                      </div>
                      <div className="mb-3">
                        <h6 className="mb-2 ct_fs_16 ct_fw_400">Huobi</h6>
                        <div className="mb-2 d-flex align-items-center justify-content-between ct_stop_lose ">
                          <div>
                            <p>Private Key</p>
                          </div>
                          <div>
                            <input
                              type="text"
                              onChange={(e) =>
                                setCexData({
                                  ...cexData,
                                  api_key_huobi: e.target.value,
                                })
                              }
                              className="form-control  ct_input12"
                            />
                            {/* <span className="ct_tooltiptext">Dummy text</span> */}
                          </div>
                        </div>
                        <div className="mb-0 d-flex align-items-center justify-content-between ct_stop_lose">
                          <p>Secret Key</p>

                          <div>
                            <input
                              type="text"
                              onChange={(e) =>
                                setCexData({
                                  ...cexData,
                                  secret_huobi: e.target.value,
                                })
                              }
                              className="form-control  ct_input12"
                            />
                            {/* <span className="ct_tooltiptext">Dummy text</span>  */}
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <h6 className="mb-2 ct_fs_16 ct_fw_400">Binance</h6>
                        <div className="mb-2 d-flex align-items-center justify-content-between ct_stop_lose">
                          <p>Private Key</p>
                          <div className="ct_tooltip">
                            <input
                              type="text"
                              onChange={(e) =>
                                setCexData({
                                  ...cexData,
                                  api_key_binance: e.target.value,
                                })
                              }
                              className="form-control  ct_input12"
                            />
                            <span className="ct_tooltiptext">Dummy text</span>
                          </div>
                        </div>
                        <div className="mb-2 d-flex align-items-center justify-content-between ct_stop_lose">
                          <p>Secret Key</p>

                          <div className="ct_tooltip">
                            <input
                              type="text"
                              onChange={(e) =>
                                setCexData({
                                  ...cexData,
                                  secret_binance: e.target.value,
                                })
                              }
                              className="form-control  ct_input12"
                            />
                            <span className="ct_tooltiptext">Dummy text</span>
                          </div>
                        </div>
                        <div className="mb-0 d-flex align-items-center justify-content-between ct_stop_lose">
                          <p>QTY</p>
                          <div className="ct_plus_minus_main">
                            <div
                              className="value-button"
                              id="decrease"
                              onClick={() => {
                                if (cexData?.qty > 50) {
                                  setCexData({
                                    ...cexData,
                                    qty: cexData?.qty - 1,
                                  });
                                }
                              }}
                            >
                              -
                            </div>
                            <input
                              value={cexData?.qty}
                              min={50}
                              onChange={(e) =>
                                setCexData({ ...cexData, qty: e.target.value })
                              }
                              type="number"
                              id="number"
                            />
                            <div
                              className="value-button"
                              id="increase"
                              onClick={() =>
                                setCexData({
                                  ...cexData,
                                  qty: cexData?.qty + 1,
                                })
                              }
                            >
                              +
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="ct_start_bot_btn pt-2">
                        {cexBtn ? (
                          <button
                            className="btn-action w-100"
                            onClick={stopCEX_botData}
                            style={{ background: "red" }}
                          >
                            Stop Bot
                          </button>
                        ) : (
                          <button
                            className="btn-action w-100"
                            onClick={getCEX_botData}
                          >
                            Start Bot
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    // ct DEX_DEX
                    <div className="ct_dex_dex show">
                      {/* <div className="form-group mb-4 ">
                                                    <div className="d-flex align-items gap-2 mb-2 ct_checkbox_input">
                                                        <input type="checkbox" />
                                                        <label htmlFor="">Tinyman</label>
                                                    </div>

                                                    <div className="d-flex align-items gap-2 mb-2 ct_checkbox_input">
                                                        <input type="checkbox" />
                                                        <label htmlFor="">Pact</label>
                                                    </div>
                                                </div> */}
                      <div
                        className="ct_empty_box mb-4"
                        style={{ height: "352px" }}
                      >
                        {getData &&
                          getData?.map((item, key) => (
                            <p>
                              Asset 1 Name | {item["Asset 1 Name"]} <br />
                              Asset 2 Name | {item["Asset 2 Name"]} <br />
                              Max Sell Exchange | {
                                item["Max Sell Exchange"]
                              }{" "}
                              <br />
                              Max Sell Price | {item["Max Sell Price"]} <br />
                              Min Buy Exchange | {item["Min Buy Exchange"]}{" "}
                              <br />
                              Min Buy Price | {item["Min Buy Price"]} <br />
                              Price Difference | {item["Price Difference"]}{" "}
                              <br />
                              Profit Percentage | {
                                item["Profit Percentage"]
                              }{" "}
                              <br />
                              <hr />
                              <br />
                            </p>
                          ))}
                      </div>
                      {/* <div className="mb-4">
                                                    <label htmlFor="" className="mb-2">Slippage</label>
                                                    <div className="ct_plus_minus_main">
                                                        <div
                                                            className="value-button"
                                                            id="decrease"
                                                            onclick="decreaseValue()"
                                                            value="Decrease Value"
                                                        >
                                                            -
                                                        </div>
                                                        <input type="number" id="number" value="0" />
                                                        <div
                                                            className="value-button"
                                                            id="increase"
                                                            onclick="increaseValue()"
                                                            value="Increase Value"
                                                        >
                                                            +
                                                        </div>
                                                    </div>
                                                </div> */}
                      {/* <div
                  className="mb-4 d-flex align-items-center justify-content-between ct_stop_lose"
                >
                  <p>Stop Loss</p>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div> */}{" "}
                      <div className="ct_bot_flex_11">
                        <div className="mb-3">
                          <div className="mb-2 d-flex align-items-center justify-content-between ct_stop_lose">
                            <p>Mnemonic</p>
                            {/* <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>  */}
                            <input
                              onChange={(e) =>
                                setDexData({
                                  ...dexData,
                                  mnemonic: e.target.value,
                                })
                              }
                              value={dexData?.mnemonic}
                              type="text"
                              className="form-control w-50 ct_input12"
                            />
                          </div>
                          <div className="mb-0 d-flex align-items-center justify-content-between ct_stop_lose">
                            <p>Amount</p>
                            <input
                              onChange={(e) =>
                                setDexData({
                                  ...dexData,
                                  amount: e.target.value,
                                })
                              }
                              value={dexData?.amount}
                              type="number"
                              className="form-control w-50 ct_input12"
                            />
                          </div>
                        </div>

                        <div className="ct_start_bot_btn pt-4">
                          {dexBtn ? (
                            <button
                              className="btn-action w-100"
                              style={{ backgroundColor: "red" }}
                              onClick={stopDEX_botData}
                            >
                              Stop Bot
                            </button>
                          ) : (
                            <button
                              className="btn-action w-100"
                              onClick={getDEX_botData}
                            >
                              Start Bot
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Bot;
