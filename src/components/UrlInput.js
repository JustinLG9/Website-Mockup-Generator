import React, { useState } from "react";
import { getUrlImages } from "../functions.js";

export default function UrlInput({ updateAllImagesFunc }) {
  const [url, setUrl] = useState("");

  return (
    <div class="website-url mb-3">
      <div class="col-12">
        <label for="website-url-input" class="website-url-label">
          <strong>Enter Your Website URL</strong>
        </label>
      </div>
      <input
        type="text"
        placeholder="https://www.google.com"
        class="form-control website-url-input"
        id="website-url-input"
        onChange={(event) => setUrl(event.target.value)}
      />
      <div class="row justify-content-center">
        <button
          type="submit"
          id="website-url-submit"
          class="btn btn-success btn-block col-md-8"
          title="Submit"
          style={{ marginTop: "20px" }}
          onClick={() => maybeGetUrlImages()}
        >
          Submit
        </button>
      </div>
    </div>
  );

  function maybeGetUrlImages() {
    getUrlImages(url, updateAllImagesFunc);
  }
}
