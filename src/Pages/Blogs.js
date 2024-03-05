import React, { useEffect, useState } from "react";
import blog_01_jpg from "../images/blog/blog-01.jpg";
import "../Style/style.css";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useDispatch } from "react-redux";
import { IsAuthenticated } from "../Utils/Auth";
import { redux_setLogin } from "../redux-tools/userSlice";
import Footer from "../Components/Footer";
 

const Blogs = () => {
  const navigate = useNavigate();

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

      {/* blog section S */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="ct_breadcrumb">
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>/</li>
                  <li>Blog</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ct_block_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="ct_blog_list blog-box">
                <figure>
                  <div className="ct_blog_img">
                    <img src={blog_01_jpg} alt="" />
                  </div>
                  <figcaption className="box-content pt-3">
                    <h4>
                      <a className="title mb-0">
                        How to Use Arbitrage in Trading?
                      </a>
                    </h4>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore.
                    </p>
                    <div class="meta mt-3">
                      <a href="#" class="name">
                        <span></span>Floyd Buckridge
                      </a>
                      <a href="#" class="time">
                        Feb 03, 2021
                      </a>
                    </div>
                    <div className="text-center">
                      <a class="btn-action mt-4 mx-auto">
                        <span>View Blog</span>
                      </a>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="ct_blog_list blog-box">
                <figure>
                  <div className="ct_blog_img">
                    <img src={blog_01_jpg} alt="" />
                  </div>
                  <figcaption className="box-content pt-3">
                    <h4>
                      <a className="title mb-0">
                        How to Use Arbitrage in Trading?
                      </a>
                    </h4>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore.
                    </p>
                    <div class="meta mt-3">
                      <a href="#" class="name">
                        <span></span>Floyd Buckridge
                      </a>
                      <a href="#" class="time">
                        Feb 03, 2021
                      </a>
                    </div>
                    <div className="text-center">
                      <a class="btn-action mt-4 mx-auto">
                        <span>View Blog</span>
                      </a>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="ct_blog_list blog-box">
                <figure>
                  <div className="ct_blog_img">
                    <img src={blog_01_jpg} alt="" />
                  </div>
                  <figcaption className="box-content pt-3">
                    <h4>
                      <a className="title mb-0">
                        How to Use Arbitrage in Trading?
                      </a>
                    </h4>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore.
                    </p>
                    <div class="meta mt-3">
                      <a href="#" class="name">
                        <span></span>Floyd Buckridge
                      </a>
                      <a href="#" class="time">
                        Feb 03, 2021
                      </a>
                    </div>
                    <div className="text-center">
                      <a class="btn-action mt-4 mx-auto">
                        <span>View Blog</span>
                      </a>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="ct_blog_list blog-box">
                <figure>
                  <div className="ct_blog_img">
                    <img src={blog_01_jpg} alt="" />
                  </div>
                  <figcaption className="box-content pt-3">
                    <h4>
                      <a className="title mb-0">
                        How to Use Arbitrage in Trading?
                      </a>
                    </h4>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore.
                    </p>
                    <div class="meta mt-3">
                      <a href="#" class="name">
                        <span></span>Floyd Buckridge
                      </a>
                      <a href="#" class="time">
                        Feb 03, 2021
                      </a>
                    </div>
                    <div className="text-center">
                      <a class="btn-action mt-4 mx-auto">
                        <span>View Blog</span>
                      </a>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="ct_blog_list blog-box">
                <figure>
                  <div className="ct_blog_img">
                    <img src={blog_01_jpg} alt="" />
                  </div>
                  <figcaption className="box-content pt-3">
                    <h4>
                      <a className="title mb-0">
                        How to Use Arbitrage in Trading?
                      </a>
                    </h4>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore.
                    </p>
                    <div class="meta mt-3">
                      <a href="#" class="name">
                        <span></span>Floyd Buckridge
                      </a>
                      <a href="#" class="time">
                        Feb 03, 2021
                      </a>
                    </div>
                    <div className="text-center">
                      <a class="btn-action mt-4 mx-auto">
                        <span>View Blog</span>
                      </a>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="ct_blog_list blog-box">
                <figure>
                  <div className="ct_blog_img">
                    <img src={blog_01_jpg} alt="" />
                  </div>
                  <figcaption className="box-content pt-3">
                    <h4>
                      <a className="title mb-0">
                        How to Use Arbitrage in Trading?
                      </a>
                    </h4>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore.
                    </p>
                    <div class="meta mt-3">
                      <a class="name">
                        <span></span>Floyd Buckridge
                      </a>
                      <a class="time">Feb 03, 2021</a>
                    </div>
                    <div className="text-center">
                      <a class="btn-action mt-4 mx-auto">
                        <span>View Blog</span>
                      </a>
                    </div>
                  </figcaption>
                </figure>
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

export default Blogs;
