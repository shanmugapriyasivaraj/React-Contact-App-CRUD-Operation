import React from "react";
import logo from "../assets/Loading_icon.gif";

const Spinner = () => {
  return (
    <>
      <img
        src={logo}
        alt="loading"
        className="d-block m-auto"
        style={{ width: "200px" }}
      />
    </>
  );
};

export default Spinner;
