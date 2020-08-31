import React from "react";
import firebase from "firebase/app";
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
  function getDisplayImgStyle(deviceScreenCoords, deviceDimensions) {
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

    return {
      top: top,
      left: left,
      width: width,
      height: height,
    };
  }

  return (
    <div>
      <div className="multi-device-display DMTM-black">
        <div className="DTM-desktop imageDisplay single-device">
          <img
            src={imageData.desktop.deviceImgSrc}
            className="multi-device-image"
            id={imageData.desktop.deviceImgID}
            alt="Device"
            data-dimension={
              imageData.desktop.deviceDimensions.width +
              "," +
              imageData.desktop.deviceDimensions.height
            }
          />
          <img
            src={imageData.desktop.displayImgSrc}
            style={getDisplayImgStyle(
              imageData.desktop.deviceScreenCoords,
              imageData.desktop.deviceDimensions
            )}
            alt="Display"
            className={`multi-display-image ${imageData.desktop.displayImgID}`}
          />
        </div>
        <div className="DTM-tablet imageDisplay single-device">
          <img
            src={imageData.tabletBlack.deviceImgSrc}
            className="multi-device-image"
            id={imageData.tabletBlack.deviceImgID}
            alt="Device"
            data-dimension={
              imageData.tabletBlack.deviceDimensions.width +
              "," +
              imageData.tabletBlack.deviceDimensions.height
            }
          />
          <img
            src={imageData.tabletBlack.displayImgSrc}
            style={getDisplayImgStyle(
              imageData.tabletBlack.deviceScreenCoords,
              imageData.tabletBlack.deviceDimensions
            )}
            alt="Display"
            className={`multi-display-image ${imageData.tabletBlack.displayImgID}`}
          />
        </div>
        <div className="DTM-mobile imageDisplay single-device">
          <img
            src={imageData.mobileBlack.deviceImgSrc}
            className="multi-device-image"
            id={imageData.mobileBlack.deviceImgID}
            alt="Device"
            data-dimension={
              imageData.mobileBlack.deviceDimensions.width +
              "," +
              imageData.mobileBlack.deviceDimensions.height
            }
          />
          <img
            src={imageData.mobileBlack.displayImgSrc}
            style={getDisplayImgStyle(
              imageData.mobileBlack.deviceScreenCoords,
              imageData.mobileBlack.deviceDimensions
            )}
            alt="Display"
            className={`multi-display-image ${imageData.mobileBlack.displayImgID}`}
          />
        </div>
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
