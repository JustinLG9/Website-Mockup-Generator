import React from "react";
import "./css/LoadingShader.css";

export default function loadingShader() {
  return (
    <div className="shader">
      <div className="hollow-dots-spinner">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}
