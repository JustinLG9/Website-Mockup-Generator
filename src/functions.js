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
