import React from "react";
import firebase from "firebase";
import "./css/DeviceDisplay.css";

import LoadingShader from "./LoadingShader.js";

export default function DeviceDisplay({
  title,
  deviceImageSrc,
  deviceImageID,
  deviceScreenCoords,
  deviceDimensions,
  displayImageSrc,
  displayImageID,
  buttonText,
  largeImage,
  downloadFunc,
  downloading,
}) {
  const top = (deviceScreenCoords.Y1 / deviceDimensions.height) * 100 + "%";
  const left = (deviceScreenCoords.X1 / deviceDimensions.width) * 100 + "%";
  const width =
    ((deviceScreenCoords.X2 - deviceScreenCoords.X1) / deviceDimensions.width) *
      100 +
    "%";
  const height =
    ((deviceScreenCoords.Y2 - deviceScreenCoords.Y1) /
      deviceDimensions.height) *
      100 +
    "%";
  let displayImageStyle = {
    top: top,
    left: left,
    width: width,
    height: height,
  };

  return (
    <div className={`${largeImage ? "col-sm-12 col-lg-6" : "col-6"}`}>
      <div className="imageDisplay">
        <img
          src={deviceImageSrc}
          className="device-image"
          id={deviceImageID}
          alt="Device"
          data-dimension={
            deviceDimensions.width + "," + deviceDimensions.height
          }
        />
        <img
          src={displayImageSrc}
          style={displayImageStyle}
          alt="Display"
          className={`display-image ${displayImageID}`}
          id={displayImageID}
        />
      </div>
      <button
        className="btn btn-primary btn-block col-lg-8"
        onClick={() => {
          if (!downloading) {
            firebase.analytics().logEvent(title);
            downloadFunc(title);
          }
        }}
        style={{ position: "relative", margin: "0 auto" }}
      >
        {buttonText}
        {downloading && <LoadingShader />}
      </button>
    </div>
  );
}
