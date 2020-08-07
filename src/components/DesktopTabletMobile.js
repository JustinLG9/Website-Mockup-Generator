import React from "react";
import firebase from "firebase";
import "./css/MultiDeviceDisplays.css";

import LoadingShader from "./LoadingShader.js";
import {
  black3DeviceDownloadInfo,
  white3DeviceDownloadInfo,
} from "../downloadInfo.js";

export default function DesktopMacbookTabletMobile({
  imageData,
  downloadFunc,
  downloadingBlackIndex,
  downloadingWhiteIndex,
  downloadingBlack,
  downloadingWhite,
}) {
  function SingleDeviceDisplay({ imageData, ...props }) {
    const {
      deviceImgSrc,
      deviceImgID,
      deviceScreenCoords,
      deviceDimensions,
      displayImgSrc,
      displayImgID,
    } = imageData;

    const top = (deviceScreenCoords.Y1 / deviceDimensions.height) * 100 + "%";
    const left = (deviceScreenCoords.X1 / deviceDimensions.width) * 100 + "%";
    const width =
      ((deviceScreenCoords.X2 - deviceScreenCoords.X1) /
        deviceDimensions.width) *
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
      <div className="imageDisplay" {...props}>
        <img
          src={deviceImgSrc}
          className="multi-device-image"
          id={deviceImgID}
          alt="Device"
          data-dimension={
            deviceDimensions.width + "," + deviceDimensions.height
          }
        />
        <img
          src={displayImgSrc}
          style={displayImageStyle}
          alt="Display"
          className={`multi-display-image ${displayImgID}`}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="multi-device-display DMTM-black">
        <SingleDeviceDisplay
          imageData={imageData.desktop}
          className="DTM-desktop imageDisplay single-device"
        />
        <SingleDeviceDisplay
          imageData={imageData.tabletBlack}
          className="DTM-tablet imageDisplay single-device"
        />
        <SingleDeviceDisplay
          imageData={imageData.mobileBlack}
          className="DTM-mobile imageDisplay single-device"
        />
      </div>
      <div className="row justify-content-around">
        <button
          className="btn btn-primary btn-block col-4 download-all-btn"
          onClick={() => {
            if (!downloadingBlack) {
              firebase.analytics().logEvent("threeDevicesBlack");
              downloadFunc(
                black3DeviceDownloadInfo,
                "3-devices-black.png",
                downloadingBlackIndex
              );
            }
          }}
        >
          Download 3 Devices - Black
          {downloadingBlack && <LoadingShader />}
        </button>

        <button
          className="btn btn-primary btn-block col-4 download-all-btn"
          onClick={() => {
            if (!downloadingWhite) {
              firebase.analytics().logEvent("threeDevicesWhite");
              downloadFunc(
                white3DeviceDownloadInfo,
                "3-devices-white.png",
                downloadingWhiteIndex
              );
            }
          }}
        >
          Download 3 Devices - White
          {downloadingWhite && <LoadingShader />}
        </button>
      </div>
    </div>
  );
}
