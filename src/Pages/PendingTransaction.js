import React, { useEffect, useState } from "react";
import "../Style/style.css";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { IsAuthenticated } from "../Utils/Auth";
import { redux_setLogin } from "../redux-tools/userSlice";
import Footer from "../Components/Footer";
import {
  API_transaction_algrorand_main_pendding_get,
  API_transaction_algrorand_test_pendding_get,
} from "../Services/userAPI";

const PendingTransaction = () => {
  const walletAddress = useSelector((state) => state.wallet.address);
  const navigate = useNavigate();
  const [isTabMainnet, setIsTabMainnet] = useState(true);

  const [pendingMainnetData, setPendingMainnetData] = useState([]);
  const [pendingTestnetData, setPendingTestnetData] = useState([]);

  const getPendingMainnetData = async () => {
    try {
      const data = await API_transaction_algrorand_main_pendding_get(
        walletAddress
      );
      setPendingMainnetData(data?.pending_transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const getPendingTestnetData = async () => {
    try {
      const data = await API_transaction_algrorand_test_pendding_get(
        walletAddress
      );
      setPendingTestnetData(data?.pending_transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const onHanleClickTab = (val) => {
    if (val == "Mainnet") {
      setIsTabMainnet(true);
    } else {
      setIsTabMainnet(false);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      getPendingMainnetData();
      getPendingTestnetData();
    }
  }, [walletAddress]);

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
      <section class="pt-5">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="ct_transation_main pb-5">
                <h6 class="mb-3">Pending Transactions</h6>
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
                          //   id="pills-home-tab"
                          //   data-bs-toggle="pill"
                          //   data-bs-target="#pills-home"
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
                          //   id="pills-profile-tab"
                          //   data-bs-toggle="pill"
                          //   data-bs-target="#pills-profile"
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
                    <div class="tab-content" id="pills-tabContent">
                      <div
                        class="tab-pane fade show active"
                        // id="pills-home"
                        // role="tabpanel"
                        // aria-labelledby="pills-home-tab"
                      >
                        <div class="table-responsive ct_transation_tble">
                          <table class="table">
                            <thead>
                              <tr>
                                <th>TxID</th>
                                {/* <th>Block</th>
                                                                <th>Age</th> */}
                                <th>From</th>
                                <th>To</th>
                                <th>Amount</th>
                                <th>Fee</th>
                                {/* <th>Type</th> */}
                              </tr>
                            </thead>
                            {isTabMainnet == true ? (
                              pendingMainnetData?.length !== 0 ? (
                                pendingMainnetData?.map((item) => (
                                  <tbody>
                                    <tr>
                                      <td class="ct_text_light_blue">
                                        {item?.id?.slice(0, 20)}
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
                                          src="/images/logo/algo.png"
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
                                  </tbody>
                                ))
                              ) : (
                                <tbody>
                                  <tr>
                                    <td
                                      colspan="5 "
                                      className="text-center text-white mt-10"
                                    >
                                      No Pending Transaction!!
                                    </td>
                                  </tr>
                                </tbody>
                              )
                            ) : pendingTestnetData?.length !== 0 ? (
                              pendingTestnetData?.map((item) => (
                                <tbody>
                                  <tr>
                                    <td class="ct_text_light_blue">
                                      {item?.id?.slice(0, 20)}
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
                                        {item?.["payment-transaction"]?.amount}
                                      </span>
                                    </td>
                                    <td>
                                      <img
                                        src="/images/logo/algo.png"
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
                                </tbody>
                              ))
                            ) : (
                              <tbody>
                                <tr>
                                  <td
                                    colspan="5 "
                                    className="text-center text-white mt-10"
                                  >
                                    No Pending Transaction!!
                                  </td>
                                </tr>
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

export default PendingTransaction;
