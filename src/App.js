import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import "./App.css";

import NavBar from "./components/NavBar.js";
import HowTo from "./components/HowTo.js";
import UrlInput from "./components/UrlInput.js";
import FileUpload from "./components/FileUpload.js";
import DownloadAllBtn from "./components/DownloadAllBtn.js";
import DeviceDisplay from "./components/DeviceDisplay.js";
import DesktopMacbookTabletMobileDisplay from "./components/DesktopMacbookTabletMobile.js";
import DesktopTabletMobile from "./components/DesktopTabletMobile.js";
import Footer from "./components/Footer";

import {
  blackAllDownloadInfo,
  whiteAllDownloadInfo,
  black3DeviceDownloadInfo,
  white3DeviceDownloadInfo,
} from "./downloadInfo.js";

let thum = require("thum.io");

function App() {
  const [downloadingSingle, setDownloadingSingle] = useState([
    false, // mobile - black
    false, // mobile - white
    false, // tablet - black
    false, // tablet - white
    false, // laptop
    false, // desktop
    false, // all devices - black
    false, // all devices - white
    false, // DTM - black
    false, // DTM - white
  ]);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [gettingUrlImages, setGettingUrlImages] = useState(false);
  const totalNumberOfPictures = downloadingSingle.length;
  let imagesLoaded = 0;

  const imageData = {
    mobileBlack: {
      title: "mobileBlack",
      deviceImgSrc: require("./deviceImages/mobile-black.png"),
      deviceImgID: "mobile-black-device-img",
      deviceScreenCoords: { X1: 28, Y1: 129, X2: 504, Y2: 978 },
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
      deviceImgID: "mobile-white-device-img",
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
      deviceImgID: "tablet-black-device-img",
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
      deviceImgID: "tablet-white-device-img",
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
      deviceImgID: "laptop-device-img",
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
      deviceImgID: "desktop-device-img",
      deviceScreenCoords: { X1: 116, Y1: 108, X2: 1600, Y2: 941 },
      deviceDimensions: { width: 1716, height: 1361 },
      displayImgSrc: require("./deviceImages/espnDesktop.png"),
      displayImgID: "desktop-display-img",
      buttonText: "Download Desktop",
      filename: "desktop.png",
      largeImage: true,
    },
  };

  function downloadCanvas(canvas, filename) {
    let e;
    const link = document.createElement("a");

    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    e = new MouseEvent("click");
    link.dispatchEvent(e);
  }

  function downloadIndividual(title) {
    const {
      deviceImgID,
      displayImgID,
      deviceScreenCoords,
      filename,
    } = imageData[title];

    // Update downloading single state
    let updateDownloadSingleState = [...downloadingSingle];
    const index = Object.keys(imageData).findIndex((key) => key === title);
    updateDownloadSingleState[index] = true;
    setDownloadingSingle(updateDownloadSingleState);

    let canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const deviceImgElem = document.getElementById(deviceImgID);
    const displayImgElem = document.getElementById(displayImgID);

    // Draw device image first
    let deviceImg = new Image();
    deviceImg.addEventListener(
      "load",
      () => {
        canvas.width = deviceImg.naturalWidth;
        canvas.height = deviceImg.naturalHeight;
        ctx.drawImage(
          deviceImg,
          0,
          0,
          deviceImg.naturalWidth,
          deviceImg.naturalHeight
        );
        displayImg.src = displayImgElem.src;
      },
      false
    );
    deviceImg.src = deviceImgElem.src;

    // Draw display image second
    let displayImg = new Image();
    if (displayImgElem.crossOrigin === "anonymous") {
      displayImg.crossOrigin = "anonymous";
    }
    displayImg.addEventListener(
      "load",
      () => {
        const { X1, Y1, X2, Y2 } = deviceScreenCoords;
        ctx.drawImage(displayImg, X1, Y1, X2 - X1, Y2 - Y1);

        // Download canvas after both images drawn
        downloadCanvas(canvas, filename);

        // Update downloading single state
        let reupdateDownloadSingleState = [...downloadingSingle];
        reupdateDownloadSingleState[index] = false;
        setDownloadingSingle(reupdateDownloadSingleState);
      },
      false
    );
  }

  function getBase64Image(img) {
    return img
      .toDataURL("image/png")
      .replace(/^data:image\/(png|jpg);base64,/, "");
  }

  function downloadAllImages() {
    setDownloadingAll(true);
    let zip = new JSZip();
    imagesLoaded = 0;

    createMultiDeviceCanvasAndMaybeDownload(
      blackAllDownloadInfo,
      "all-devices-black.png",
      -1,
      false,
      zip
    );
    createMultiDeviceCanvasAndMaybeDownload(
      whiteAllDownloadInfo,
      "all-devices-white.png",
      -1,
      false,
      zip
    );
    createMultiDeviceCanvasAndMaybeDownload(
      black3DeviceDownloadInfo,
      "3-devices-black.png",
      -1,
      false,
      zip
    );
    createMultiDeviceCanvasAndMaybeDownload(
      white3DeviceDownloadInfo,
      "3-devices-white.png",
      -1,
      false,
      zip
    );

    // Add each image to zip file
    Object.values(imageData).forEach(
      ({ deviceImgID, deviceScreenCoords, displayImgID, filename }) => {
        let canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const deviceImgElem = document.getElementById(deviceImgID);
        const displayImgElem = document.getElementById(displayImgID);

        // Draw device image first
        let deviceImg = new Image();
        deviceImg.addEventListener(
          "load",
          () => {
            canvas.width = deviceImg.naturalWidth;
            canvas.height = deviceImg.naturalHeight;
            ctx.drawImage(
              deviceImg,
              0,
              0,
              deviceImg.naturalWidth,
              deviceImg.naturalHeight
            );
            displayImg.src = displayImgElem.src;
          },
          false
        );
        deviceImg.src = deviceImgElem.src;

        // Draw display image second
        let displayImg = new Image();
        if (displayImgElem.crossOrigin === "anonymous") {
          displayImg.crossOrigin = "anonymous";
        }
        displayImg.addEventListener(
          "load",
          () => {
            const { X1, Y1, X2, Y2 } = deviceScreenCoords;
            ctx.drawImage(displayImg, X1, Y1, X2 - X1, Y2 - Y1);

            // Add drawn canvas to zip file
            const imageDataBase64 = getBase64Image(canvas);

            zip.file(filename, imageDataBase64, { base64: true });

            if (++imagesLoaded === totalNumberOfPictures) {
              // Save zip file
              zip.generateAsync({ type: "blob" }).then((content) => {
                saveAs(content, "deviceDisplays.zip");
                setDownloadingAll(false);
              });
            }
          },
          false
        );
      }
    );
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

  function getUrlImagesAndUpdate(url) {
    setGettingUrlImages(true);
    console.log(gettingUrlImages);

    let fullUrl = url;
    if (fullUrl.slice(0, 8) !== "https://") {
      fullUrl = "https://" + fullUrl;
    }

    let thumURLBase = thum.getThumURL({
      url: fullUrl,
      auth: {
        type: "md5",
        secret: "devicedisplay",
        keyId: 10416,
      },
    });
    const insertionIndex = thumURLBase.indexOf("auth");
    let thumURLMobile =
      thumURLBase.slice(0, insertionIndex) +
      "width/320/" +
      "iphone6/" +
      thumURLBase.slice(insertionIndex, thumURLBase.length);
    let thumURLTablet =
      thumURLBase.slice(0, insertionIndex) +
      "width/768/" +
      "ipad/" +
      thumURLBase.slice(insertionIndex, thumURLBase.length);
    let thumURLDesktop =
      thumURLBase.slice(0, insertionIndex) +
      "width/1200/" +
      "viewportWidth/1440/" +
      "crop/750/" +
      thumURLBase.slice(insertionIndex, thumURLBase.length);

    // Wait for all images to load to enable clicking the submit button again
    let loadedImages = 0;
    const mobileImg = document.getElementById(
      imageData.mobileBlack.displayImgID
    );
    const tabletImg = document.getElementById(
      imageData.tabletBlack.displayImgID
    );
    const desktopImg = document.getElementById(imageData.desktop.displayImgID);

    function onImageLoad() {
      console.log(loadedImages, gettingUrlImages);
      if (++loadedImages === 3) {
        setGettingUrlImages(false);
        mobileImg.removeEventListener("load", onImageLoad());
        tabletImg.removeEventListener("load", onImageLoad());
        desktopImg.removeEventListener("load", onImageLoad());
      }
    }
    mobileImg.addEventListener("load", onImageLoad());
    tabletImg.addEventListener("load", onImageLoad());
    desktopImg.addEventListener("load", onImageLoad());

    updateAllImages(thumURLMobile, thumURLTablet, thumURLDesktop);
  }

  function updateAllImages(mobileSrc, tabletSrc, desktopSrc) {
    updateImages("mobile", mobileSrc, true);
    updateImages("tablet", tabletSrc, true);
    updateImages("desktop", desktopSrc, true);
  }

  function updateImages(viewport, newSrc, anonymous = false) {
    function updateImageDataAndElems(elemData) {
      elemData.forEach(({ className, imageDataName }) => {
        const elems = Array.from(document.getElementsByClassName(className));

        elems.forEach((elem) => {
          imageData[imageDataName].displayImgSrc = newSrc;
          elem.src = newSrc;
          if (anonymous) {
            elem.crossOrigin = "anonymous";
          } else {
            elem.removeAttribute("crossOrigin");
          }
        });
      });
    }

    switch (viewport) {
      case "mobile": {
        updateImageDataAndElems([
          {
            className: "mobile-black-display-img",
            imageDataName: "mobileBlack",
          },
          {
            className: "mobile-white-display-img",
            imageDataName: "mobileWhite",
          },
        ]);
        break;
      }
      case "tablet": {
        updateImageDataAndElems([
          {
            className: "tablet-black-display-img",
            imageDataName: "tabletBlack",
          },
          {
            className: "tablet-white-display-img",
            imageDataName: "tabletWhite",
          },
        ]);
        break;
      }
      case "desktop": {
        updateImageDataAndElems([
          {
            className: "laptop-display-img",
            imageDataName: "laptop",
          },
          {
            className: "desktop-display-img",
            imageDataName: "desktop",
          },
        ]);
        break;
      }
      default:
        return false;
    }
  }

  function createMultiDeviceCanvasAndMaybeDownload(
    images,
    filename,
    downloadingIndex,
    download = true,
    zip = null
  ) {
    if (downloadingIndex >= 0) {
      // Update downloading single state
      let updateDownloadSingleState = [...downloadingSingle];
      updateDownloadSingleState[downloadingIndex] = true;
      setDownloadingSingle(updateDownloadSingleState);
    }

    let multiCanvas = document.createElement("canvas");
    const multiCtx = multiCanvas.getContext("2d");

    multiCanvas.width = 1800;
    multiCanvas.height = 760;

    let drawnImages = 0;

    images.forEach(({ title, width, xStart, yStart }) => {
      const { deviceImgID, displayImgID, deviceScreenCoords } = imageData[
        title
      ];

      // Draw the device image on its own canvas
      let canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const deviceImgElem = document.getElementById(deviceImgID);
      const displayImgElem = document.getElementById(displayImgID);

      let deviceImg = new Image();
      deviceImg.addEventListener(
        "load",
        () => {
          canvas.width = deviceImg.naturalWidth;
          canvas.height = deviceImg.naturalHeight;
          ctx.drawImage(
            deviceImg,
            0,
            0,
            deviceImg.naturalWidth,
            deviceImg.naturalHeight
          );
          displayImg.src = displayImgElem.src;
        },
        false
      );
      deviceImg.src = deviceImgElem.src;

      // Draw display image second
      let displayImg = new Image();
      if (displayImgElem.crossOrigin === "anonymous") {
        displayImg.crossOrigin = "anonymous";
      }
      displayImg.addEventListener(
        "load",
        () => {
          const { X1, Y1, X2, Y2 } = deviceScreenCoords;
          ctx.drawImage(displayImg, X1, Y1, X2 - X1, Y2 - Y1);

          // Draw on multicanvas
          const aspectRatio = deviceImg.naturalHeight / deviceImg.naturalWidth;
          const multiCanvasImgWidth = multiCanvas.width * width;
          multiCtx.drawImage(
            canvas,
            multiCanvas.width * xStart,
            multiCanvas.height * yStart,
            multiCanvasImgWidth,
            multiCanvasImgWidth * aspectRatio
          );

          // Once all images loaded, download or add to zip file
          if (++drawnImages === images.length) {
            if (download) {
              downloadCanvas(multiCanvas, filename);
            } else {
              // Add drawn canvas to zip file
              const imageDataBase64 = getBase64Image(multiCanvas);

              zip.file(filename, imageDataBase64, { base64: true });

              if (++imagesLoaded === totalNumberOfPictures) {
                // Save zip file
                zip.generateAsync({ type: "blob" }).then((content) => {
                  saveAs(content, "deviceDisplays.zip");
                  setDownloadingAll(false);
                });
              }
            }

            if (downloadingIndex >= 0) {
              // Reupdate downloading single state
              let reupdateDownloadSingleState = [...downloadingSingle];
              reupdateDownloadSingleState[downloadingIndex] = false;
              setDownloadingSingle(reupdateDownloadSingleState);
            }
          }
        },
        false
      );
    });

    // document.getElementById("test").appendChild(multiCanvas);
  }

  return (
    <div className="App">
      <NavBar />
      <div className="container editorContainer">
        <div className="col-md-10 m-auto">
          <HowTo />
          <div className="image-selectors">
            <UrlInput
              getUrlImagesAndUpdateFunc={getUrlImagesAndUpdate}
              gettingImages={gettingUrlImages}
            />
            <div className="file-upload">
              <FileUpload uploadFunc={uploadAndRenderFile} />
            </div>
          </div>
          <DownloadAllBtn
            downloadFunc={downloadAllImages}
            downloading={downloadingAll}
          />
          <div className="multi-device-displays">
            <DesktopMacbookTabletMobileDisplay
              imageData={imageData}
              downloadingBlackIndex={6}
              downloadingWhiteIndex={7}
              downloadingBlack={downloadingSingle[6]}
              downloadingWhite={downloadingSingle[7]}
              downloadFunc={createMultiDeviceCanvasAndMaybeDownload}
            />
            <DesktopTabletMobile
              imageData={imageData}
              downloadingBlackIndex={8}
              downloadingWhiteIndex={9}
              downloadingBlack={downloadingSingle[8]}
              downloadingWhite={downloadingSingle[9]}
              downloadFunc={createMultiDeviceCanvasAndMaybeDownload}
            />
          </div>
          <div className="row single-device-displays">
            {Object.values(imageData).map(
              (
                {
                  title,
                  deviceImgSrc,
                  deviceImgID,
                  deviceScreenCoords,
                  deviceDimensions,
                  displayImgSrc,
                  displayImgID,
                  buttonText,
                  filename,
                  largeImage,
                },
                index
              ) => {
                return (
                  <DeviceDisplay
                    title={title}
                    deviceImageSrc={deviceImgSrc}
                    deviceImageID={deviceImgID}
                    deviceScreenCoords={deviceScreenCoords}
                    deviceDimensions={deviceDimensions}
                    displayImageSrc={displayImgSrc}
                    displayImageID={displayImgID}
                    buttonText={buttonText}
                    largeImage={largeImage}
                    downloadFunc={downloadIndividual}
                    downloading={downloadingSingle[index]}
                    key={filename}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
