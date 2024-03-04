import React, { useEffect, useState } from "react";
import logo_png from "../images/logo/logo.png";
import logo_dark_png from "../images/logo/logo-dark.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { redux_setLogin } from "../redux-tools/userSlice";
import { IsAuthenticated } from "../Utils/Auth";
import PieChart from "../Components/PieChart";
import Footer from "../Components/Footer";
export const configJSON = require("../Pages/Config");

function AllTransaction() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const walletInfo = useSelector((state) => state?.wallet?.info);
  // const [coinData, setCoinData] = useState([]);
  // const [isLogin, setIsLogin] = useState(false);

  const [cexChartSettings, setCexChartSettings] = useState({
    type: "pie",
    data: {
      labels: ["Amount", "Profit", "Loss"],
      datasets: [
        {
          data: [8141881.2, 4070940.6, 82183],
          backgroundColor: ["#4814B8", "#00C013", "#d50000"],
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
          position: "bottom",
          labels: {
            usePointStyle: true,
          },
        },
      },
    },
  });
  
  const [dexChartSettings, setDexChartSettings] = useState({
    type: "pie",
    data: {
      labels: ["Amount", "Profit", "Loss"],
      datasets: [
        {
          data: [9141881.2, 5070940.6, 62183],
          backgroundColor: ["#4814B8", "#00C013", "#d50000"],
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
          position: "bottom",
          labels: {
            usePointStyle: true,
          },
        },
      },
    },
  });


  // const onHandleGetData = () => {
  //   axios({
  //     method: "get",
  //     url: configJSON?.baseUrl + configJSON?.GetCoinDataEndPointURL,
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       console.log({ res });
  //       setCoinData(res?.data);
  //     })
  //     .catch((error) => {
  //       console.log({ error });
  //     });
  // };

  useEffect(() => {
    // onHandleGetData();
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
    <>
      <Header />

      <section class="coin-list mt-5 pt-5">
        <div class="container mt-5">
          <div class="row">
            <div class="col-md-12">
              {/* <div class="block-text d-flex align-items-center justify-content-between gap-4 flex-wrap">
                <h3 class="heading">Top tokens on Apeiron</h3>
                <div class=" ct_select-menu3 ">
                  <div class=" ct_select-btn3">
                    <span class="ct_sBtn-text3">Ether</span>
                    <i class="fa-solid fa-angle-down"></i>
                  </div>

                  <ul class=" ct_options3">
                    <li class=" ct_option3">
                      <img src="images/layout/bitcoin2.png" alt="" />
                      <span class=" ct_option-text3">Ether</span>
                    </li>
                    <li class=" ct_option3">
                      <img src="images/layout/bitcoin2.png" alt="" />
                      <span class=" ct_option-text3">Ether</span>
                    </li>
                    <li class=" ct_option3">
                      <img src="images/icon/usd-coin-usdc-logo.png" alt="" />
                      <span class=" ct_option-text3">USDCoin</span>
                    </li>
                    <li class=" ct_option3">
                      <img src="images/icon/usd-coin-usdc-logo.png" alt="" />
                      <span class=" ct_option-text3">USDCoin</span>
                    </li>
                    <li class=" ct_option3">
                      <img src="images/layout/bitcoin3.png" alt="" />
                      <span class=" ct_option-text3">Tether USD</span>
                    </li>
                    <li class=" ct_option3">
                      <img src="images/layout/bitcoin3.png" alt="" />
                      <span class="ct_option-text3">Tether USD</span>
                    </li>
                    <li class=" ct_option3">
                      <img src="images/layout/bitcoin.png" alt="" />
                      <span class="ct_option-text3">Wrapped BTC</span>
                    </li>
                  </ul>
                </div>
              </div> */}

              <div></div>
              <div class="mt-4">
                <h6>History</h6>
                <div class=" mt-4">
                  <div class="ct_assets_outline w-100 mb-2  p-2 ">
                    <div class="row align-items-center">
                      <div class="col-md-5">
                        <div class="d-flex align-items-center gap-3 flex-wrap">
                          <div>
                            <h6 class="ct_fs_20">All Transactions</h6>
                            <p class="mb-0">Data Value</p>
                          </div>
                          <div>
                            <h5 class="mb-0">159</h5>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-7">
                        <ul class="d-flex align-items-center gap-3 justify-content-md-end mt-3 mt-md-0">
                          <li>
                            <p class="d-flex align-items-center gap-2">
                              <span class="ct_dot ct_blue_dot"></span>Amount
                            </p>
                            <h6 class="ct_fs_16 mb-0">9,070,940.6</h6>
                          </li>
                          <li>
                            <p class="d-flex align-items-center gap-2">
                              <span class="ct_dot ct_green_dot"></span>Profit
                            </p>
                            <h6 class="ct_fs_16  mb-0">4,070,940.6</h6>
                          </li>
                          <li>
                            <p class="d-flex align-items-center gap-2">
                              <span class="ct_dot ct_red_dot"></span>Loss
                            </p>
                            <h6 class="ct_fs_16 mb-0">940.6</h6>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="progress ct_progress" style={{ height: "10px" }}>
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style={{
                        width: "70%",
                        backgroundColor: "#3B82F6",
                        height: "10px",
                      }}
                    ></div>
                    <div
                      class="progress-bar "
                      role="progressbar"
                      style={{
                        width: "15%",
                        backgroundColor: "#00C013",
                        height: "10px",
                      }}
                    ></div>
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style={{
                        width: "15%",
                        backgroundColor: "#D50000",
                        height: "10px",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div class="pt-5">
                <h4 class="ct_fs_28">Bot Analysis</h4>
              </div>

              <div class="mt-4">
                <ul
                  class="nav nav-pills mb-3 ct_bot_tabs"
                  id="pills-tab"
                  role="tablist"
                >
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      DEX To DEX
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      CEX To CEX
                    </button>
                  </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div class="ct_filter_aria_main mt-4">
                      <select class="form-control ct_custom_select w-auto">
                        <option value=''>Opt-In Assets</option>
                        {walletInfo?.assets ? (
                          walletInfo?.assets?.map((item, key) => (
                            <option value={item}>
                              {item?.asset_amount} &rarr;   {item?.asset_name}
                            </option>
                          ))
                        ) : (
                          <option>Not Found</option>
                        )}
                      </select>
                      <div class="ct_srch_filter_input">
                        <input type="text" class="form-control" />
                        <i class="fa-solid fa-magnifying-glass"></i>
                      </div>
                      <div></div>
                    </div>
                    <div class="coin-list__main ct_cex_to_cex ">
                      <div class="d-flex align-items-center gap-3 flex-wrap">
                        <div>
                          <label for="" class="me-2">
                            From
                          </label>
                          <input type="date" class="ct_custom_select" />
                        </div>
                        <div>
                          <label for="" class="me-2">
                            To
                          </label>
                          <input type="date" class="ct_custom_select" />
                        </div>
                        <div>
                          <label for="" class="me-2">
                            From
                          </label>

                          <input type="time" class="ct_custom_select" />
                        </div>
                        <div>
                          <label for="" class="me-2">
                            To
                          </label>
                          <input type="time" class="ct_custom_select" />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-9">
                          <div class="flat-tabs mt-4">
                            <div class="content-tab mt-5">
                              <div class="content-inner table-responsive ct_token_table ct_bot_analysis_tble">
                                <table class="table ">
                                  <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">From </th>
                                      <th scope="col">To</th>
                                      <th scope="col">Amount(ALGO)</th>
                                      <th scope="col">Transfer</th>
                                      <th scope="col">Time</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>#</td>
                                      <td>1</td>
                                      <td class="ct_text_short">
                                        K6LZB2UADYJRQBKDXFE2ORXDOONAW4XHSP7PC74UFTYCNIET5M5Q
                                      </td>
                                      <td class="ct_text_short">
                                        K6LZB2UADYJRQBKDXFE2ORXDOONAW4XHSP7PC74UFTYCNIET5M5Q
                                      </td>
                                      <td>$355.6M</td>
                                      <td>USDT/ALGO</td>
                                      <td>02:00 PM</td>
                                    </tr>
                                    <tr>
                                      <td>#</td>
                                      <td>1</td>
                                      <td class="ct_text_short">
                                        K6LZB2UADYJRQBKDXFE2ORXDOONAW4XHSP7PC74UFTYCNIET5M5Q
                                      </td>
                                      <td class="ct_text_short">
                                        K6LZB2UADYJRQBKDXFE2ORXDOONAW4XHSP7PC74UFTYCNIET5M5Q
                                      </td>
                                      <td>$355.6M</td>
                                      <td>USDT/ALGO</td>
                                      <td>02:00 PM</td>
                                    </tr>
                                    <tr>
                                      <td>#</td>
                                      <td>1</td>
                                      <td class="ct_text_short">
                                        K6LZB2UADYJRQBKDXFE2ORXDOONAW4XHSP7PC74UFTYCNIET5M5Q
                                      </td>
                                      <td class="ct_text_short">
                                        K6LZB2UADYJRQBKDXFE2ORXDOONAW4XHSP7PC74UFTYCNIET5M5Q
                                      </td>
                                      <td>$355.6M</td>
                                      <td>USDT/ALGO</td>
                                      <td>02:00 PM</td>
                                    </tr>
                                    <tr>
                                      <td>#</td>
                                      <td>1</td>
                                      <td class="ct_text_short">
                                        K6LZB2UADYJRQBKDXFE2ORXDOONAW4XHSP7PC74UFTYCNIET5M5Q
                                      </td>
                                      <td class="ct_text_short">
                                        K6LZB2UADYJRQBKDXFE2ORXDOONAW4XHSP7PC74UFTYCNIET5M5Q
                                      </td>
                                      <td>$355.6M</td>
                                      <td>USDT/ALGO</td>
                                      <td>02:00 PM</td>
                                    </tr>
                                    <tr>
                                      <td>#</td>
                                      <td>1</td>
                                      <td class="ct_text_short">
                                        K6LZB2UADYJRQBKDXFE2ORXDOONAW4XHSP7PC74UFTYCNIET5M5Q
                                      </td>
                                      <td class="ct_text_short">
                                        K6LZB2UADYJRQBKDXFE2ORXDOONAW4XHSP7PC74UFTYCNIET5M5Q
                                      </td>
                                      <td>$355.6M</td>
                                      <td>USDT/ALGO</td>
                                      <td>02:00 PM</td>
                                    </tr>
                                    <tr>
                                      <td>#</td>
                                      <td>1</td>
                                      <td class="ct_text_short">
                                        K6LZB2UADYJRQBKDXFE2ORXDOONAW4XHSP7PC74UFTYCNIET5M5Q
                                      </td>
                                      <td class="ct_text_short">
                                        K6LZB2UADYJRQBKDXFE2ORXDOONAW4XHSP7PC74UFTYCNIET5M5Q
                                      </td>
                                      <td>$355.6M</td>
                                      <td>USDT/ALGO</td>
                                      <td>02:00 PM</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-3">
                          <div id="chart">
                            <PieChart settings={dexChartSettings} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    <div class="ct_filter_aria_main mt-4">
                      <div class="ct_srch_filter_input">
                        <input type="text" class="form-control" />
                        <i class="fa-solid fa-magnifying-glass"></i>
                      </div>
                      <div></div>
                    </div>
                    <div class="coin-list__main ct_dex_to_dex ">
                      <div class="d-flex align-items-center gap-3 flex-wrap">
                        <div>
                          <label for="" class="me-2">
                            From
                          </label>
                          <input type="date" class="ct_custom_select" />
                        </div>
                        <div>
                          <label for="" class="me-2">
                            To
                          </label>
                          <input type="date" class="ct_custom_select" />
                        </div>
                        <div>
                          <label for="" class="me-2">
                            From
                          </label>

                          <input type="time" class="ct_custom_select" />
                        </div>
                        <div>
                          <label for="" class="me-2">
                            To
                          </label>
                          <input type="time" class="ct_custom_select" />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-9">
                          <div class="flat-tabs mt-4">
                            <div class="content-tab mt-5">
                              <div class="content-inner  table-responsive ct_token_table ct_bot_analysis_tble">
                                <table class="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">Trade No.</th>
                                      <th scope="col">Timestamp</th>
                                      <th scope="col">Symbol</th>
                                      <th scope="col">Id</th>
                                      <th scope="col">Order</th>
                                      <th scope="col">Price</th>
                                      <th scope="col">Amount</th>
                                      <th scope="col">Cost</th>
                                      <th scope="col">Fee Cost</th>
                                      <th scope="col">Fee Currency</th>
                                      <th scope="col">Profit</th>
                                      <th scope="col">Loss</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>#</td>
                                      <td>1</td>
                                      <td>1707290061526</td>
                                      <td>ALGO/USDT</td>
                                      <td>139625989</td>
                                      <td>1662550635</td>
                                      <td>0.1615</td>
                                      <td>33</td>
                                      <td>5.3295</td>
                                      <td>0.0053295</td>
                                      <td>USDT</td>
                                      <td class="up">
                                        0.12{" "}
                                        <i
                                          class="fa-solid fa-sort-up"
                                          style={{ verticalAlign: "middle" }}
                                        ></i>
                                      </td>
                                      <td className="down">
                                        0.04
                                        <i
                                          class="fa-solid fa-sort-down"
                                          style={{ verticalAlign: "middle" }}
                                        ></i>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>#</td>
                                      <td>1</td>
                                      <td>1707290061526</td>
                                      <td>ALGO/USDT</td>
                                      <td>139625989</td>
                                      <td>1662550635</td>
                                      <td>0.1615</td>
                                      <td>33</td>
                                      <td>5.3295</td>
                                      <td>0.0053295</td>
                                      <td>USDT</td>
                                      <td class="up">
                                        0.12{" "}
                                        <i
                                          class="fa-solid fa-sort-up"
                                          style={{ verticalAlign: "middle" }}
                                        ></i>
                                      </td>
                                      <td className="down">
                                        0.04
                                        <i
                                          class="fa-solid fa-sort-down"
                                          style={{ verticalAlign: "middle" }}
                                        ></i>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>#</td>
                                      <td>1</td>
                                      <td>1707290061526</td>
                                      <td>ALGO/USDT</td>
                                      <td>139625989</td>
                                      <td>1662550635</td>
                                      <td>0.1615</td>
                                      <td>33</td>
                                      <td>5.3295</td>
                                      <td>0.0053295</td>
                                      <td>USDT</td>
                                      <td>0.00 </td>
                                      <td class="down">
                                        0.36
                                        <i
                                          class="fa-solid fa-sort-down"
                                          style={{ verticalAlign: "middle" }}
                                        ></i>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>#</td>
                                      <td>1</td>
                                      <td>1707290061526</td>
                                      <td>ALGO/USDT</td>
                                      <td>139625989</td>
                                      <td>1662550635</td>
                                      <td>0.1615</td>
                                      <td>33</td>
                                      <td>5.3295</td>
                                      <td>0.0053295</td>
                                      <td>USDT</td>
                                      <td class="up">
                                        0.12{" "}
                                        <i
                                          class="fa-solid fa-sort-up"
                                          style={{ verticalAlign: "middle" }}
                                        ></i>
                                      </td>
                                      <td className="down">
                                        0.04{" "}
                                        <i
                                          class="fa-solid fa-sort-down"
                                          style={{ verticalAlign: "middle" }}
                                        ></i>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>#</td>
                                      <td>1</td>
                                      <td>1707290061526</td>
                                      <td>ALGO/USDT</td>
                                      <td>139625989</td>
                                      <td>1662550635</td>
                                      <td>0.1615</td>
                                      <td>33</td>
                                      <td>5.3295</td>
                                      <td>0.0053295</td>
                                      <td>USDT</td>
                                      <td class="up">
                                        0.12{" "}
                                        <i
                                          class="fa-solid fa-sort-up"
                                          style={{ verticalAlign: "middle" }}
                                        ></i>
                                      </td>
                                      <td className="down">
                                        0.04
                                        <i
                                          class="fa-solid fa-sort-down"
                                          style={{ verticalAlign: "middle" }}
                                        ></i>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-3">
                          <div id="chart2">
                            <PieChart settings={cexChartSettings} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default AllTransaction;
