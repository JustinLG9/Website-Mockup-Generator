import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase/app";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyDxqhy7D7TVyT4LGt1VP7dWhX-xsxsxNLQ",
  authDomain: "website-mockup-generator.firebaseapp.com",
  databaseURL: "https://website-mockup-generator.firebaseio.com",
  projectId: "website-mockup-generator",
  storageBucket: "website-mockup-generator.appspot.com",
  messagingSenderId: "942367373179",
  appId: "1:942367373179:web:ae6b58e91250318f0aafde",
  measurementId: "G-61R8W48JTN",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
