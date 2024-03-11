import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { WalletConnectModalSign } from "@walletconnect/modal-sign-react";
import { useDispatch, useSelector } from "react-redux";
import { redux_setLogin } from "../redux-tools/userSlice";
import { IsAuthenticated } from "../Utils/Auth";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { PeraWalletConnect } from "@perawallet/connect";
import styles from "./header.module.css";
import {
  redux_setDeflyWalletAddress,
  redux_setPeraWalletAddress,
} from "../redux-tools/walletSlice";
const projectId = "a9278b4293fadd62242e2f383fcb2f25";

const Header = () => {
  const location = useLocation();
  const currentPath = location?.pathname;
  const deflyWallet = new DeflyWalletConnect();
  const peraWallet = new PeraWalletConnect();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.login);
  const peraAccountAddress = useSelector((state) => state.wallet.peraAddress);
  const deflyAccountAddress = useSelector((state) => state.wallet.deflyAddress);
  const accountAddress = useSelector((state) => state.wallet.address);
  const isConnectedToPeraWallet = !!peraAccountAddress;
  const isConnectedToDeflyWallet = !!deflyAccountAddress;

  const [NameL, setNameL] = useState("");

  // connect wallet
  const connectDeflyWallet = () => {
    if (deflyAccountAddress == null) {
      deflyWallet
        .connect()
        .then((newAccounts) => {
          console.log("defly wallet connected");
          deflyWallet.connector?.on("disconnect", disconnectDeflyWallet);
          dispatch(redux_setDeflyWalletAddress(newAccounts[0]));
        })
        .catch((error) => {
          if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
            console.log(error);
          }
        });
    }
  };
  function connectPeraWallet() {
    if (peraAccountAddress == null) {
      peraWallet
        .connect()
        .then((newAccounts) => {
          peraWallet.connector?.on("disconnect", disconnectPeraWallet);
          dispatch(redux_setPeraWalletAddress(newAccounts[0]));
          console.log("pera wallet connected");
        })
        .catch((error) => {
          if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
            console.log(error);
          }
        });
    }
  }

  // disconnected wallet
  const disconnectDeflyWallet = () => {
    dispatch(redux_setDeflyWalletAddress(null));
    deflyWallet.disconnect();
  };
  function disconnectPeraWallet() {
    dispatch(redux_setPeraWalletAddress(null));
    peraWallet.disconnect();
  }

  //login handle
  const onClickLoginButton = () => {
    if (isLogin == true) {
      dispatch(redux_setLogin(false));
      localStorage.clear();
      window.location.href = "/";
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const { token, email } = IsAuthenticated();
    if (email) setNameL(email[0]?.toUpperCase());
    console.log("token is : ", token);
    if (token === null || token === undefined) {
      dispatch(redux_setLogin(false));
    } else {
      dispatch(redux_setLogin(true));
    }
  }, []);

  return (
    <div>
      {/* ----------------header----------------- */}
      <header id="header_main" className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="header__body d-flex justify-content-between">
                <div className="header__left">
                  <div className="logo">
                    <NavLink to="/" className="light">
                      <img
                        id="site-logo"
                        src="/images/logo/logo.png"
                        alt=""
                        width="118"
                        height="32"
                        data-retina="/images/logo/logo@2x.png"
                        data-width="118"
                        data-height="32"
                      />
                    </NavLink>
                    <NavLink to="/" className="dark">
                      <img
                        src="/images/logo/logo-dark.png"
                        alt=""
                        width="118"
                        height="32"
                        data-retina="images/logo/logo-dark@2x.png"
                        data-width="118"
                        data-height="32"
                      />
                    </NavLink>
                  </div>
                  <div className="left__main">
                    <nav id="main-nav" className="main-nav">
                      <ul id="menu-primary-menu" className="menu">
                        <li
                          className={`menu-item-has-children ${
                            currentPath === "/" ? "current-menu-item" : ""
                          }`}
                        >
                          <NavLink to="/">Homepage </NavLink>
                        </li>
                        <li
                          className={`menu-item-has-children ${
                            currentPath === "/arbitrage/oppotunities"
                              ? "current-menu-item"
                              : ""
                          }`}
                        >
                          <NavLink to="/arbitrage/oppotunities">
                            Arbitrage Opportunities
                          </NavLink>
                        </li>
                        <li
                          className={`menu-item ${
                            currentPath === "/tokens" ? "current-menu-item" : ""
                          }`}
                        >
                          <NavLink to="/tokens">Market </NavLink>
                        </li>
                        <li
                          className={`menu-item ${
                            currentPath === "/pools" ? "current-menu-item" : ""
                          }`}
                        >
                          <NavLink to="/pools">Pools</NavLink>
                        </li>
                        <li
                          className={`menu-item ${
                            currentPath === "/hot/movers"
                              ? "current-menu-item"
                              : ""
                          }`}
                        >
                          <NavLink to="/hot/movers">Hot movers </NavLink>
                        </li>
                        <li
                          className={`menu-item-has-children ${
                            currentPath === "/bot" ? "current-menu-item" : ""
                          }`}
                        >
                          <NavLink to="/bot">Bot</NavLink>
                        </li>
                        <li
                          className={`menu-item-has-children ${
                            currentPath === "/transaction"
                              ? "current-menu-item"
                              : ""
                          }`}
                        >
                          <NavLink to="/transaction">Transaction</NavLink>
                        </li>
                        <li
                          className={`menu-item-has-children ${
                            currentPath === "/blog" ? "current-menu-item" : ""
                          }`}
                        >
                          <NavLink to="/blog">Blog</NavLink>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>

                <div className="header__right">
                  {isLogin == true && (
                    <div className="dropdown notification">
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton4"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fa-regular fa-bell"></i>
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton4"
                      >
                        <div className="dropdown-item">
                          <div className="media server-log">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-server"
                            >
                              <rect
                                x="2"
                                y="2"
                                width="20"
                                height="8"
                                rx="2"
                                ry="2"
                              ></rect>
                              <rect
                                x="2"
                                y="14"
                                width="20"
                                height="8"
                                rx="2"
                                ry="2"
                              ></rect>
                              <line x1="6" y1="6" x2="6" y2="6"></line>
                              <line x1="6" y1="18" x2="6" y2="18"></line>
                            </svg>
                            <div className="media-body">
                              <div className="data-info">
                                <h6 className="">Server Rebooted</h6>
                                <p className="">45 min ago</p>
                              </div>
                              <div className="icon-status">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  className="feather feather-x"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="dropdown-item">
                          <div className="media">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-heart"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                            <div className="media-body">
                              <div className="data-info">
                                <h6 className="">Licence Expiring Soon</h6>
                                <p className="">8 hrs ago</p>
                              </div>
                              <div className="icon-status">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  className="feather feather-x"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="dropdown-item">
                          <div className="media file-upload">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-file-text"
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                              <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            <div className="media-body">
                              <div className="data-info">
                                <h6 className="">Kelly Portfolio.pdf</h6>
                                <p className="">670 kb</p>
                              </div>
                              <div className="icon-status">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  className="feather feather-check"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="mobile-button">
                    <span></span>
                  </div>
                  {isLogin == true && (
                    <div className="wallet ">
                      {accountAddress ? (
                        <a
                          data-toggle="modal"
                          data-target="#ct_wallet"
                          className="ct_wallet_green"
                        >
                          {accountAddress?.slice(0, 6) +
                            "..." +
                            accountAddress?.slice(-4)}{" "}
                        </a>
                      ) : (
                        <a
                          data-toggle="modal"
                          data-target="#ct_wallet"
                          className="ct_wallet_danger"
                        >
                          {" "}
                          Connect to Wallet{" "}
                        </a>
                      )}
                    </div>
                  )}
                  {isLogin === true && (
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        style={{ backgroundColor: "#141416", border: "none" }}
                        className={`btn  dropdown-toggle ct_user_img ${styles["dropdown-toggle"]}`}
                      >
                        <div
                          className="p-1 d-flex"
                          style={{
                            borderRadius: "50%",
                            backgroundColor: "#7B1FA2",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "30px",
                            height: "30px",
                          }}
                        >
                          {NameL}
                        </div>
                        {/* <img src="/images/icon/icon-01.png" width="90%" /> */}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <NavLink to="/dashboard" className="dropdown-item">
                          Dashboard
                        </NavLink>
                        <NavLink
                          to="/all-transaction"
                          className="dropdown-item"
                        >
                          All-Transaction
                        </NavLink>

                        <NavLink
                          onClick={onClickLoginButton}
                          to="/all-transaction"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                  <div onClick={onClickLoginButton} className="ms-4">
                    <a>{!isLogin && "Login"}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* ------------wallet modal-------------- */}

      <div
        className="modal fade"
        id="ct_wallet"
        tabindex="-1"
        aria-labelledby="ct_walletlLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body border-0">
              <div className="ct_wallet_main_div">
                <h4>Connect to a wallet</h4>
                <p>
                  By connecting your wallet, you agree to our Terms of Service
                  and our Privacy Policy.
                </p>
                <ul>
                  <li>
                    {/* <div className="d-flex align-items-center justify-content-between mb-4" data-dismiss="modal" aria-label="Close"
                                            onClick={handleConnectWalletClick}> */}
                    <div
                      className="d-flex align-items-center justify-content-between mb-4"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={connectPeraWallet}
                    >
                      <div>
                        <img
                          src="/images/layout/PeraWallet.png"
                          alt=""
                          style={{ borderRadius: "50%" }}
                        />
                        <a>
                          {peraAccountAddress == null
                            ? "Pera Wallet"
                            : "Connected"}
                        </a>
                      </div>
                      {isConnectedToPeraWallet && (
                        <button
                          type="submit"
                          className="ct_button_disconnect btn-danger btn"
                          onClick={disconnectPeraWallet}
                        >
                          Disconnected
                        </button>
                      )}
                    </div>
                    <p className="ct_word_wrap">
                      {peraAccountAddress != null && peraAccountAddress}
                    </p>
                  </li>
                  <li>
                    <div
                      className="d-flex align-items-center justify-content-between mb-4"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={connectDeflyWallet}
                    >
                      <div>
                        <img
                          src="/images/layout/DeflyWallet--circle-black.svg"
                          alt=""
                          style={{ borderRadius: "50%" }}
                        />
                        <a>
                          {deflyAccountAddress == null
                            ? "Defly Wallet"
                            : "Connected"}
                        </a>
                      </div>
                      {isConnectedToDeflyWallet && (
                        <button
                          type="submit"
                          className="ct_button_disconnect btn-danger btn"
                          onClick={disconnectDeflyWallet}
                        >
                          Disconnected
                        </button>
                      )}
                    </div>
                    <p className="ct_word_wrap">
                      {deflyAccountAddress != null && deflyAccountAddress}
                    </p>
                  </li>
                </ul>
                <p>
                  To use Wallet Connect compatible wallets, you can proceed from
                  here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ct_modal_top">
        <WalletConnectModalSign
          projectId={projectId}
          metadata={{
            name: "My Dapp",
            description: "My Dapp description",
            url: "https://my-dapp.com",
            icons: ["https://my-dapp.com/logo.png"],
          }}
        />
      </div>
    </div>
  );
};

export default Header;
