import React from "react";

export default function Footer() {
  return (
    <footer>
      <div
        className="jumbotron row justify-content-center align-items-center footer-container"
        style={{ margin: "50px 0 0 0", padding: "25px 10px" }}
      >
        <div className="col-12">
          <p>
            Website screenshots powered by{" "}
            <a
              href="https://www.thum.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Thum.io API
            </a>
          </p>
        </div>
        <div className="col-12">
          <p>
            Have questions or feedback?{" "}
            <a
              href={"mailto:justinlgargano@yahoo.com"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact me
            </a>
          </p>
        </div>
        <div className="col-12">
          <p>
            Like the product? Feel free to{" "}
            <a
              href="https://ko-fi.com/B0B324OGL"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy me a Coffee
              <img
                src={require("../deviceImages/ko-fi.png")}
                alt="Ko-Fi Logo"
                style={{
                  height: "12px",
                  marginLeft: "4px",
                  marginBottom: "2px",
                }}
              />
            </a>
          </p>
        </div>
        <div className="col-12">
          <p>
            © Copyright 2020, All Rights Reserved | Developed by Justin Gargano
          </p>
        </div>
      </div>
    </footer>
  );
}
