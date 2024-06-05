import React, { Fragment } from "react";
import Spinner from "./Spinner.gif";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

export default () => [
  <Fragment>
    <img
      src={Spinner}
      style={{ width: "200px", margin: "auto", display: "block" }}
      alt="loading"
    ></img>
  </Fragment>,
];
