import React, { useEffect, useState } from "react";
import "../Style/style.css";
import Header from "../Components/Header";
import { redux_setLogin } from "../redux-tools/userSlice";
import { IsAuthenticated } from "../Utils/Auth";
import { useDispatch } from "react-redux";
import CloseDropdown from "../Components/CloseDropdown";
import Footer from "../Components/Footer";
import {
  API_pool_data_get,
  API_pool_for_pact_data_get,
  API_support_vs_currency_get,
} from "../Services/userAPI";

const PoolsData = () => {
  const dispatch = useDispatch();
  const [providerDefault, setProviderDefault] = useState("Provider");
  const [filterCoinData, setFilterCoinData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [supportedData, setSupportedData] = useState();

  const poolForProvider = async () => {
    setIsLoader(true);
    try {
      const data = await API_pool_data_get();
      setFilterCoinData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false);
    }
  };

  const poolForPact = async () => {
    setIsLoader(true);
    try {
      const data = await API_pool_for_pact_data_get();
      setFilterCoinData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false);
    }
  };

  const poolForTinyman = async () => {
    setIsLoader(true);
    try {
      const data = await API_pool_for_pact_data_get();
      setFilterCoinData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false);
    }
  };

  const getCurrancyData = async () => {
    try {
      const data = await API_support_vs_currency_get();
      console.log("suport", data);
      setSupportedData(data);
    } catch (error) {
      console.log("currancy error is : ", error);
    }
  };

  useEffect(() => {
    getCurrancyData();
    const { token } = IsAuthenticated();
    console.log("token is : ", token);
    if (token === null || token === undefined) {
      dispatch(redux_setLogin(false));
    } else {
      dispatch(redux_setLogin(true));
    }
  }, []);

  useEffect(() => {
    if (providerDefault === "Provider") poolForProvider();
    if (providerDefault === "Pact") poolForPact();
    if (providerDefault === "Tinyman") poolForTinyman();
  }, [providerDefault]);

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
                      <li
                        className="ct_option2"
                        onClick={() => setProviderDefault(`Provider`)}
                      >
                        <span className="ct_option-text2">Provider</span>
                      </li>
                      <li
                        className="ct_option2"
                        onClick={() => setProviderDefault(`Pact`)}
                      >
                        <span className="ct_option-text2">Pact</span>
                      </li>
                      <li
                        className="ct_option2"
                        onClick={() => setProviderDefault(`Tinyman`)}
                      >
                        <span className="ct_option-text2">Tinyman</span>
                      </li>

                      {/* {supportedData &&
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
                        ))} */}
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
                                      {
                                        // item?.asset_1_id !== null &&
                                        item?.asset_1_name ?? item?.asset_1_id
                                      }
                                      &nbsp; / &nbsp;
                                      {
                                        // item?.asset_2_id !== null &&
                                        item?.asset_2_name ?? "ALGO"
                                      }
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
