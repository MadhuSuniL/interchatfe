import React from "react";
import logo from "../../assets/logo2.png"; // Replace with the path to your logo

const bufferStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const containerStyle = {
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const containerStyle2 = {
  textAlign: "center",
  display: "flex",
  // flexDirection: "column",
  alignItems: "center",
};



function Buffer({show}) {
  return (
    <>
    {
      show &&
      <div style={bufferStyle}>
        <div style={containerStyle}>
          {/* <img src={logo} className="mx-2 animate-pulse h-10" alt="Logo" /> */}
          <div style={containerStyle2}>
            <span className="loading loading-ring loading-lg"></span>
            Please wait ..
          </div>
        </div>
      </div>
    }
    </>
  );
}

export default Buffer;
