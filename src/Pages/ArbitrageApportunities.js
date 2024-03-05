import React, { useEffect, useState } from "react";
import "../Style/style.css";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { IsAuthenticated } from "../Utils/Auth";
import { redux_setLogin } from "../redux-tools/userSlice";
import CloseDropdown from "../Components/CloseDropdown";
import Footer from "../Components/Footer";
import { redux_setApportunitiesMethod } from "../redux-tools/apportunitySlice";
 

const ArbitrageApportunities = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filterCoinData = useSelector((state) => state.apportunities.data);
  const bbitcoin = useSelector((state) => state.apportunities.method);

  const [bitcoin, setBitcoin] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  useEffect(() => {
    console.log('filter coins', filterCoinData)
    if(filterCoinData?.length){
      setIsLoader(false)
    }else{
      setIsLoader(true)
    }
  }, [filterCoinData]);

  const onHandleBitcoinDropdown = () => {
    if (bitcoin == true) {
      setBitcoin(false);
    } else {
      setBitcoin(true);
    }
  };

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
                <h6 class="mb-3">
                  Arbitrage Oppotunities/
                  <a
                    style={{ fontSize: "18px", textDecoration: "underLine" }}
                    href="/dex_cex/arbitrage/oppotunities"
                  >
                    DEX CEX By Sell Arbitrage Oppotunities
                  </a>
                </h6>
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
                    {bitcoin && (
                      <>
                        <CloseDropdown callback={onHandleBitcoinDropdown} />
                        <ul className="ct_options">
                          <li
                            className="ct_option"
                            value="Buy/Sell Arbitrage Opportunities"
                            onClick={() =>
                              // setBbitcoin("Buy/Sell Arbitrage Opportunities")
                              dispatch(redux_setApportunitiesMethod("Buy/Sell Arbitrage Opportunities"))
                            }
                          >
                            <span className="ct_option-text">
                              Buy/Sell Arbitrage Opportunities
                            </span>
                          </li>
                        </ul>
                      </>
                    )}
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

export default ArbitrageApportunities;
