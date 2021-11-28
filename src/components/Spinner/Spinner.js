import React, { Fragment } from "react";
import spinner from "./spinner.gif";

export default () => (
  <Fragment>
    <img
      src={spinner}
      alt="Loading..."
      style={{
        width: "80px",
        position: "absolute",
        top: "50%",
        left: "50%",
        display: "block",
      }}
    />
  </Fragment>
);
