import React, { useEffect, useState } from "react";
import { PeraWalletConnect } from "@perawallet/connect";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
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
import { IsAuthenticated } from "../Utils/Auth";
import { redux_setLogin } from "../redux-tools/userSlice";
import { useDispatch } from "react-redux";
import Footer from "../Components/Footer";
export const configJSON = require("../Pages/Config");

const HotMovers2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoader, setIsLoader] = useState(false);
  const [filterCoinData, setFilterCoinData] = useState([]);

  const getHotCoinsData = () => {
    setIsLoader(true);
    axios({
      method: "get",
      url: configJSON?.baseUrl + configJSON?.hotMovers2EndPointURL,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log({ res });
        setIsLoader(false);
        setFilterCoinData(res?.data?.data);
      })
      .catch((error) => {
        setIsLoader(false);
        console.log({ error });
      });
  };

  useEffect(() => {
    getHotCoinsData();
    const { token } = IsAuthenticated();
    console.log("token is : ", token);
    if (token === null || token === undefined) {
      dispatch(redux_setLogin(false));
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
                  Hot Movers
                </h6>
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
                {isLoader == false && (
                  <div className="coin-list__main">
                    <div className="flat-tabs">
                      <div className="content-tab">
                        <div className="content-inner ct_token_table">
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Token Name</th>
                                <th scope="col">Percentage Change (24h)</th>
                                <th scope="col">Market Cap</th>
                                <th scope="col">Current Price</th>
                                <th scope="col">Total Volume</th>
                                <th scope="col">Circulating Supply</th>
                                <th scope="col">Total Supply</th>
                                <th scope="col">Ath </th>
                                <th scope="col">Ath Change Percentage</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filterCoinData &&
                                filterCoinData?.map((item, i) => (
                                  <tr>
                                    <td style={{ color: "#FFF" }}>{i + 1}</td>
                                    <td style={{ color: "#FFF" }}>
                                      <div>
                                        <span>{item?.name}</span>{" "}
                                      </div>
                                    </td>
                                    <td
                                      className="boild"
                                      style={{ color: "#FFF" }}
                                    >
                                      ${item?.percentage_change_24h}
                                    </td>
                                    <td className="up">{item?.market_cap}</td>
                                    <td
                                      className="boild"
                                      style={{ color: "#FFF" }}
                                    >
                                      {item?.current_price.toFixed(6)}
                                    </td>
                                    <td
                                      className="boild"
                                      style={{ color: "#FFF" }}
                                    >
                                      {item?.total_volume}
                                    </td>
                                    <td
                                      className="boild"
                                      style={{ color: "#FFF" }}
                                    >
                                      {item?.circulating_supply.toFixed(6)}
                                    </td>
                                    <td
                                      className="boild"
                                      style={{ color: "#FFF" }}
                                    >
                                      {item?.total_supply}
                                    </td>
                                    <td
                                      className="boild"
                                      style={{ color: "#FFF" }}
                                    >
                                      {item?.ath}
                                    </td>
                                    <td
                                      className="boild"
                                      style={{ color: "#FFF" }}
                                    >
                                      {item?.ath_change_percentage.toFixed(6)}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default HotMovers2;
