import React from "react";
// import "../CustomCss/customer.css"

function CustomerSupport() {
  return (
    <section>
      <div class="container_wrapper container">
        <div class="contactForm">
          <h2>Customer Support</h2>
          <div class="formBox">
            <div class="inputBox w50">
              <input type="text" name="" required />
              <span>First Name</span>
            </div>
            <div class="inputBox w50">
              <input type="text" required />
              <span>Last Name</span>
            </div>
            <div class="inputBox w50">
              <input type="email" required />
              <span>Email Address</span>
            </div>
            <div class="inputBox w50">
              <input type="text" required />
              <span>Mobile Number</span>
            </div>
            <div class="inputBox w100">
              <textarea required></textarea>
              <span>Write your message here...</span>
            </div>
            <div class="inputBox w100">
              <input type="submit" value="Send" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerSupport;
