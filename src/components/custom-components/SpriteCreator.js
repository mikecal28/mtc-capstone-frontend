import { useState, useEffect } from "react";

import WalkingDown1 from "../../img/main-char-frames/walking-down/main-char-4-1.png";
import WalkingDown2 from "../../img/main-char-frames/walking-down/main-char-4-2.png";
import WalkingDown3 from "../../img/main-char-frames/walking-down/main-char-4-3.png";
import WalkingDown4 from "../../img/main-char-frames/walking-down/main-char-4-4.png";
import WalkingDown5 from "../../img/main-char-frames/walking-down/main-char-4-5.png";
import WalkingDown6 from "../../img/main-char-frames/walking-down/main-char-4-6.png";

function SpriteCreator() {
  const [spriteFrame, setSpriteFrame] = useState();
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const spriteArray = [
      WalkingDown1,
      WalkingDown2,
      WalkingDown3,
      WalkingDown4,
      WalkingDown5,
      WalkingDown6,
    ];
    const frameInterval = setInterval(() => {
      setSpriteFrame(spriteArray[currentFrame]);
      console.log("hi");
      if (currentFrame >= 5) {
        setCurrentFrame(0);
      } else {
        setCurrentFrame((cF) => (cF += 1));
      }
    }, 175);

    return () => clearInterval(frameInterval);
  }, [currentFrame]);

  return (
    <div className="sprite-container">
      <img src={spriteFrame} alt="sprite" />
    </div>
  );
}

export default SpriteCreator;
