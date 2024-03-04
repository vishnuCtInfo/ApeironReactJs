import React, { useEffect, useRef, useState } from "react";
import logo_png from "../images/logo/logo.png";
import { PeraWalletConnect } from "@perawallet/connect";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import logo_dark_png from "../images/logo/logo-dark.png";
import { useNavigate } from "react-router-dom";
import PeraWallet from "../images/layout/PeraWallet.png";
import bitcoin2_png from "../images/layout/bitcoin2.png";
import defly_logo from "../images/layout/DeflyWallet--circle-black.svg";
import axios from "axios";
import Header from "../Components/Header";
import { useDispatch } from "react-redux";
import { IsAuthenticated } from "../Utils/Auth";
import { redux_setLogin } from "../redux-tools/userSlice";
import Footer from "../Components/Footer";

const Graph = () => {
  let tvScriptLoadingPromise;
  const navigate = useNavigate();

  const onLoadScriptRef = useRef();

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

  const dispatch = useDispatch();
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

  return (
    <div className="body header-fixed is_dark">
      <Header />
      <div className="tradingview-widget-container">
        <div id="tradingview_1b8d2" />
      </div>
      <Footer />
    </div>
  );
};

export default Graph;
