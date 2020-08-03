import React, { useState } from "react";
import LoadingShader from "./LoadingShader.js";

export default function UrlInput({ getUrlImagesAndUpdateFunc, gettingImages }) {
  const [url, setUrl] = useState("");

  return (
    <div className="website-url mb-3">
      <div className="col-12">
        <label htmlFor="website-url-input" className="website-url-label">
          <strong>Enter Your Website URL</strong>
        </label>
      </div>
      <div class="row justify-content-center">
        <input
          type="text"
          placeholder="https://www.google.com"
          className="form-control website-url-input col-md-8"
          id="website-url-input"
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <div className="row justify-content-center">
        <button
          type="submit"
          id="website-url-submit"
          className="btn btn-success btn-block col-md-8"
          title="Submit"
          style={{ marginTop: "20px", position: "relative" }}
          onClick={() => {
            if (!gettingImages) getUrlImagesAndUpdateFunc(url);
          }}
        >
          Submit
          {gettingImages && <LoadingShader />}
        </button>
      </div>
    </div>
  );
}
