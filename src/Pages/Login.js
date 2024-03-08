import React, { useEffect, useState } from "react";
import "../Style/style.css";
import { useNavigate } from "react-router-dom";
import { message as MESSAGE } from "antd";
import { API_user_login } from "../Services/userAPI";
import { IsAuthenticated, setIsAuthenticated } from "../Utils/Auth";
import Header from "../Components/Header";
import { useDispatch } from "react-redux";
import {
  redux_setLogin,
  redux_setUserLoginData,
} from "../redux-tools/userSlice";
import { Formik } from "formik";
import { Schema_login_form } from "../Utils/yupSchema";
import Footer from "../Components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoader, setIsLoader] = useState(false);
  const [showPass, setShowPassword] = useState(false);

  const loginUser = async (values, { resetForm }) => {
    setIsLoader(true);
    try {
      const data = await API_user_login(values);
      console.log("data: ", data);
      if (data?.success == true) {
        const { access, user } = data;
        const { email, id } = user;
        setIsAuthenticated({ token: access, email, id });
        dispatch(redux_setUserLoginData(user));
        dispatch(redux_setLogin(true));
        navigate("/");
      } else {
        MESSAGE.error(data?.error || data?.message);
      }
    } catch (error) {
      console.log(error);
      MESSAGE.error("server internal error");
    } finally {
      setIsLoader(false);
    }
  };

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
              <h3 className="heading">Login</h3>
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
                  <p className="fs-18">Login</p>
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
                <h3 className="heading">Login To Apeiron</h3>
                <p className="desc fs-20">
                  Welcome back! Log In now to start trading
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
                          email: "",
                          password: "",
                        }}
                        validationSchema={Schema_login_form}
                        onSubmit={(values, action) => loginUser(values, action)}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          isSubmitting,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                        }) => (
                          <form onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                              <label for="exampleInputEmail1">Email</label>
                              <input
                                value={values?.email}
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                              />
                              <span
                                className="text-danger"
                                style={{ fontSize: "80%" }}
                              >
                                {touched?.email &&
                                  errors?.email &&
                                  errors?.email}
                              </span>
                            </div>
                            <div className="form-group s1">
                              <label>Password </label>
                              <div className="position-relative">
                                <input
                                  value={values?.password}
                                  name="password"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  type={showPass ? "text" : "password"}
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
                                className="text-danger"
                                style={{ fontSize: "80%" }}
                              >
                                {touched?.password &&
                                  errors?.password &&
                                  errors?.password}
                              </span>
                            </div>
                            <div className="form-group form-check justify-content-start gap-3">
                              <div>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                />
                                <label className="form-check-label">
                                  Remember Me
                                </label>
                              </div>
                              <a onClick={() => navigate("/forgot/password")}>
                                <p>Forgot Password?</p>
                              </a>
                            </div>
                            <button
                              type="submit"
                              className="btn-action"
                              onClick={handleSubmit}
                              disabled={isSubmitting}
                            >
                              Login
                            </button>
                            <div
                              onClick={() => navigate("/register")}
                              className="bottom"
                            >
                              <p>Not a member?</p>
                              <a>Register</a>
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
      <section className="section-sale">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="block-text">
                <h4 className="heading">Earn up to $25 worth of crypto</h4>
                <p className="desc">
                  Discover how specific cryptocurrencies work — and get a bit of
                  each crypto to try out for yourself.
                </p>
              </div>
            </div>
            <div className="col-md-5">
              <div className="button">
                <a href="javascript:void(0)">Create Account</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
