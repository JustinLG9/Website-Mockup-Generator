import React, { useState } from "react";
import LoadingShader from "./LoadingShader.js";

export default function UrlInput({ getUrlImagesAndUpdateFunc, gettingImages }) {
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="website-url mb-3">
      <div className="col-12">
        <label htmlFor="website-url-input" className="website-url-label">
          <strong>Enter Website URL</strong>
        </label>
      </div>
      <div className="row justify-content-center">
        <input
          type="text"
          placeholder="www.espn.com"
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
            if (!gettingImages) maybeGetUrlImagesAndUpdate(url);
          }}
        >
          Submit
          {gettingImages && <LoadingShader />}
        </button>
      </div>
      <div className="row justify-content-center">
        <p class="text-danger" style={{ margin: "10px 0" }}>
          {errorMessage}
        </p>
      </div>
    </div>
  );

  function maybeGetUrlImagesAndUpdate(url) {
    const isStringInArray = (str, array) => {
      array.forEach((popularScheme) => {
        if (str === popularScheme) {
          return true;
        }
      });

      return false;
    };

    function getPosition(string, subString, index) {
      return string.split(subString, index).join(subString).length;
    }

    setErrorMessage("");

    // Check if input is in url format before calling Thum.io API
    try {
      new URL(url);

      getUrlImagesAndUpdateFunc(url);
    } catch (_) {
      const popularUrlSchemes = [
        "file://",
        "ftp://",
        "http://",
        "https://",
        "telnet://",
      ];
      const popularTopLevelDomains = [
        ".com",
        ".net",
        ".io",
        ".org",
        ".ru",
        ".de",
        ".uk",
        ".info",
        ".nl",
        ".cn",
        ".xyz",
        ".gov",
        ".mil",
        ".edu",
        ".ca",
        ".jp",
        ".fr",
        ".au",
        ".us",
        ".ch",
        ".it",
        ".nl",
        ".se",
        ".no",
        ".es",
      ];

      let error = "Invalid URL: ";
      const urlScheme = url.split(0, url.indexOf("//") + 2);
      const urlTopLevelDomain = url.split(
        getPosition(url, ".", 2),
        url.indexOf("/", getPosition(url, ".", 2))
      );

      if (!url) {
        error += "Please enter a URL";
      } else if (!isStringInArray(urlScheme, popularUrlSchemes)) {
        error += "Likely an invalid scheme (Most websites use https://)";
      } else if (
        !isStringInArray(urlTopLevelDomain, popularTopLevelDomains) &&
        url.indexOf("/", getPosition(url, ".", 2)) !== -1
      ) {
        error +=
          "Likely an invalid top level domain (Popular ones include .com, .edu, .org, .gove)";
      } else {
        error +=
          "Please check that you've entered the exact address and try again";
      }

      setErrorMessage(error);

      return false;
    }
  }
}
