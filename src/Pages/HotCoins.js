import React, { useEffect } from "react";
import "../Style/style.css";
import Header from "../Components/Header";
import { IsAuthenticated } from "../Utils/Auth";
import { useDispatch, useSelector } from "react-redux";
import { redux_setLogin } from "../redux-tools/userSlice";
import Footer from "../Components/Footer";
 

const HotCoins = () => {
  const dispatch = useDispatch();
  const filterCoinData = useSelector((state) => state.hot_movers.data);

  useEffect(() => {
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
                <h6 class="mb-3">
                  Hot Movers/
                  <a
                    style={{ fontSize: "18px", textDecoration: "underLine" }}
                    href="/hot_mover"
                  >
                    Hot_Movers2
                  </a>
                </h6>
                {
                  // isLoader == true ||
                  !filterCoinData?.length > 0 && (
                    <div className="spinner">
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
                  )
                }
                {
                  // isLoader == false
                  filterCoinData?.length > 0 && (
                    <div className="coin-list__main">
                      <div className="flat-tabs">
                        <div className="content-tab">
                          <div className="content-inner ct_token_table">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Token Name</th>
                                  <th scope="col">Ticker</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Price Change (24h)</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filterCoinData &&
                                  filterCoinData?.map((item, i) => (
                                    <tr>
                                      <td style={{ color: "#FFF" }}>{i + 1}</td>
                                      <td style={{ color: "#FFF" }}>
                                        <div>
                                          <span>{item?.Token_Name}</span>{" "}
                                        </div>
                                      </td>
                                      <td
                                        className="boild"
                                        style={{ color: "#FFF" }}
                                      >
                                        ${item?.Ticker}
                                      </td>
                                      <td className="up">
                                        {item?.Price.toFixed(6)}
                                      </td>
                                      <td
                                        className="boild"
                                        style={{ color: "#FFF" }}
                                      >
                                        {item?.Price_Change_24h.toFixed(6)}
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
    </div>
  );
};

export default HotCoins;
