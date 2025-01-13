import React, { useState, useRef, useEffect } from "react";
import * as motion from "motion/react-client";
const Block = ({ id, removeBlock, height }) => {
  const constraintsRef = useRef();
  const handleDrag = (e, info) => {
    const { x } = info.point;
    const constraintsRect = constraintsRef.current?.getBoundingClientRect();
    if (
      constraintsRect &&
      (x <= constraintsRect.left - x / 2 || x >= constraintsRect.right + x / 4)
    ) {
      removeBlock(id);
    }
  };

  return (
    <div>
      <motion.div
        ref={constraintsRef}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 75,
          height: height,
          borderRadius: 10,
        }}
      >
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.2}
          style={{
            width: 50,
            height: 50,
            borderRadius: 4,
          }}
          className="block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, x: 50 }}
          transition={{ duration: 0.3 }}
          onDrag={handleDrag}
        />
      </motion.div>
    </div>
  );
};

export default Block;
