import React from "react";
import "./css/DeviceDisplay.css";

export default function DeviceDisplay({
  title,
  deviceImageSrc,
  deviceScreenCords,
  deviceDimensions,
  displayImageSrc,
  displayImageID,
  buttonText,
  largeImage,
  downloadFunc,
}) {
  const top = (deviceScreenCords.Y1 / deviceDimensions.height) * 100 + "%";
  const left = (deviceScreenCords.X1 / deviceDimensions.width) * 100 + "%";
  const width =
    ((deviceScreenCords.X2 - deviceScreenCords.X1) / deviceDimensions.width) *
      100 +
    "%";
  const height =
    ((deviceScreenCords.Y2 - deviceScreenCords.Y1) / deviceDimensions.height) *
      100 +
    "%";
  let displayImageStyle = {
    top: top,
    left: left,
    width: width,
    height: height,
  };

  return (
    <div class={`${largeImage ? "col-sm-12 col-lg-6" : "col-6"}`}>
      <div class="imageDisplay">
        <img src={deviceImageSrc} class="device-image" alt="Device" />
        <img
          src={displayImageSrc}
          style={displayImageStyle}
          alt="Display"
          class="display-image"
          id={displayImageID}
        />
      </div>
      <button
        class="btn btn-primary btn-block"
        onClick={() => {
          console.log(title);
          downloadFunc(title);
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}
