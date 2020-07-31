import React from "react";
import "./App.css";

import NavBar from "./components/NavBar.js";
import HowTo from "./components/HowTo.js";
import UrlInput from "./components/UrlInput.js";
import FileUpload from "./components/FileUpload.js";
import DownloadAllBtn from "./components/DownloadAllBtn.js";
import DeviceDisplay from "./components/DeviceDisplay.js";

import { downloadAll, downloadSingleImage } from "./functions.js";

function App() {
  const imageData = {
    mobileBlack: {
      title: "mobileBlack",
      deviceImgSrc: require("./deviceImages/mobile-black.png"),
      deviceScreenCoords: { X1: 28, Y1: 129, X2: 504, Y2: 975 },
      deviceDimensions: { width: 539, height: 1091 },
      displayImgSrc: require("./deviceImages/espnMobile.png"),
      displayImgID: "mobile-black-display-img",
      buttonText: "Download Mobile - Black",
      filename: "mobile-black.png",
      largeImage: false,
    },
    mobileWhite: {
      title: "mobileWhite",
      deviceImgSrc: require("./deviceImages/mobile-white.png"),
      deviceScreenCoords: { X1: 20, Y1: 73, X2: 277, Y2: 532 },
      deviceDimensions: { width: 297, height: 605 },
      displayImgSrc: require("./deviceImages/espnMobile.png"),
      displayImgID: "mobile-white-display-img",
      buttonText: "Download Mobile - White",
      filename: "mobile-white.png",
      largeImage: false,
    },
    tabletBlack: {
      title: "tabletBlack",
      deviceImgSrc: require("./deviceImages/tablet-black.png"),
      deviceScreenCoords: { X1: 86, Y1: 205, X2: 1655, Y2: 2290 },
      deviceDimensions: { width: 1740, height: 2502 },
      displayImgSrc: require("./deviceImages/espnTablet.png"),
      displayImgID: "tablet-black-display-img",
      buttonText: "Download Tablet - Black",
      filename: "tablet-black.png",
      largeImage: false,
    },
    tabletWhite: {
      title: "tabletWhite",
      deviceImgSrc: require("./deviceImages/tablet-white.png"),
      deviceScreenCoords: { X1: 115, Y1: 215, X2: 2180, Y2: 2965 },
      deviceDimensions: { width: 2293, height: 3180 },
      displayImgSrc: require("./deviceImages/espnTablet.png"),
      displayImgID: "tablet-white-display-img",
      buttonText: "Download Tablet - White",
      filename: "tablet-white.png",
      largeImage: false,
    },
    laptop: {
      title: "laptop",
      deviceImgSrc: require("./deviceImages/laptop.png"),
      deviceScreenCoords: { X1: 90, Y1: 25, X2: 662, Y2: 382 },
      deviceDimensions: { width: 752, height: 448 },
      displayImgSrc: require("./deviceImages/espnDesktop.png"),
      displayImgID: "laptop-display-img",
      buttonText: "Download Laptop",
      filename: "laptop.png",
      largeImage: true,
    },
    desktop: {
      title: "desktop",
      deviceImgSrc: require("./deviceImages/desktop.png"),
      deviceScreenCoords: { X1: 116, Y1: 108, X2: 1600, Y2: 939 },
      deviceDimensions: { width: 1716, height: 1361 },
      displayImgSrc: require("./deviceImages/espnDesktop.png"),
      displayImgID: "desktop-display-img",
      buttonText: "Download Desktop",
      filename: "desktop.png",
      largeImage: true,
    },
  };

  function downloadIndividual(title) {
    const {
      deviceImgSrc,
      displayImgSrc,
      deviceScreenCoords,
      filename,
    } = imageData[title];

    downloadSingleImage(
      deviceImgSrc,
      displayImgSrc,
      deviceScreenCoords,
      filename
    );
  }

  function downloadAllImages() {
    downloadAll(imageData);
  }

  function uploadAndRenderFile(event, viewport) {
    // Get File
    const file = event.target.files[0];

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }

    // Add image to canvas
    reader.addEventListener(
      "load",
      () => {
        const newSrc = reader.result;
        updateImages(viewport, newSrc);
      },
      false
    );
  }

  function updateAllImages(mobileSrc, tabletSrc, desktopSrc) {
    updateImages("mobile", mobileSrc, true);
    updateImages("tablet", tabletSrc, true);
    updateImages("desktop", desktopSrc, true);
  }

  function updateImages(viewport, newSrc, anonymous = false) {
    switch (viewport) {
      case "mobile": {
        imageData.mobileBlack.displayImgSrc = newSrc;
        imageData.mobileWhite.displayImgSrc = newSrc;
        document.getElementById("mobile-black-display-img").src = newSrc;
        document.getElementById("mobile-white-display-img").src = newSrc;
        if (anonymous) {
          document.getElementById("mobile-black-display-img").crossOrigin =
            "anonymous";
          document.getElementById("mobile-white-display-img").crossOrigin =
            "anonymous";
        }
        break;
      }
      case "tablet": {
        imageData.tabletBlack.displayImgSrc = newSrc;
        imageData.tabletWhite.displayImgSrc = newSrc;
        document.getElementById("tablet-black-display-img").src = newSrc;
        document.getElementById("tablet-white-display-img").src = newSrc;
        if (anonymous) {
          document.getElementById("tablet-black-display-img").crossOrigin =
            "anonymous";
          document.getElementById("tablet-white-display-img").crossOrigin =
            "anonymous";
        }
        break;
      }
      case "desktop": {
        imageData.laptop.displayImgSrc = newSrc;
        imageData.desktop.displayImgSrc = newSrc;
        document.getElementById("laptop-display-img").src = newSrc;
        document.getElementById("desktop-display-img").src = newSrc;
        if (anonymous) {
          document.getElementById("laptop-display-img").crossOrigin =
            "anonymous";
          document.getElementById("desktop-display-img").crossOrigin =
            "anonymous";
        }
        break;
      }
      default:
        return false;
    }
  }

  return (
    <div className="App">
      <NavBar />
      <div class="container editorContainer">
        <div class="col-md-10 m-auto">
          <HowTo />
          <div class="image-selectors">
            <UrlInput updateAllImagesFunc={updateAllImages} />
            <div class="file-upload">
              <FileUpload uploadFunc={uploadAndRenderFile} />
            </div>
          </div>
          <DownloadAllBtn downloadFunc={downloadAllImages} />
          <div class="row device-displays">
            {Object.values(imageData).map(
              ({
                title,
                deviceImgSrc,
                deviceScreenCoords,
                deviceDimensions,
                displayImgSrc,
                displayImgID,
                buttonText,
                filename,
                largeImage,
              }) => {
                return (
                  <DeviceDisplay
                    title={title}
                    deviceImageSrc={deviceImgSrc}
                    deviceScreenCords={deviceScreenCoords}
                    deviceDimensions={deviceDimensions}
                    displayImageSrc={displayImgSrc}
                    displayImageID={displayImgID}
                    buttonText={buttonText}
                    largeImage={largeImage}
                    downloadFunc={downloadIndividual}
                    key={filename}
                  />
                );
              }
            )}
          </div>
        </div>
        <div style={{ height: "1000px" }} />
      </div>
    </div>
  );
}

export default App;
