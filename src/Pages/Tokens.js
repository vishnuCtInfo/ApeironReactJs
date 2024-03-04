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
import { useDispatch } from "react-redux";
import { IsAuthenticated } from "../Utils/Auth";
import { redux_setLogin } from "../redux-tools/userSlice";
import { Dropdown } from "react-bootstrap";
import CloseDropdown from "../Components/CloseDropdown";
import Footer from "../Components/Footer";
export const configJSON = require("../Pages/Config");

const Tokens = () => {
  const navigate = useNavigate();

  const [bitcoin, setBitcoin] = useState(false);
  const [bbitcoin, setBbitcoin] = useState("All");
  const [oned, setOneD] = useState(false);
  const [provider, setProvider] = useState(false);
  const [onedDropdown, setoneDdropdown] = useState("1D");
  const [providerDefault, setProviderDefault] = useState("Providers");
  const [AssetsDefault, setAssetsDefault] = useState("Assets");
  const [defaltCoinMxc, setDefaltCoinMxc] = useState("MXCDefault");
  const [isMxDefalut, setIsMxDefalut] = useState(false);
  const [isAssets, setIsAssets] = useState(false);
  const [coinData, setCoinData] = useState([]);
  const [filterData, setFilterData] = useState("");
  const [filterCoinData, setFilterCoinData] = useState([]);
  const [providerData, setProviderData] = useState([]);
  const [selectProviderData, setSelectProviderData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [officialAssets, setOfficialAssets] = useState([]);
  const [mxcCoinData, setMxcCoinData] = useState([]);
  const [kuCoinData, setKuCoinData] = useState([]);
  const [binacaCoinData, setBinacaCoinData] = useState([]);

  const getProviderData = () => {
    setIsLoader(true);
    const data = {
      currency: "usd",
    };
    axios({
      method: "post",
      url: configJSON.baseUrl + configJSON.ProviderEndPointURL,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        console.log('providers: ',res?.data)
        setIsLoader(false);
        setProviderData(res?.data);
      })
      .catch((err) => {
        setIsLoader(false);
        console.log({ err });
      });
  };

  const getSelectedProvider = (item) => {
    setProviderDefault(item?.name);
    axios({
      method: "get",
      url:
        configJSON.baseUrl +
        `${configJSON.AssetsListEndPointURL}?provider=${item?.id}&currency=usd`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setSelectProviderData(res?.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const onHandleGetData = () => {
    setIsLoader(true);
    axios({
      method: "get",
      url: configJSON?.baseUrl + configJSON?.GetCoinDataEndPointURL,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoader(false);
        console.log({ res });
        setCoinData(res?.data);
        setFilterCoinData(res?.data);
      })
      .catch((error) => {
        setIsLoader(false);
        console.log({ error });
      });
  };

  const onHandleBitcoinDropdown = () => {
    if (bitcoin == true) {
      setBitcoin(false);
    } else {
      setBitcoin(true);
    }
  };
  const onHandleIdDropdown = () => {
    if (oned == true) {
      setOneD(false);
    } else {
      setOneD(true);
    }
  };


  const onHanldeFilterData = (event) => {
    setFilterData(event.target.value);
    if (event.target.value != "") {
      const data = coinData.filter((item) => {
        if (
          item?.name?.toLowerCase().includes(event.target.value.toLowerCase())
        ) {
          return item;
        }
      });
      setFilterCoinData(data);
      console.log({ data });
    } else {
      setFilterCoinData(coinData);
      console.log({ coinData });
    }
  };

  const onHandleProvider = () => {
    if (provider == true) {
      setProvider(false);
    } else {
      setProvider(true);
    }
  };
  const onHandleAssetsDropdown = () => {
    if (isAssets == true) {
      setIsAssets(false);
    } else {
      setIsAssets(true);
    }
  };

  const onHandleAssetsDropdown2 = () => {
    if (isMxDefalut == true) {
      setIsMxDefalut(false);
    } else {
      setIsMxDefalut(true);
    }
  };

  const getOfficialAssets = () => {
    axios({
      // url: "https://apeiron.finance:8000/transactionapi/algorand_offical_assets",
      url: configJSON?.baseUrl + configJSON?.officialAssetsEndPointURL,
      method: "get",
    })
      .then((res) => {
        console.log({ res });
        setOfficialAssets(res?.data?.algorand_assets);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const changeAssetsDropDownValue = (val) => {
    if (val == "Assets") {
      setAssetsDefault(val);
    } else {
      setAssetsDefault(val);
      setProviderDefault("Providers");
      setDefaltCoinMxc("MXCDefault");
    }
  };

  const changeAssetsDropDownValue2 = (val) => {
    if (val == "MXCDefault") {
      setDefaltCoinMxc(val);
    } else {
      setDefaltCoinMxc(val);
      setAssetsDefault("Assets");
      setProviderDefault("Providers");
    }
  };

  const getMxcCoinData = () => {
    axios({
      // url: "https://apeiron.finance:8000/tokenapi/get_mxc_data",      
      url: configJSON?.baseUrl + configJSON?.getMXCDataEndPointURL,
      method: "get",
    })
      .then((res) => {
        setMxcCoinData(res?.data?.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const getKuCoinData = () => {
    axios({
      // url: "https://apeiron.finance:8000/tokenapi/get_kucoin_data",     
      url: configJSON?.baseUrl + configJSON?.getKuCoinDataEndPointURL,
      method: "get",
    })
      .then((res) => {
        setKuCoinData(res?.data?.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const getBinacaCoinData = () => {
    axios({
      // url: "https://apeiron.finance:8000/tokenapi/get_binance_data",     
      url: configJSON?.baseUrl + configJSON?.getBinanceDataEndPointURL,
      method: "get",
    })
      .then((res) => {
        setBinacaCoinData(res?.data?.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const changeProviderDropDownValue = (val) => {
    getSelectedProvider(val);
    setProviderDefault(val?.name);
    setAssetsDefault("Assets");
  };

  const dispatch = useDispatch();
  useEffect(() => {
    onHandleGetData();
    getProviderData();
    getOfficialAssets();
    getMxcCoinData();
    getBinacaCoinData();
    getKuCoinData();
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
            <div className="col-md-12">
              <div className="ct_filter_aria_main">
                <div
                  className={
                    bitcoin === true
                      ? "ct_select-menu active"
                      : "ct_select-menu"
                  }
                  onClick={onHandleBitcoinDropdown}
                >
                  <div className="ct_select-btn">
                    <span className="ct_sBtn-text">{bbitcoin}</span>
                    <i className="fa-solid fa-angle-down"></i>
                  </div>
                  {bitcoin && (
                    <>
                      <CloseDropdown callback={onHandleBitcoinDropdown} />
                      <ul className="ct_options">
                        {
                          isLoader == false && (
                            <li
                              className="ct_option"
                              value="All"
                              onClick={() => setBbitcoin("All")}
                            >
                              <span className="ct_option-text">All</span>
                            </li>
                          )
                          /* {coinData && coinData?.map((item) => (
                                                        <li className="ct_option" value={item?.name} onClick={() => setBbitcoin(item?.name)}>
                                                            <img src={item?.image} />
                                                            <span className="ct_option-text">{item?.name}</span>
                                                        </li>
                                                    ))} */
                        }
                      </ul>
                    </>
                  )}
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div
                    onClick={onHandleIdDropdown}
                    className={`ct_select-menu2 ${
                      oned === true ? "active" : ""
                    } `}
                  >
                    <div className="ct_select-btn2">
                      <span className="ct_sBtn-text2">{onedDropdown}</span>
                      <i className="fa-solid fa-angle-down"></i>
                    </div>
                    {oned && (
                      <>
                        <CloseDropdown callback={onHandleIdDropdown} />
                        <ul
                          className="ct_options2"
                          onClick={onHandleIdDropdown}
                        >
                          <li
                            className="ct_option2"
                            onClick={() => setoneDdropdown("1D")}
                          >
                            <span className="ct_option-text2">1D</span>
                          </li>
                          <li
                            className=" ct_option2"
                            onClick={() => setoneDdropdown("2D")}
                          >
                            <span className="ct_option-text2">2D</span>
                          </li>
                          <li
                            className="ct_option2"
                            onClick={() => setoneDdropdown("3D")}
                          >
                            <span className="ct_option-text2">3D</span>
                          </li>
                          <li
                            className=" ct_option2"
                            onClick={() => setoneDdropdown("4D")}
                          >
                            <span className="ct_option-text2">4D</span>
                          </li>
                          <li
                            className=" ct_option2"
                            onClick={() => setoneDdropdown("5D")}
                          >
                            <span className="ct_option-text2">5D</span>
                          </li>
                          <li
                            className="ct_option2"
                            onClick={() => setoneDdropdown("6D")}
                          >
                            <span className="ct_option-text2">6D</span>
                          </li>
                        </ul>
                      </>
                    )}
                  </div>

                  <div className="ct_srch_filter_input">
                    <input
                      type="text"
                      className="form-control"
                      value={filterData}
                      onChange={(e) => onHanldeFilterData(e)}
                      placeholder="Filter tokens"
                    />
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                </div>

                <div
                  onClick={onHandleProvider}
                  className={
                    provider === true
                      ? "ct_select-menu2 active"
                      : "ct_select-menu2"
                  }
                >
                  <div className="ct_select-btn2">
                    <span className="ct_sBtn-text2">{providerDefault}</span>
                    <i className="fa-solid fa-angle-down"></i>
                  </div>
                  {provider && (
                    <>
                      <CloseDropdown callback={onHandleProvider} />
                      <ul onClick={onHandleProvider} className="ct_options2">
                        <li
                          className="ct_option2"
                          onClick={() => setProviderDefault("Providers")}
                        >
                          <span className="ct_option-text2">Providers</span>
                        </li>
                        {isLoader == false &&
                          providerData &&
                          providerData.map(
                            (item) =>
                              item?.active == true && (
                                <li
                                  className="ct_option2"
                                  value={item?.name}
                                  onClick={() =>
                                    changeProviderDropDownValue(item)
                                  }
                                >
                                  <span className="ct_option-text2">
                                    {item?.name}
                                  </span>
                                </li>
                              )
                          )}
                      </ul>
                    </>
                  )}
                </div>

                <div
                  onClick={onHandleAssetsDropdown}
                  className={
                    isAssets === true
                      ? "ct_select-menu2 active"
                      : "ct_select-menu2"
                  }
                >
                  <div className="ct_select-btn2">
                    <span className="ct_sBtn-text2">{AssetsDefault}</span>
                    <i className="fa-solid fa-angle-down"></i>
                  </div>
                  {isAssets && (
                    <>
                      <CloseDropdown callback={onHandleAssetsDropdown} />
                      <ul
                        onClick={onHandleAssetsDropdown}
                        className="ct_options2"
                      >
                        <li
                          className="ct_option2"
                          onClick={() => changeAssetsDropDownValue("Assets")}
                        >
                          <span className="ct_option-text2">Assets</span>
                        </li>
                        <li
                          className="ct_option2"
                          onClick={() =>
                            changeAssetsDropDownValue("Official Assets")
                          }
                        >
                          <span className="ct_option-text2">
                            Official Assets
                          </span>
                        </li>
                      </ul>
                    </>
                  )}
                </div>

                <div
                  onClick={onHandleAssetsDropdown2}
                  className={
                    isMxDefalut === true
                      ? "ct_select-menu2 active"
                      : "ct_select-menu2"
                  }
                >
                  <div className="ct_select-btn2">
                    <span className="ct_sBtn-text2">{defaltCoinMxc}</span>
                    <i className="fa-solid fa-angle-down"></i>
                  </div>
                  {isMxDefalut && (
                    <>
                      <CloseDropdown callback={onHandleAssetsDropdown2} />
                      <ul
                        onClick={onHandleAssetsDropdown2}
                        className="ct_options2"
                      >
                        <li
                          className="ct_option2"
                          onClick={() =>
                            changeAssetsDropDownValue2("MXCDefault")
                          }
                        >
                          <span className="ct_option-text2">MXCDefault</span>
                        </li>
                        <li
                          className="ct_option2"
                          onClick={() => changeAssetsDropDownValue2("MXC")}
                        >
                          <span className="ct_option-text2">MXC</span>
                        </li>
                        <li
                          className="ct_option2"
                          onClick={() => changeAssetsDropDownValue2("KuCoin")}
                        >
                          <span className="ct_option-text2">KuCoin</span>
                        </li>
                        <li
                          className="ct_option2"
                          onClick={() => changeAssetsDropDownValue2("Binance")}
                        >
                          <span className="ct_option-text2">Binance</span>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              </div>
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
              {isLoader == false && AssetsDefault !== "Assets" && (
                <div className="coin-list__main">
                  <div className="flat-tabs">
                    <div className="content-tab">
                      <div className="content-inner ct_token_table">
                        <table className="table ">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Token Name</th>
                              <th scope="col">Creator Address</th>
                              <th scope="col">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {officialAssets &&
                              officialAssets?.slice(0, 50)?.map((item, i) => (
                                <tr>
                                  <td>{i + 1}</td>
                                  <td>
                                    <div>
                                      <span>{item?.params?.name}</span>
                                    </div>
                                  </td>
                                  <td className="boild">
                                    ${item?.params.creator}
                                  </td>
                                  <td className="boild">
                                    {item?.params?.total}
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
              {isLoader == false &&
                providerDefault == "Providers" &&
                AssetsDefault == "Assets" &&
                defaltCoinMxc == "MXCDefault" && (
                  <div className="coin-list__main">
                    <div className="flat-tabs">
                      <div className="content-tab">
                        <div className="content-inner ct_token_table">
                          <table className="table ">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Token name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Change</th>
                                <th scope="col">Tvl Stable</th>
                                <th scope="col">Tvl</th>
                                <th scope="col">Volume</th>
                                <th scope="col"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {filterCoinData && bbitcoin == "All"
                                ? filterCoinData
                                    ?.slice(0, 50)
                                    ?.map((item, i) => (
                                      <tr>
                                        <td style={{ color: "#FFF" }}>
                                          {i + 1}
                                        </td>
                                        <td style={{ color: "#FFF" }}>
                                          <div>
                                            <span>{item?.name}</span>{" "}
                                            <span className="unit">
                                              {item?.ticker}
                                            </span>
                                          </div>
                                        </td>
                                        <td
                                          className="boild"
                                          style={{ color: "#FFF" }}
                                        >
                                          ${item?.price.toFixed(6)}
                                        </td>
                                        {item?.change24h >= 0 ? (
                                          <td className="up">
                                            {item?.change24h.toFixed(6)}%
                                          </td>
                                        ) : (
                                          <td style={{ color: "#ff2b2b" }}>
                                            {item?.change24h.toFixed(6)}%
                                          </td>
                                        )}
                                        <td
                                          className="boild"
                                          style={{ color: "#FFF" }}
                                        >
                                          {item?.tvl_stable.toFixed(6)}
                                        </td>
                                        <td
                                          className="boild"
                                          style={{ color: "#FFF" }}
                                        >
                                          {item?.tvl.toFixed(6)}
                                        </td>
                                        <td
                                          className="boild"
                                          style={{ color: "#FFF" }}
                                        >
                                          ${item?.volume24h.toFixed(6)}
                                        </td>
                                        <td style={{ color: "#FFF" }}>
                                          <div
                                            id={`total-revenue-chart-${i + 1}`}
                                          ></div>
                                        </td>
                                      </tr>
                                    ))
                                : filterCoinData?.map(
                                    (item, i) =>
                                      item?.name == bbitcoin && (
                                        <tr>
                                          <td style={{ color: "#FFF" }}>
                                            {i + 1}
                                          </td>
                                          <td style={{ color: "#FFF" }}>
                                            <div>
                                              <span>{item?.name}</span>{" "}
                                              <span className="unit">
                                                {item?.ticker}
                                              </span>
                                            </div>
                                          </td>
                                          <td
                                            className="boild"
                                            style={{ color: "#FFF" }}
                                          >
                                            ${item?.price.toFixed(6)}
                                          </td>
                                          <td
                                            className="up"
                                            style={{ color: "#FFF" }}
                                          >
                                            {item?.change24h.toFixed(6)}%
                                          </td>
                                          <td
                                            className="boild"
                                            style={{ color: "#FFF" }}
                                          >
                                            {item?.tvl_stable.toFixed(6)}
                                          </td>
                                          <td
                                            className="boild"
                                            style={{ color: "#FFF" }}
                                          >
                                            {item?.tvl.toFixed(6)}
                                          </td>
                                          <td
                                            className="boild"
                                            style={{ color: "#FFF" }}
                                          >
                                            ${item?.volume24h.toFixed(6)}
                                          </td>
                                          <td style={{ color: "#FFF" }}>
                                            <div
                                              id={`total-revenue-chart-${
                                                i + 1
                                              }`}
                                            ></div>
                                          </td>
                                        </tr>
                                      )
                                  )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              {isLoader == false &&
                providerDefault !== "Providers" &&
                defaltCoinMxc == "MXCDefault" && (
                  <div className="coin-list__main">
                    <div className="flat-tabs">
                      <div className="content-tab">
                        <div className="content-inner ct_token_table">
                          <table className="table ">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Assets name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Change 1h</th>
                                <th scope="col">Change 24h</th>
                                <th scope="col">TVL</th>
                                <th scope="col">TVL Stable</th>
                                <th scope="col">Volume</th>
                                <th scope="col">Market Cap</th>
                                <th scope="col">Views 1h</th>
                                <th scope="col">Views 24h</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectProviderData &&
                                selectProviderData?.map((item, i) => (
                                  <tr>
                                    {console.log({ selectProviderData })}
                                    <td>{i + 1}</td>
                                    <td className="boild">{item?.ticker}</td>
                                    <td className="boild">
                                      {item?.price?.toFixed(6)}
                                    </td>
                                    <td className="up">
                                      {item?.change1h?.toFixed(6)}
                                    </td>
                                    <td className="up">
                                      {item?.change24h?.toFixed(6)}
                                    </td>
                                    <td className="boild">
                                      {item?.tvl?.toFixed(6)}
                                    </td>
                                    <td className="boild">
                                      {item?.tvl_stable?.toFixed(6)}
                                    </td>
                                    <td className="boild">
                                      {item?.volume24h?.toFixed(6)}
                                    </td>
                                    <td className="boild">
                                      {item?.market_cap?.toFixed(6)}
                                    </td>
                                    <td className="boild">{item?.views1h}</td>
                                    <td className="boild">{item?.views24h}</td>
                                    <td>
                                      <div></div>
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
              {isLoader == false &&
                defaltCoinMxc == "MXC" &&
                providerDefault == "Providers" &&
                AssetsDefault == "Assets" && (
                  <div className="coin-list__main">
                    <div className="flat-tabs">
                      <div className="content-tab">
                        <div className="content-inner ct_token_table">
                          <table className="table ">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Assets name</th>
                                <th scope="col">Target</th>
                                <th scope="col">Market Name</th>
                                <th scope="col">Trust Score</th>
                                <th scope="col">Last</th>
                                <th scope="col">Volume</th>
                                <th scope="col">Bid Ask Spread Percentage</th>
                              </tr>
                            </thead>
                            <tbody>
                              {mxcCoinData &&
                                mxcCoinData?.map((item, i) => (
                                  <tr>
                                    {console.log({ mxcCoinData })}
                                    <td>{i + 1}</td>
                                    <td className="boild">{item?.base}</td>
                                    <td className="boild">{item?.target}</td>
                                    <td className="up">{item?.market_name}</td>
                                    <td className="up">{item?.trust_score}</td>
                                    <td className="boild">{item?.last}</td>
                                    <td className="boild">{item?.volume}</td>
                                    <td className="boild">
                                      {item?.bid_ask_spread_percentage}
                                    </td>
                                    <td>
                                      <div></div>
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

              {isLoader == false &&
                defaltCoinMxc == "KuCoin" &&
                providerDefault == "Providers" &&
                AssetsDefault == "Assets" && (
                  <div className="coin-list__main">
                    <div className="flat-tabs">
                      <div className="content-tab">
                        <div className="content-inner ct_token_table">
                          <table className="table ">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Assets name</th>
                                <th scope="col">Target</th>
                                <th scope="col">Market Name</th>
                                <th scope="col">Trust Score</th>
                                <th scope="col">Last</th>
                                <th scope="col">Volume</th>
                                <th scope="col">Bid Ask Spread Percentage</th>
                              </tr>
                            </thead>
                            <tbody>
                              {kuCoinData &&
                                kuCoinData?.map((item, i) => (
                                  <tr>
                                    {console.log({ kuCoinData })}
                                    <td>{i + 1}</td>
                                    <td className="boild">{item?.base}</td>
                                    <td className="boild">{item?.target}</td>
                                    <td className="up">{item?.market_name}</td>
                                    <td className="up">{item?.trust_score}</td>
                                    <td className="boild">{item?.last}</td>
                                    <td className="boild">{item?.volume}</td>
                                    <td className="boild">
                                      {item?.bid_ask_spread_percentage}
                                    </td>
                                    <td>
                                      <div></div>
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

              {isLoader == false &&
                defaltCoinMxc == "Binance" &&
                providerDefault == "Providers" &&
                AssetsDefault == "Assets" && (
                  <div className="coin-list__main">
                    <div className="flat-tabs">
                      <div className="content-tab">
                        <div className="content-inner ct_token_table">
                          <table className="table ">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Assets name</th>
                                <th scope="col">Target</th>
                                <th scope="col">Market Name</th>
                                <th scope="col">Trust Score</th>
                                <th scope="col">Last</th>
                                <th scope="col">Volume</th>
                                <th scope="col">Bid Ask Spread Percentage</th>
                              </tr>
                            </thead>
                            <tbody>
                              {binacaCoinData &&
                                binacaCoinData?.map((item, i) => (
                                  <tr>
                                    {console.log({ binacaCoinData })}
                                    <td>{i + 1}</td>
                                    <td className="boild">{item?.base}</td>
                                    <td className="boild">{item?.target}</td>
                                    <td className="up">{item?.market_name}</td>
                                    <td className="up">{item?.trust_score}</td>
                                    <td className="boild">{item?.last}</td>
                                    <td className="boild">{item?.volume}</td>
                                    <td className="boild">
                                      {item?.bid_ask_spread_percentage}
                                    </td>
                                    <td>
                                      <div></div>
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
  );
};
export default Tokens;
