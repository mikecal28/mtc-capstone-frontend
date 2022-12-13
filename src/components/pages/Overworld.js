import { useState, useEffect, useRef } from "react";

// import BackgroundImage from "../../img/overworld-waters-upscaled.png";
// import BackgroundImage from "../../img/upscaled-town.png";

function Overworld() {
  const backgroundRef = useRef();

  useEffect(() => {
    console.log(backgroundRef.current.style);
  }, []);

  return (
    <div className="overworld-container">
      <div className="background-wrapper">
        {/* <img
          src={BackgroundImage}
          alt="overworld background"
          ref={backgroundRef}
        /> */}
      </div>
    </div>
  );
}

export default Overworld;
