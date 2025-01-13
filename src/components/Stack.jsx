import React, { useState, useEffect } from "react";
import Block from "./Block";

const Stack = ({ name, count, setCount, setDrawToggle, height }) => {
  const [stack, setStack] = useState([]);

  useEffect(() => {
    let mini = count;
    if (mini <= 0) {
      mini = 0;
    } else if (mini > 10) {
      setCount(10);
      mini = 10;
    }

    setStack(Array.from({ length: mini }, (_, i) => `${name}-${i}`));
    setDrawToggle(false);
  }, [count, name, setDrawToggle]);

  const removeBlock = (id) => {
    setStack((prevStack) => prevStack.filter((blockId) => blockId !== id));
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <div className="stack">
      {stack.map((id) => (
        <Block key={id} id={id} removeBlock={removeBlock} height={height} />
      ))}
    </div>
  );
};
export default Stack;
