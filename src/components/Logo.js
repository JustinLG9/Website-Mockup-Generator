import React from "react";
import LogoImage from "../deviceImages/Logo.png";

export default function Logo({ size = 25, ...props }) {
  return (
    <div className="logo-container" {...props}>
      <img
        src={LogoImage}
        style={{ width: `calc(${size * 1.5 + "px"} + 4vw)` }}
        alt="Logo"
      />
    </div>
  );
}
