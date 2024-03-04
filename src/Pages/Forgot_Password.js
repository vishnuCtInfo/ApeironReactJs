import React, { useEffect, useState } from "react";
import logo_png from "../images/logo/logo.png";
import logo_dark_png from "../images/logo/logo-dark.png";
import "../Style/style.css";
import { useNavigate } from "react-router-dom";
import { message, message as MESSAGE } from "antd";
import axios from "axios";
import PeraWallet from "../images/layout/PeraWallet.png";
import { PeraWalletConnect } from "@perawallet/connect";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import bitcoin2_png from "../images/layout/bitcoin2.png";
import defly_logo from "../images/layout/DeflyWallet--circle-black.svg";
import Header from "../Components/Header";
import { useDispatch } from "react-redux";
import { IsAuthenticated } from "../Utils/Auth";
import { redux_setLogin } from "../redux-tools/userSlice";
import Footer from "../Components/Footer";

export const configJSON = require("../Pages/Config");

const Forgot_Password = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const onHandleFormSubmit = (e) => {
    e.preventDefault();
    if (email) {
      let formData = new FormData();
      formData.append("email", email);
      axios({
        method: "post",
        url: configJSON?.baseUrl + configJSON?.ForgotPasswordEndPointURL,
        headers: { "content-type": "multipart/form-data" },
        data: formData,
      })
        .then((res) => {
          console.log({ res });
          setEmail("");
          if (res?.data?.success == true) {
            MESSAGE.success(res?.data?.message, 2);
          } else {
            MESSAGE.error(res?.data?.message, 2);
          }
        })
        .catch((error) => {
          console.log({ error });
          setEmail("");
        });
    } else {
      MESSAGE.success("Please enter your email address", 2);
    }
  };

  const dispatch = useDispatch();
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
    <div className="body header-fixed is_dark">
      <Header />
      {/* <!-- end Header --> */}

      {/* <!-- PageTitle --> */}
      <section className="page-title">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h3 className="heading">Forgot Password</h3>
            </div>
            <div>
              <ul className="breadcrumb">
                <li onClick={() => navigate("/")}>
                  <a>Home</a>
                </li>
                <li>
                  <p className="fs-18">/</p>
                </li>
                <li>
                  <p className="fs-18">Forgot Password</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End PageTitle --> */}

      <section className="register login">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block-text center">
                <h3 className="heading">Forgot Password?</h3>
                <p className="desc fs-20">
                  Create new password now to start trading
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="flat-tabs">
                <div className="content-tab">
                  <div className="content-inner">
                    <form>
                      <div className="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          id="exampleInputEmail1"
                        />
                      </div>
                      <div className="bottom">
                        <p>Do you know credential ?</p>
                        <a onClick={() => navigate("/login")}>Login</a>
                      </div>
                      <button
                        type="submit"
                        className="btn-action"
                        onClick={(e) => onHandleFormSubmit(e)}
                      >
                        Get Reset Password Link
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Forgot_Password;
