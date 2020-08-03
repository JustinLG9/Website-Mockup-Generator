import React from "react";
import Logo from "./Logo.js";

export default function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-info mb-5">
      <div className="nav-container row align-items-center">
        <Logo style={{ margin: "0 calc(20px + 2vw)" }} />
        <a href="/" className="navbar-brand">
          Website Mockup Generator
        </a>
      </div>
    </nav>
  );
}
