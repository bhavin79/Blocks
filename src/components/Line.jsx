import React from "react";
import * as motion from "motion/react-client";

const Line = ({ start, end }) => (
  <motion.svg
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    }}
  >
    <motion.line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      className="line"
      strokeWidth="10"
      initial={{ x2: start.x, y2: start.y }}
      animate={{ x2: end.x, y2: end.y }}
    />
  </motion.svg>
);

export default Line;
