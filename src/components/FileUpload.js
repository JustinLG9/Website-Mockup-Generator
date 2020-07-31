import React from "react";
import "./css/FileUpload.css";

export default function FileUpload({ uploadFunc }) {
  return (
    <div class="custom-photos-container">
      <div class="col-12">
        <p class="upload-file-label">Or Upload Your Own Photos</p>
      </div>
      <div class="row justify-content-around">
        <div class="col-md-3">
          <p class="upload-header">Mobile</p>
          <input
            type="file"
            accept=".jpg, .png"
            class="custom-file-input"
            id="upload-mobile-file"
            onChange={(event) => uploadFunc(event, "mobile")}
          />
          <label
            for="upload-mobile-file"
            class="custom-file-label"
            style={{ textAlign: "left" }}
          >
            Choose Image
          </label>
        </div>

        <div class="col-md-3">
          <p class="upload-header">Tablet</p>
          <input
            type="file"
            accept=".jpg, .png"
            class="custom-file-input"
            id="upload-tablet-file"
            onChange={(event) => uploadFunc(event, "tablet")}
          />
          <label
            for="upload-tablet-file"
            class="custom-file-label"
            style={{ textAlign: "left" }}
          >
            Choose Image
          </label>
        </div>

        <div class="col-md-3">
          <p class="upload-header">Desktop</p>
          <input
            type="file"
            accept=".jpg, .png"
            class="custom-file-input"
            id="upload-desktop-file"
            onChange={(event) => uploadFunc(event, "desktop")}
          />
          <label
            for="upload-desktop-file"
            class="custom-file-label"
            style={{ textAlign: "left" }}
          >
            Choose Image
          </label>
        </div>
      </div>
    </div>
  );
}
