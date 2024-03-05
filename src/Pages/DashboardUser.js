import React, { useEffect, useRef, useState } from 'react'
import logo_png from "../images/logo/logo.png"
import logo_dark_png from "../images/logo/logo-dark.png"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { message as toast } from 'antd';
import { redux_setWalletInformation } from '../redux-tools/walletSlice';
import { IsAuthenticated } from '../Utils/Auth';
import { redux_setLogin } from '../redux-tools/userSlice';
import PieChart from '../Components/PieChart';
import Footer from '../Components/Footer';
 

function DashboardUser() {

  const walletAddress = useSelector(state => state?.wallet?.address)
  const walletInfo = useSelector(state => state?.wallet?.info)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addRef = useRef();

  const [chartData, setChartData]=useState({Amount:9941881.2, Profit: 5070940.6 , Loss:62183})
  const [transactionChartSettings, setTransactionChartSettings] = useState({
    type: 'pie',
    data: {
      labels: ['Amount', 'Profit', 'Loss'],
      datasets: [{
        data: [chartData?.Amount, chartData?.Profit, chartData?.Loss],
        backgroundColor: ['#4814B8', '#00C013', '#d50000'],
      }],
    },
    options: {
      plugins: {
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            usePointStyle: true,
          },
        },
      },
    },
  })

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletInfo?.wallet_address)
    toast.success('copy address')
  }

  // useEffect(() => {
  //   getAccountInfo();
  // }, [walletAddress])

  useEffect(() => {
    console.log('wallet info', walletInfo)
  })

  useEffect(() => {
    const { token } = IsAuthenticated();
    console.log('token is : ', token)
    if (token === null || token === undefined) {
      dispatch(redux_setLogin(false))
      navigate('/login')
    } else {
      dispatch(redux_setLogin(true))
    }
  }, [])

  return (
    <div>
      <Header />

      <section className="coin-list mt-5 pt-5">

        <div className="container mt-5">

          <div className="row">
            <div className="col-md-12">
              {/* <div className="block-text d-flex align-items-center justify-content-between gap-4 flex-wrap">
                <h3 className="heading">Top tokens on Apeiron</h3>
                <div className=" ct_select-menu3 ">
                  <div className=" ct_select-btn3">
                    <span className="ct_sBtn-text3">Ether</span>
                    <i className="fa-solid fa-angle-down"></i>
                  </div>

                  <ul className=" ct_options3">
                    <li className=" ct_option3">
                      <img src="images/layout/bitcoin2.png" alt="" />
                        <span className=" ct_option-text3">Ether</span>
                    </li>
                    <li className=" ct_option3">
                      <img src="images/layout/bitcoin2.png" alt="" />
                        <span className=" ct_option-text3">Ether</span>
                    </li>
                    <li className=" ct_option3">
                      <img src="images/icon/usd-coin-usdc-logo.png" alt="" />
                        <span className=" ct_option-text3">USDCoin</span>
                    </li>
                    <li className=" ct_option3">
                      <img src="images/icon/usd-coin-usdc-logo.png" alt="" />
                        <span className=" ct_option-text3">USDCoin</span>
                    </li>
                    <li className=" ct_option3">
                      <img src="images/layout/bitcoin3.png" alt="" />
                        <span className=" ct_option-text3">Tether USD</span>
                    </li>
                    <li className=" ct_option3">
                      <img src="images/layout/bitcoin3.png" alt="" />
                        <span className="ct_option-text3">Tether USD</span>
                    </li>
                    <li className=" ct_option3">
                      <img src="images/layout/bitcoin.png" alt="" />
                        <span className="ct_option-text3">Wrapped BTC</span>
                    </li>
                  </ul>
                </div>
              </div> */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="ct_profile_pic">
                  <h4>KA</h4>
                </div>
                <div className="ct_profile_info">
                  <h3>Hello, ka**@**.com</h3>
                </div>
              </div>
              <div className="d-flex align-items-center gap-4 pb-5 flex-wrap">

                <div className="ct_address_info">
                  <h5>Address</h5>

                  <h4 role='button' className="ct_fs_16" onClick={handleCopyAddress}>
                    {walletInfo && walletInfo?.wallet_address?.slice(0, 10) + '...'}
                    <i className="fa-regular fa-copy ms-2"></i>
                  </h4>
                </div>
                <div className="ct_address_info">
                  <h5>Time Zone</h5>
                  <h4 className="ct_fs_16">(UTC+8) Asia/Singapore</h4>
                </div>
                <div className="ct_address_info">
                  <h5>Last Login</h5>
                  <h4 className="ct_fs_16"><span>2/19/2024, 13:34:00</span> <span>Australia Melbourne(185.**.141)</span></h4>
                </div>
              </div>

              <div className="ct_assets_outline pb-4">
                <p>Total Assets</p>
                <div className="d-flex align-items-center gap-3 mt-4">
                  {/* <div className="ct_dropdown active"> */}
                  {
                    walletInfo?.wallet_amount ?
                      <>
                        <h5 className='d-flex align-items-center'>{((walletInfo?.wallet_amount / 1000000) / 5.12)?.toFixed(2)} <span style={{ fontSize: '80%' }}>USD</span> </h5>
                        <p>
                          ≈  ₨ {(((walletInfo?.wallet_amount / 1000000) / 5.12) * 82.88)?.toFixed(2)}
                        </p>
                      </>
                      :
                      ''
                  }

                  {/* <h6>{walletAddress?.total_assets_opted_in ?? 0} USDT
                      <span><i className="fa-solid fa-sort-down"></i></span>
                    </h6> */}
                  {/* <ul className="ct_dropdown_list">
                      <li>ALGO</li>
                      <li>goBTC</li>
                      <li>goUSDT</li>
                      <li>goUSDC</li>
                      <li>OPUL</li>
                      <li>goETH</li>
                    </ul>
                  </div> 
                  */}
                </div>
              </div>



              <div>


              </div>
              <div className="mt-4">
                <h6>History</h6>
                <div className=" mt-4">
                  <div className="ct_assets_outline w-100 mb-2  p-2 ">
                    <div className="row align-items-center">
                      <div className="col-md-5">
                        <div className="d-flex align-items-center gap-3 flex-wrap">
                          <div>
                            <h6 className="ct_fs_20">All Transactions</h6>
                            <p className="mb-0">Data Value</p>
                          </div>

                          <div>
                            <h5 className="mb-0">1</h5>
                          </div>
                        </div>

                      </div>
                      <div className="col-md-7">
                        <ul className="d-flex align-items-center gap-3 justify-content-end">
                          <li>
                            <p className="d-flex align-items-center gap-2"><span className="ct_dot ct_blue_dot"></span>Amount</p>
                            <h6 className="ct_fs_16 mb-0">9,070,940.6</h6>
                          </li>
                          <li>
                            <p className="d-flex align-items-center gap-2"><span className="ct_dot ct_green_dot"></span>Profit</p>
                            <h6 className="ct_fs_16  mb-0">4,070,940.6</h6>
                          </li>
                          <li>
                            <p className="d-flex align-items-center gap-2"><span className="ct_dot ct_red_dot"></span>Loss</p>
                            <h6 className="ct_fs_16 mb-0">940.6</h6>
                          </li>
                        </ul>
                      </div>

                    </div>
                  </div>

                  <div className="progress ct_progress" style={{ height: '10px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: '70%', backgroundColor: '#3B82F6', height: '10px' }}>

                    </div>
                    <div className="progress-bar " role="progressbar" style={{ width: '15%', backgroundColor: '#00C013', height: '10px' }}>

                    </div>
                    <div className="progress-bar" role="progressbar" style={{ width: '15%', backgroundColor: '#D50000', height: '10px' }}>
                    </div>
                  </div>
                </div>
              </div>


              {/* ---------------bot analysis-------------------- */}
              <div className="pt-5">
                <h4 className="ct_fs_28">Bot Analysis</h4>
                <div className="ct_filter_aria_main mt-4 justify-content-between">


                  <div className="ct_srch_filter_input">
                    <input type="text" className="form-control" />
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <div>
                    <select className="form-control ct_custom_select">
                      <option value="">CEX to CEX</option>
                      <option value="">DEX to DEX</option>
                    </select>
                  </div>

                </div>
              </div>

              <div className="coin-list__main ">
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <div>
                    <label for="" className="me-2">From</label>
                    <input type="date" className="ct_custom_select" />
                  </div>
                  <div>
                    <label for="" className="me-2">To</label>
                    <input type="date" className="ct_custom_select" />
                  </div>
                  <div>
                    <label for="" className="me-2">From</label>

                    <input type="time" className="ct_custom_select" />
                  </div>
                  <div>
                    <label for="" className="me-2">To</label>
                    <input type="time" className="ct_custom_select" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-9">
                    <div className="flat-tabs mt-4">
                      <div className="content-tab mt-5">
                        <div className="content-inner ct_token_table ct_bot_analysis_tble table-responsive">
                          <table className="table ">
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

                            {!walletAddress ?
                              <tbody>
                                <tr>
                                  <td colspan="13" className="text-center"><p className="mb-0 ct_fs_20 text-white ">Not data Found</p></td>
                                </tr>
                              </tbody>
                              :
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
                                  <td className="up">0.12 <i className="fa-solid fa-sort-up" style={{ verticalAlign: 'middle' }}></i></td>
                                  <td>0.004</td>
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
                                  <td className="down">0.36<i className="fa-solid fa-sort-up" style={{ verticalAlign: 'middle' }}></i></td>
                                </tr>
                              </tbody>
                            }
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div id="chart">
                      <PieChart settings={transactionChartSettings} />
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
  )
}

export default DashboardUser