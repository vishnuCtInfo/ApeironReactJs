import React, { useEffect, useState } from "react";
import { PeraWalletConnect } from "@perawallet/connect";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import Core from "@walletconnect/core";
import { Web3Wallet } from "@walletconnect/web3wallet";
import logo_png from "../images/logo/logo.png";
import logo_dark_png from "../images/logo/logo-dark.png";
import defly_logo from "../images/layout/DeflyWallet--circle-black.svg";
import bitcoin2_png from "../images/layout/bitcoin2.png";
import PeraWallet from "../images/layout/PeraWallet.png";
import "../Style/style.css";
import { useNavigate } from "react-router-dom";
import { message, message as MESSAGE } from "antd";
import axios from "axios";
import Header from "../Components/Header";
import { useDispatch } from "react-redux";
import { IsAuthenticated } from "../Utils/Auth";
import { redux_setLogin } from "../redux-tools/userSlice";
import Footer from "../Components/Footer";
 

const Dex_CexArbitrageApportunities = () => {
  const navigate = useNavigate();

  const [filterCoinData, setFilterCoinData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
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
    <div>
      <div className="body header-fixed is_dark">
        <Header />

        <section className="coin-list mt-5 pt-5">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-12">
                <h6
                  class="mb-3"
                  style={{ fontSize: "18px", textDecoration: "underLine" }}
                >
                  DEX CEX By Sell Arbitrage Oppotunities
                </h6>
                <div className="coin-list__main">
                  <div className="flat-tabs">
                    <div className="content-tab d-flex">
                      <div>
                        {isLoader == true && (
                          <div class="spinner">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        )}
                      </div>
                      <div className=" row">
                        {isLoader == false &&
                          filterCoinData &&
                          filterCoinData?.slice(0, 50)?.map((item, i) => (
                            <div className="col-md-6 mb-4">
                              <div className="ct_token_table">
                                <div className="content">
                                  <p>
                                    Arbitrage Opportunities for {item?.pair}:
                                  </p>
                                  <p>
                                    Exchange Name{" "}
                                    <span className=" ct_green_text">
                                      {item?.exchange_name}
                                    </span>
                                  </p>
                                  <p>
                                    Last Price{" "}
                                    <span className="ct_green_text">
                                      {item?.last_price?.toFixed(6)}
                                    </span>
                                  </p>
                                  <p>
                                    Volume{" "}
                                    <span className="ct_green_text">
                                      {item?.volume}
                                    </span>
                                  </p>
                                  <p>
                                    Arbitrage Percentage{" "}
                                    <span className="ct_green_text">
                                      {item?.arbitrage_percentage?.toFixed(6)}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </div>
  );
};

export default Dex_CexArbitrageApportunities;
