import React from "react";
import "./css/FileUpload.css";

export default function FileUpload({ uploadFunc }) {
  return (
    <div className="custom-photos-container">
      <div className="col-12">
        <p className="upload-file-label">Or Upload Your Own Photos</p>
      </div>
      <div className="row justify-content-around">
        <div className="col-md-2">
          <p className="upload-header">Mobile</p>
          <input
            type="file"
            accept=".jpg, .png"
            className="custom-file-input"
            id="upload-mobile-file"
            onChange={(event) => uploadFunc(event, "mobile")}
          />
          <label
            htmlFor="upload-mobile-file"
            className="custom-file-label"
            style={{ textAlign: "left", overflow: "hidden" }}
          >
            Choose Image
          </label>
        </div>

        <div className="col-md-2">
          <p className="upload-header">Tablet</p>
          <input
            type="file"
            accept=".jpg, .png"
            className="custom-file-input"
            id="upload-tablet-file"
            onChange={(event) => uploadFunc(event, "tablet")}
          />
          <label
            htmlFor="upload-tablet-file"
            className="custom-file-label"
            style={{ textAlign: "left", overflow: "hidden" }}
          >
            Choose Image
          </label>
        </div>

        <div className="col-md-2">
          <p className="upload-header">Laptop</p>
          <input
            type="file"
            accept=".jpg, .png"
            className="custom-file-input"
            id="upload-laptop-file"
            onChange={(event) => uploadFunc(event, "laptop")}
          />
          <label
            htmlFor="upload-laptop-file"
            className="custom-file-label"
            style={{ textAlign: "left", overflow: "hidden" }}
          >
            Choose Image
          </label>
        </div>

        <div className="col-md-2">
          <p className="upload-header">Desktop</p>
          <input
            type="file"
            accept=".jpg, .png"
            className="custom-file-input"
            id="upload-desktop-file"
            onChange={(event) => uploadFunc(event, "desktop")}
          />
          <label
            htmlFor="upload-desktop-file"
            className="custom-file-label"
            style={{ textAlign: "left", overflow: "hidden" }}
          >
            Choose Image
          </label>
        </div>
      </div>
    </div>
  );
}
