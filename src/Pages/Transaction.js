import React, { useEffect, useState } from "react";
import { PeraWalletConnect } from "@perawallet/connect";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import logo_png from "../images/logo/logo.png";
import logo_dark_png from "../images/logo/logo-dark.png";
import bitcoin2_png from "../images/layout/bitcoin2.png";
import defly_logo from "../images/layout/DeflyWallet--circle-black.svg";
import PeraWallet from "../images/layout/PeraWallet.png";
import blog_01_jpg from "../images/blog/blog-01.jpg";
import favicon_png from "../images/logo/algo.png";
import "../Style/style.css";
import { useNavigate } from "react-router-dom";
import { message, message as MESSAGE } from "antd";
import axios from "axios";
import Header from "../Components/Header";
import { useDispatch } from "react-redux";
import { IsAuthenticated } from "../Utils/Auth";
import { redux_setLogin } from "../redux-tools/userSlice";
import Footer from "../Components/Footer";
export const configJSON = require("../Pages/Config");

const Transaction = () => {
  const navigate = useNavigate();
  const [isTabMainnet, setIsTabMainnet] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [searchValue2, setSearchValue2] = useState("");

  const [mainnetData, setMainnetData] = useState([]);
  const [searchMainnetData, setSearchMainnetData] = useState([]);

  const [testnetData, setTestnetData] = useState([]);
  const [searchTestnetData, setSearchTestnetData] = useState([]);

  const getMainnetSearchData = (e) => {
    setSearchValue(e.target.value);
    axios({
      method: "get",
      url: `${configJSON?.baseUrl}${configJSON?.getAlgorandTransactionMainEndPointURL}${e.target.value}/`,
      // url: `http://34.202.125.96:8000/get-algorand-transaction-main/${e.target.value}/`,
    })
      .then((res) => {
        console.log(res?.data?.algorand_transactions);
        setSearchMainnetData(res?.data?.algorand_transactions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTestnetSearchData = (e) => {
    setSearchValue2(e.target.value);
    axios({
      method: "get",
      url: `${configJSON?.baseUrl}${configJSON?.getAlgorandTransactionTextEndPointURL}${e.target.value}/`,
    })
      .then((res) => {
        console.log(res?.data?.algorand_transactions);
        setSearchTestnetData(res?.data?.algorand_transactions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMainnetData = () => {
    axios({
      method: "get",
      url:
        configJSON?.baseUrl +
        configJSON?.getAlgorandTransactionMainnetEndPointURL,
      // url: "http://34.202.125.96:8000/algorand_transaction_mainnet",
    })
      .then((res) => {
        setMainnetData(res?.data?.algorand_transactions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTestnetData = () => {
    axios({
      method: "get",
      url:
        configJSON?.baseUrl +
        configJSON?.getAlgorandTransactionTestnetEndPointURL,
      // url: "http://34.202.125.96:8000/algorand_transaction_testnet",
    })
      .then((res) => {
        setTestnetData(res?.data?.algorand_transactions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onHanleClickTab = (val) => {
    if (val == "Mainnet") {
      setIsTabMainnet(true);
    } else {
      setIsTabMainnet(false);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getMainnetData();
    getTestnetData();
    const { token } = IsAuthenticated();
    console.log("token is : ", token);
    if (token === null || token === undefined) {
      dispatch(redux_setLogin(false));
    } else {
      dispatch(redux_setLogin(true));
    }
  }, []);

  useEffect(() => {
    console.log("data mainnet ", mainnetData);
  });

  return (
    <div className="body header-fixed is_dark">
      <Header />
      <section class="pt-5">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="ct_transation_main pb-5">
                <h6 class="mb-3">
                  Algorand Transactions/
                  <a
                    style={{ fontSize: "18px", textDecoration: "underLine" }}
                    href="/pending_transaction"
                  >
                    Pending Transaction
                  </a>
                </h6>
                <div class="ct_transaction_bg_clr">
                  <div class="ct_transaction_tab flat-tabs1">
                    <ul
                      class="nav nav-pills mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li class="nav-item" role="presentation">
                        <button
                          class={
                            isTabMainnet == true
                              ? "nav-link active"
                              : "nav-link"
                          }
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                          onClick={() => onHanleClickTab("Mainnet")}
                        >
                          Mainnet
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class={
                            isTabMainnet == false
                              ? "nav-link active"
                              : "nav-link"
                          }
                          type="button"
                          role="tab"
                          aria-controls="pills-profile"
                          aria-selected="false"
                          onClick={() => onHanleClickTab("Testnet")}
                        >
                          Testnet
                        </button>
                      </li>
                    </ul>

                    {/* tab buttons */}
                    <div className="d-flex align-items-center">
                      {isTabMainnet == true ? (
                        <div className="ct_srch_filter_input">
                          <input
                            type="text"
                            className="form-control"
                            value={searchValue}
                            onChange={(e) => getMainnetSearchData(e)}
                            placeholder="Filter tokens"
                            style={{ width: "300px", marginBottom: "10px" }}
                          />
                          <i
                            className="fa-solid fa-magnifying-glass"
                            style={{ marginBottom: "15px" }}
                          ></i>
                        </div>
                      ) : (
                        <div className="ct_srch_filter_input">
                          <input
                            type="text"
                            className="form-control"
                            value={searchValue2}
                            onChange={(e) => getTestnetSearchData(e)}
                            placeholder="Filter tokens"
                            style={{ width: "300px", marginBottom: "10px" }}
                          />
                          <i
                            className="fa-solid fa-magnifying-glass"
                            style={{ marginBottom: "15px" }}
                          ></i>
                        </div>
                      )}
                    </div>

                    {/* main table  */}
                    <div class="tab-content" id="pills-tabContent">
                      <div
                        class="tab-pane fade show active"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        <div class="table-responsive ct_transation_tble">
                          <table class="table">
                            <thead>
                              <tr>
                                <th>TxID</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Amount</th>
                                <th>Fee</th>
                              </tr>
                            </thead>
                            {isTabMainnet == true ? (
                              <tbody>
                                {searchValue == "" ? (
                                  mainnetData &&
                                  mainnetData?.map((item) => (
                                    <tr>
                                      <td class="ct_text_light_blue">
                                        {item?.id}
                                      </td>
                                      {/* <td class="ct_text_light_blue">33848347</td>
                                                                        <td>22/08/2000</td> */}
                                      <td class="ct_text_light_blue">
                                        {item?.sender?.slice(0, 20)}{" "}
                                        <i class="fa-solid fa-arrow-right-long"></i>
                                      </td>
                                      <td class="ct_text_light_blue">
                                        {item?.[
                                          "payment-transaction"
                                        ]?.receiver?.slice(0, 20)}
                                      </td>
                                      <td>
                                        <span class="ct_light_green_text">
                                          {
                                            item?.["payment-transaction"]
                                              ?.amount
                                          }
                                        </span>
                                      </td>
                                      <td>
                                        <img
                                          src={favicon_png}
                                          alt="image"
                                          class="pe-1"
                                        />
                                        {item?.fee}
                                      </td>
                                    </tr>
                                  ))
                                ) : searchMainnetData?.length !== 0 ? (
                                  searchMainnetData?.map((item) => (
                                    <tr>
                                      <td class="ct_text_light_blue">
                                        {item?.transaction?.id}
                                      </td>
                                      <td class="ct_text_light_blue">
                                        {item?.sender?.slice(0, 20)}{" "}
                                        <i class="fa-solid fa-arrow-right-long"></i>
                                      </td>
                                      <td class="ct_text_light_blue">
                                        {item?.transaction?.[
                                          "asset-transfer-transaction"
                                        ]?.receiver?.slice(0, 20)}
                                      </td>
                                      <td>
                                        <span class="ct_light_green_text">
                                          {
                                            item?.transaction?.[
                                              "asset-transfer-transaction"
                                            ]?.amount
                                          }
                                        </span>
                                      </td>
                                      <td>
                                        <img
                                          src={favicon_png}
                                          alt="image"
                                          class="pe-1"
                                        />
                                        {item?.fee}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colspan="5 "
                                      className="text-center text-white mt-10"
                                    >
                                      No TxId On Mainnet!!
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            ) : (
                              <tbody>
                                {searchValue2 == "" ? (
                                  testnetData &&
                                  testnetData?.map((item) => (
                                    <tr>
                                      <td class="ct_text_light_blue">
                                        {item?.id}
                                      </td>
                                      {/* <td class="ct_text_light_blue">33848347</td>
                                                                        <td>22/08/2000</td> */}
                                      <td class="ct_text_light_blue">
                                        {item?.sender?.slice(0, 20)}
                                        <i class="fa-solid fa-arrow-right-long"></i>
                                      </td>
                                      <td class="ct_text_light_blue">
                                        {item?.[
                                          "payment-transaction"
                                        ]?.receiver?.slice(0, 20)}
                                      </td>
                                      <td>
                                        <span class="ct_light_green_text">
                                          {
                                            item?.["payment-transaction"]
                                              ?.amount
                                          }
                                        </span>
                                      </td>
                                      <td>
                                        <img
                                          src={favicon_png}
                                          alt="image"
                                          class="pe-1"
                                        />
                                        {item?.fee}
                                      </td>
                                      {/* <td>
                                                                            <select name="" id="" class="form-control ct_transparent_select">
                                                                                <option value="Opt-In">Opt-In</option>
                                                                                <option value="Opt-In">Opt-In</option>
                                                                            </select>
                                                                        </td> */}
                                    </tr>
                                  ))
                                ) : searchTestnetData?.length !== 0 ? (
                                  searchTestnetData?.map((item) => (
                                    <tr>
                                      <td class="ct_text_light_blue">
                                        {item?.transaction?.id}
                                      </td>
                                      {/* <td class="ct_text_light_blue">33848347</td>
                                                                        <td>22/08/2000</td> */}
                                      <td class="ct_text_light_blue">
                                        {item?.sender?.slice(0, 20)}
                                        <i class="fa-solid fa-arrow-right-long"></i>
                                      </td>
                                      <td class="ct_text_light_blue">
                                        {item?.transaction?.[
                                          "asset-transfer-transaction"
                                        ]?.receiver?.slice(0, 20)}
                                      </td>
                                      <td>
                                        <span class="ct_light_green_text">
                                          {
                                            item?.transaction?.[
                                              "asset-transfer-transaction"
                                            ]?.amount
                                          }
                                        </span>
                                      </td>
                                      <td>
                                        <img
                                          src={favicon_png}
                                          alt="image"
                                          class="pe-1"
                                        />
                                        {item?.fee}
                                      </td>
                                      {/* <td>
                                                                            <select name="" id="" class="form-control ct_transparent_select">
                                                                                <option value="Opt-In">Opt-In</option>
                                                                                <option value="Opt-In">Opt-In</option>
                                                                            </select>
                                                                        </td> */}
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colspan="5 "
                                      className="text-center text-white mt-10"
                                    >
                                      No TxId On Testnet!!
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            )}
                          </table>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="pills-profile"
                        role="tabpanel"
                        aria-labelledby="pills-profile-tab"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* blog section E */}
      <Footer />
    </div>
  );
};

export default Transaction;
