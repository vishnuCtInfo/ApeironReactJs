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
import { IsAuthenticated } from "../Utils/Auth";
import { redux_setLogin } from "../redux-tools/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";
import { API_minnet_account_info_get, API_testnet_account_info_get } from "../Services/userAPI";
 
const AccountInfo = () => {
  const navigate = useNavigate();
  const walletAddress = useSelector((state) => state.wallet.address);

  const [bitcoin, setBitcoin] = useState(false);
  const [bbitcoin, setBbitcoin] = useState("Alls");
  const [filterCoinData, setFilterCoinData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const getMainnetAccountData = async () => {
    setBbitcoin("Buy/Sell Arbitrage Opportunities");
    setIsLoader(true);
    try {
      const data = await API_minnet_account_info_get(walletAddress);
      setFilterCoinData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false);
    }

    // axios({
    //   method: "get",
    //   url: `${configJSON?.baseUrl}${configJSON?.getAccountInfoMainnetEndPointURL}${walletAddress}/`,
    //   // url: "http://34.202.125.96:8000/get-account-info-mainnet/G2G6LINUFCC4O4FSYTHLGEPSGEHSVSH7NFTZZE3Y5QIGAXARLN63PIC6JE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     console.log("account ", res);
    //     setIsLoader(false);
    //     setFilterCoinData(res?.data);
    //   })
    //   .catch((err) => {
    //     setIsLoader(false);
    //     console.log({ err });
    //   });
  };

  const getTestNetAccountData = async() => {
    setBbitcoin("Buy/Sell Arbitrage Opportunities");
    setIsLoader(true); try {
      const data = await API_testnet_account_info_get(walletAddress);
      setFilterCoinData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false);
    }
    // axios({
    //   method: "get",
    //   url: `${configJSON?.baseUrl}${configJSON?.getAccountInfoTestnetEndPointURL}${walletAddress}/`,
    //   // url: "http://34.202.125.96:8000/get-account-info-testnet/G2G6LINUFCC4O4FSYTHLGEPSGEHSVSH7NFTZZE3Y5QIGAXARLN63PIC6JE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     console.log({ res });
    //     setIsLoader(false);
    //     setFilterCoinData(res?.data);
    //   })
    //   .catch((err) => {
    //     setIsLoader(false);
    //     console.log({ err });
    //   });
  };

  const onHandleBitcoinDropdown = () => {
    if (bitcoin == true) {
      setBitcoin(false);
    } else {
      setBitcoin(true);
    }
  };

  useEffect(()=>{
    if(walletAddress){
      getMainnetAccountData();
      getTestNetAccountData();
    }
  },[walletAddress])

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
                <div className="ct_filter_aria_main">
                  <div
                    className={
                      bitcoin == true
                        ? "ct_select-menu active ct_max_w_100"
                        : "ct_select-menu ct_max_w_100"
                    }
                    onClick={onHandleBitcoinDropdown}
                  >
                    <div className="ct_select-btn">
                      <span className="ct_sBtn-text">{bbitcoin}</span>
                      <i className="fa-solid fa-angle-down"></i>
                    </div>
                    <ul className="ct_options">
                      <li
                        className="ct_option"
                        value="Buy/Sell Arbitrage Opportunities"
                        onClick={() =>
                          setBbitcoin("Buy/Sell Arbitrage Opportunities")
                        }
                      >
                        <span className="ct_option-text">
                          Buy/Sell Arbitrage Opportunities
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
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
                                    Arbitrage Opportunities for {item?.ticker}:
                                  </p>
                                  <p>
                                    Buy on exchange {item?.min_exchange} at
                                    price{" "}
                                    <i class="fa-solid fa-arrow-right-long  mx-1"></i>
                                    <span className=" ct_green_text">
                                      {item?.min_price}
                                    </span>
                                  </p>
                                  <p>
                                    Sell on exchange {item?.max_exchange} at
                                    price{" "}
                                    <i class="fa-solid fa-arrow-right-long  mx-1"></i>
                                    <span className="ct_green_text">
                                      {item?.max_price}
                                    </span>
                                  </p>
                                  <p>
                                    Potential profit percentage
                                    <i class="fa-solid fa-arrow-right-long mx-1"></i>{" "}
                                    <span className="ct_green_text">
                                      {item?.profit_percentage}
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

export default AccountInfo;
