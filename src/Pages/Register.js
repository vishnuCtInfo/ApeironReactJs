import React, { useEffect, useState } from "react";
// import logo_png from "../images/logo/logo.png";
// import logo_dark_png from "../images/logo/logo-dark.png";
import "../Style/style.css";
import { useNavigate } from "react-router-dom";
// import bitcoin2_png from "../images/layout/bitcoin2.png";
// import axios from "axios";
// import PeraWallet from "../images/layout/PeraWallet.png";
// import { message, message as MESSAGE } from "antd";
// import { PeraWalletConnect } from "@perawallet/connect";
// import { DeflyWalletConnect } from "@blockshake/defly-connect";
// import defly_logo from "../images/layout/DeflyWallet--circle-black.svg";
import Header from "../Components/Header";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { IsAuthenticated } from "../Utils/Auth";
import { redux_setLogin } from "../redux-tools/userSlice";
import { Schema_register_form } from "../Utils/yupSchema";
import Footer from "../Components/Footer";
import { API_user_register } from "../Services/userAPI";

//  

const Register = () => {
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(false);
  const [showPass, setShowPassword] = useState(false);

  const registerUser = async (values, { resetForm }) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    setIsLoader(true);
    try {
      const data = await API_user_register(formData);
      if(data?.success === true) navigate('/login');
      // const res = await axios.post(
      //   configJSON?.baseUrl + configJSON.SignUpEndPointURL,
      //   formData,
      //   {
      //     headers: {
      //       "content-type": "multipart/form-data",
      //     },
      //   }
      // );
      // if (res?.data?.success == true) {
      //   MESSAGE.success(res?.data?.message, 2);
      //   navigate("/login");
      // } else {
      //   MESSAGE.error(res?.data?.error || res?.data?.message);
      // }
    } catch (error) {
      console.log("error is : ", error);
      // MESSAGE.error("server internal error");
    } finally {
      setIsLoader(false);
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
      navigate("/");
    }
  }, []);
  return (
    <div className="body header-fixed is_dark">
      <Header />
      {/* <!-- end Header --> */}
      {/* <!-- PageTitle --> */}
      <section className="page-title">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3 className="heading">Signup</h3>
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
                  <p className="fs-18">Signup</p>
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
              <div className="block-text center mb-5 pb-4">
                <h3 className="heading"> Register To Apeiron</h3>
                <p className="desc fs-20">
                  Register in advance and enjoy the event benefits
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="flat-tabs">
                <div className="content-tab">
                  <div className="content-inner">
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
                    {isLoader == false && (
                      <Formik
                        initialValues={{
                          first_name: "",
                          last_name: "",
                          email: "",
                          phone_number: "",
                          password: "",
                        }}
                        validationSchema={Schema_register_form}
                        onSubmit={(values, action) =>
                          registerUser(values, action)
                        }
                      >
                        {({
                          values,
                          errors,
                          touched,
                          isSubmitting,
                          handleSubmit,
                          handleBlur,
                          handleChange,
                        }) => (
                          <form onSubmit={(e) => e.preventDefault()}>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group  mb-4">
                                  <label for="exampleInputEmail1">
                                    First Name
                                  </label>
                                  <input
                                    type="text"
                                    name="first_name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.first_name}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                  />
                                </div>
                                <span
                                  className="text-danger mb-3"
                                  style={{ fontSize: "80%" }}
                                >
                                  {touched?.first_name &&
                                    errors?.first_name &&
                                    errors?.first_name}{" "}
                                </span>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group  mb-4">
                                  <label for="exampleInputEmail1">
                                    Last Name
                                  </label>
                                  <input
                                    type="text"
                                    name="last_name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.last_name}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                  />
                                </div>
                                <span
                                  className="text-danger mb-3"
                                  style={{ fontSize: "80%" }}
                                >
                                  {touched?.last_name &&
                                    errors?.last_name &&
                                    errors?.last_name}{" "}
                                </span>
                              </div>
                            </div>
                            <div className="form-group  mb-4">
                              <label for="exampleInputEmail1">Email</label>
                              <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.email}
                                className="form-control"
                                id="exampleInputEmail1"
                              />
                            </div>
                            <span
                              className="text-danger mb-3"
                              style={{ fontSize: "80%" }}
                            >
                              {touched?.email && errors?.email && errors?.email}{" "}
                            </span>
                            <div className="form-group  mb-4">
                              <label for="exampleInputEmail1">
                                phone_number
                              </label>
                              <input
                                type="number"
                                name="phone_number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.phone_number}
                                className="form-control"
                                id="exampleInputEmail1"
                              />
                            </div>
                            <span
                              className="text-danger mb-3"
                              style={{ fontSize: "80%" }}
                            >
                              {touched?.phone_number &&
                                errors?.phone_number &&
                                errors?.phone_number}{" "}
                            </span>
                            <div className="form-group s1">
                              <label>Password </label>
                              <div className="position-relative">
                                <input
                                  type={showPass ? "text" : "password"}
                                  name="password"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values?.password}
                                  className="form-control ct_pass_show_input"
                                />
                                <i
                                  role="button"
                                  className={`ct_pass_show_eye fa-solid ${
                                    showPass ? "fa-eye-slash" : "fa-eye"
                                  }`}
                                  onClick={() => setShowPassword(!showPass)}
                                ></i>
                              </div>
                              <span
                                className="text-danger mb-3"
                                style={{ fontSize: "80%" }}
                              >
                                {touched?.password &&
                                  errors?.password &&
                                  errors?.password}{" "}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={handleSubmit}
                              className="btn-action"
                              disabled={isSubmitting}
                            >
                              Signup
                            </button>
                            <div className="bottom">
                              <p>Alreay a member?</p>
                              <a onClick={() => navigate("/login")}>Login</a>
                            </div>
                          </form>
                        )}
                      </Formik>
                    )}
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

export default Register;
