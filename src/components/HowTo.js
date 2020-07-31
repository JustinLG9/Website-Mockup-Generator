import React from "react";

export default function HowTo() {
  return (
    <div class="info">
      <h1>How To Use</h1>
      <p>
        Need portfolio images of your website on different devices? Simply enter
        your websites url below (make sure to enter the full address with{" "}
        <strong>https://www.</strong> or <strong>http://www.</strong>) and click
        submit. You can also upload your own files for each device type (Mobile,
        Tablet, and Desktop). After doing so, you can preview the device images
        below and then download individual device images by clicking their
        respective buttons or download a zip file with all of them by clicking
        the "Download All Images" button. If images don't load after entering a
        URL please make sure you entered the address correctly and included the
        proper prefix and extension.{" "}
        <strong>
          Please give the URL input time to load your websites images! You
          should see a loader shortly after clicking "Submit" but it can take up
          to a minute to retrieve the images.
        </strong>{" "}
        Enjoy!
      </p>
    </div>
  );
}
