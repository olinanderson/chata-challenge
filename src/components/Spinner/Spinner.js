import React, { Fragment } from "react";
import spinner from "./spinner.gif";

export default () => (
  <Fragment>
    <img
      src={spinner}
      alt="Loading..."
      style={{
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: " center",
        alignSelf: "center",
        margin: "auto",
      }}
    />
  </Fragment>
);
