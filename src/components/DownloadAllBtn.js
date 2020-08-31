import React from "react";
import LoadingShader from "./LoadingShader.js";

export default function DownloadAllBtn({
  downloadFunc,
  downloading,
  ...props
}) {
  return (
    <div className="row justify-content-center" {...props}>
      <div className="col-md-8">
        <button
          id="download-btn"
          className="btn btn-primary btn-block"
          onClick={() => {
            if (!downloading) downloadFunc();
          }}
          style={{ position: "relative" }}
        >
          Download All Images
          {downloading && <LoadingShader />}
        </button>
      </div>
    </div>
  );
}
