import React from "react";
import "../CustomCss/customer.css";
import about from "./about.jpg";

function AboutUs() {
  return (
    <div className="container_wrapper container">
      <div class="contactInfo">
        <div>
          <h2>About Us</h2>
          <ul class="info">
            <li>
              <span>
                <img src="/images/location.png" />
              </span>
              <span>
                184 Ippokratous Street
                <br />
                Athens, Gr
                <br />
                11472
              </span>
            </li>
            <li>
              <span>
                <img src="/images/mail.png" />
              </span>
              {/* <!-- <span>nassosanagn@gmail.com</span> --> */}
              <span>
                <a href="mailto: nassosanagn@gmail.com">
                  shopifymarket@gmail.com
                </a>
              </span>
            </li>
            <li>
              <span>
                <img src="/images/call.png" />
              </span>
              <span>702-279-3488</span>
            </li>
          </ul>
        </div>
        <ul class="sci">
          <li>
            <a href="https://www.facebook.com/">
              <img src="/images/1.png" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/">
              <img src="/images/3.png" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/">
              <img src="/images/2.png" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/">
              <img src="/images/5.png" />
            </a>
          </li>
        </ul>
      </div>
      <div className="contactForm">
        <img className="myimage" src={about} alt="" height={400} width={800} />
      </div>
    </div>
  );
}

export default AboutUs;
