import JSZip from "jszip";
import { saveAs } from "file-saver";
var thum = require("thum.io");

export function drawImage(
  canvas,
  ctx,
  imgSrc,
  xStart = 0,
  yStart = 0,
  xEnd = 0,
  yEnd = 0
) {
  let img = new Image();
  img.addEventListener(
    "load",
    function () {
      if (xStart === 0 && yStart === 0) {
        canvas.width = xEnd = img.width;
        canvas.height = yEnd = img.height;
      }
      ctx.drawImage(img, xStart, yStart, xEnd, yEnd);
    },
    false
  );
  img.src = imgSrc;
}

export function drawDisplayImage(
  canvas,
  ctx,
  displayImgSrc,
  deviceScreenCords
) {
  drawImage(
    canvas,
    ctx,
    displayImgSrc,
    deviceScreenCords.X1,
    deviceScreenCords.Y1,
    deviceScreenCords.X2 - deviceScreenCords.X1,
    deviceScreenCords.Y2 - deviceScreenCords.Y1
  );
}

export function getDrawnCanvas(
  deviceImgSrc,
  displayImgSrc,
  deviceScreenCoords
) {
  let canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  drawImage(canvas, ctx, deviceImgSrc);
  drawDisplayImage(canvas, ctx, displayImgSrc, deviceScreenCoords);

  return canvas;
}

export function downloadSingleImage(
  deviceImgSrc,
  displayImgSrc,
  deviceScreenCoords,
  filename
) {
  const canvas = getDrawnCanvas(
    deviceImgSrc,
    displayImgSrc,
    deviceScreenCoords
  );

  // Init event
  let e;
  // Create link
  const link = document.createElement("a");

  setTimeout(() => {
    // Set props
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    // New mouse event
    e = new MouseEvent("click");
    // Dispatch event
    link.dispatchEvent(e);
  }, 20);
}

function getBase64Image(img) {
  return img
    .toDataURL("image/png")
    .replace(/^data:image\/(png|jpg);base64,/, "");
}

export function downloadAll(imagesData) {
  let zip = new JSZip();

  // Add each image to zip file
  Object.values(imagesData).forEach(
    ({ deviceImgSrc, deviceScreenCoords, displayImgSrc, filename }) => {
      const canvas = getDrawnCanvas(
        deviceImgSrc,
        displayImgSrc,
        deviceScreenCoords
      );

      setTimeout(() => {
        const imageDataBase64 = getBase64Image(canvas);

        zip.file(filename, imageDataBase64, { base64: true });
      }, 10);
    }
  );

  // Save zip file
  setTimeout(() => {
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "deviceDisplays.zip");
    });
  }, Object.keys(imagesData).length * 10 + 50);
}

export function getUrlImages(url, updateAllImagesFunc) {
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

  updateAllImagesFunc(thumURLMobile, thumURLTablet, thumURLDesktop);
}
