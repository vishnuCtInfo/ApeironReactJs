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
import { redux_setLogin } from "../redux-tools/userSlice";
import { IsAuthenticated } from "../Utils/Auth";
import { useDispatch } from "react-redux";
import CloseDropdown from "../Components/CloseDropdown";
import Footer from "../Components/Footer";
export const configJSON = require("../Pages/Config");

const PoolsData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [providerDefault, setProviderDefault] = useState("Provider");
  const [filterCoinData, setFilterCoinData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [supportedData, setSupportedData] = useState();

  const onHandleGetData = () => {
    setIsLoader(true);
    axios({
      method: "get",
      url: configJSON?.baseUrl + configJSON?.poolsEndPointURL,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoader(false);
        console.log("pool ", res);
        setFilterCoinData(res?.data);
      })
      .catch((error) => {
        setIsLoader(false);
        console.log("pool error", { error });
      });
  };

  const getCurrancyData = async () => {
    try {
      const { data } = await axios.get(
        configJSON.baseUrl + configJSON.SupportedVsCurrenciesEndPointURL
      );
      console.log("suport", data);
      setSupportedData(data);
    } catch (error) {
      console.log("currancy error is : ", error);
    }
  };

  useEffect(() => {
    onHandleGetData();
    getCurrancyData();
    const { token } = IsAuthenticated();
    console.log("token is : ", token);
    if (token === null || token === undefined) {
      dispatch(redux_setLogin(false));
    } else {
      dispatch(redux_setLogin(true));
    }
  }, []);

  return (
    <div className="body header-fixed is_dark">
      <Header />
      <section className="coin-list mt-5 pt-5">
        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              <div
                onClick={() => setDropdown(!dropdown)}
                className={
                  dropdown ? "ct_select-menu2 active" : "ct_select-menu2"
                }
              >
                <div className="ct_select-btn2">
                  <span className="ct_sBtn-text2">{providerDefault}</span>
                  <i className="fa-solid fa-angle-down"></i>
                </div>
                {dropdown && (
                  <>
                    <CloseDropdown callback={() => setDropdown(!dropdown)} />
                    <ul
                      onClick={() => setDropdown(!dropdown)}
                      className="ct_options2"
                    >
                      {supportedData &&
                        Object?.keys(supportedData)?.map((key) => (
                          <li
                            className="ct_option2"
                            onClick={() =>
                              setProviderDefault(`${key} ${supportedData[key]}`)
                            }
                          >
                            <span className="ct_option-text2">
                              {key} {supportedData[key]}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
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
              {
                // isLoader == false && providerDefault == "Providers" &&
                isLoader == false && (
                  <div className="coin-list__main">
                    <div className="flat-tabs">
                      <div className="content-tab">
                        <div className="content-inner ct_token_table">
                          <table className="table ">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Pairs</th>
                                <th scope="col">Fee</th>
                                <th scope="col">Liquidity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Provider</th>
                                <th scope="col">Token Ratio</th>
                                <th scope="col">Price 24h</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filterCoinData &&
                                filterCoinData?.slice(0, 50)?.map((item, i) => (
                                  <tr>
                                    <td style={{ color: "#FFF" }}>{i + 1}</td>
                                    <td style={{ color: "#FFF" }}>
                                      {item?.asset_1_id} /{" "}
                                      {item?.asset_2_id !== null
                                        ? item?.asset_2_id
                                        : "Algo"}
                                    </td>
                                    <td
                                      className="boild"
                                      style={{ color: "#FFF" }}
                                    >
                                      {item?.fee}
                                    </td>
                                    <td className="up">{item?.liquidity}</td>
                                    <td
                                      className="boild"
                                      style={{ color: "#FFF" }}
                                    >
                                      {item?.price}
                                    </td>
                                    <td
                                      className="boild"
                                      style={{ color: "#FFF" }}
                                    >
                                      {item?.provider}
                                    </td>
                                    <td
                                      className="boild"
                                      style={{ color: "#FFF" }}
                                    >
                                      {item?.token_ratio}
                                    </td>
                                    <td style={{ color: "#FFF" }}>
                                      <div>{item?.price24h}</div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default PoolsData;
