import React from "react";
import Navbar from "../Components/Navbar";

const DefaultLayout = (props) => {
  return (
    <div className="defaultLayout">
      <Navbar />
      {props.children}
      <div id="footer">
        <p>Impressum</p>
      </div>
    </div>
  );
};

export default DefaultLayout;
