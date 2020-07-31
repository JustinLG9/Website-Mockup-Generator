import React from "react";

export default function DownloadAllBtn({ downloadFunc }) {
  return (
    <div class="row justify-content-center">
      <div class="col-md-8">
        <button
          id="download-btn"
          class="btn btn-primary btn-block"
          onClick={() => downloadFunc()}
        >
          Download All Images
        </button>
      </div>
    </div>
  );
}
