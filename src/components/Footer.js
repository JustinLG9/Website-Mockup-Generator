import React from "react";

export default function Footer() {
  return (
    <div
      class="jumbotron row justify-content-center align-items-center footer-container"
      style={{ margin: "50px 0 0 0", padding: "25px 10px" }}
    >
      <div class="col-12">
        <p>
          Website screenshots powered by{" "}
          <a href="https://www.thum.io" target="_blank">
            Thum.io API
          </a>
        </p>
      </div>
      <div class="col-12">
        <p>
          Have questions or bug reports?{" "}
          <a href={"mailto:justinlgargano@yahoo.com"} target="_blank">
            Contact me
          </a>
        </p>
      </div>
      <div class="col-12">
        <p>
          © Copyright 2020, All Rights Reserved | Developed by Justin Gargano
        </p>
      </div>
    </div>
  );
}
