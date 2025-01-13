import React from "react";
import Stack from "./Stack";
import Line from "./Line";
import * as motion from "motion/react-client";

const Visuals = ({
  count1,
  count2,
  setCount1,
  setCount2,
  drawToggle,
  dotRefs,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  inputToggle,
  handleAddBlock,
  getHeight,
  playAni,
  answerString,
  lines,
  currentLine,
  dotPositions,
}) => {
  return (
    <div
      className="visuals"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {[count1, count2].map((count, idx) => (
        <React.Fragment key={idx}>
          <div className="stack-container-wrapper">
            {drawToggle && (
              <div
                className={`dot dot${idx + 1}`}
                ref={dotRefs[`topDot${idx + 1}`]}
                onMouseDown={(e) => handleMouseDown(e, `topDot${idx + 1}`)}
              />
            )}
            <div className="stack-container">
              <Stack
                name={`#stack${idx + 1}`}
                count={idx === 0 ? count1 : count2}
                setCount={idx === 0 ? setCount1 : setCount2}
                setDrawToggle={() => {}}
                height={getHeight(idx)}
              />
              {drawToggle && (
                <div
                  className={`dot dot${idx + 1}`}
                  ref={dotRefs[`bottomDot${idx + 1}`]}
                  onMouseDown={(e) => handleMouseDown(e, `bottomDot${idx + 1}`)}
                />
              )}
              {inputToggle ? (
                <div>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={count}
                    onChange={(e) =>
                      idx === 0
                        ? setCount1(+e.target.value)
                        : setCount2(+e.target.value)
                    }
                  />
                  <button
                    className="add-button"
                    onClick={() => handleAddBlock(idx)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <label>{count}</label>
              )}
            </div>
          </div>
          {idx === 0 && (
            <div className="between-stacks">
              {playAni && (
                <div className="answer-container">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="answer"
                  >
                    {answerString}
                  </motion.div>
                </div>
              )}
            </div>
          )}
        </React.Fragment>
      ))}

      {drawToggle &&
        ["top", "bottom"].map((pos) => {
          const start = dotPositions[`${pos}Dot1`];
          const end = dotPositions[`${pos}Dot2`];
          return start && end ? (
            <Line key={pos} start={start} end={end} />
          ) : null;
        })}
      {lines.map((line, idx) => (
        <Line key={idx} start={line.start} end={line.end} />
      ))}
      {currentLine && <Line start={currentLine.start} end={currentLine.end} />}
    </div>
  );
};

export default Visuals;
