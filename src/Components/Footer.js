import React from "react";

function Footer() {
  return (
    <footer className="footer style-2">
      <div className="container">
        <div className="footer__main">
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <div className="info">
                <a className="logo">
                  <img src='/images/logo/logo-dark.png' alt="" />
                </a>
                <h6>Let's talk! 🤙</h6>
                <ul className="list">
                  <li>
                    <p>
                      <a href="tel:+123456789101">+12 345 678 9101</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <a href="mailto:mail@gmail.com" className="__cf_email__">
                        mail@gmail.com
                      </a>
                    </p>
                  </li>
                  <li>
                    <p>
                      Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi
                      96522
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="widget">
                <div className="widget-link">
                  <h6 className="title">PRODUCTS</h6>
                  <ul>
                    <li>
                      <a href="javascript:void(0)">Spot</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Inverse Perpetual</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">USDT Perpetual</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Exchange</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Launchpad</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Binance Pay</a>
                    </li>
                  </ul>
                </div>
                <div className="widget-link s2">
                  <h6 className="title">SERVICES</h6>
                  <ul>
                    <li>
                      <a href="javascript:void(0)">Buy Crypto</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Markets</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Tranding Fee</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Affiliate Program</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Referral Program</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">API</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-12">
              <div className="footer-contact">
                <h5>Newletters</h5>
                <p>
                  Subscribe our newsletter to get more free design course and
                  resource.
                </p>
                <form action="#">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required=""
                  />
                  <button type="submit" className="btn-action">
                    Submit
                  </button>
                </form>
                <ul className="list-social">
                  <li>
                    <a href="javascript:void(0)">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="footer__bottom">
          <p>
            ©2023 Apeiron.com. All rights reserved. Terms of Service | Privacy
            Terms
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
