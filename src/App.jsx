import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import Line from "./components/Line";
import ControlPanel from "./components/ControlPanel";
import Visuals from "./components/Visuals";
const App = () => {
  const [count1, setCount1] = useState(1);
  const [count2, setCount2] = useState(1);
  const [inputToggle, setInputToggle] = useState(true);
  const [drawToggle, setDrawToggle] = useState(false);
  const [dotPositions, setDotPositions] = useState({});
  const [autoDraw, setAutoDraw] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);
  const [lines, setLines] = useState([]);
  const [playAni, setPlayAni] = useState(false);
  const [answerString, setAnswerString] = useState("");
  const dotRefs = {
    topDot1: useRef(null),
    topDot2: useRef(null),
    bottomDot1: useRef(null),
    bottomDot2: useRef(null),
  };

  const handleInputToggle = () => setInputToggle(!inputToggle);
  const handleDrawToggle = () => setDrawToggle(!drawToggle);
  const handlePlayAni = () => {
    let temp = "";
    if (!playAni) {
      temp += count1;
      if (count1 > count2) {
        temp += " > ";
      } else if (count1 < count2) {
        temp += " < ";
      } else {
        temp += " = ";
      }
      temp += count2;
      setDotPositions({});
      setCurrentLine(null);
      setLines([]);
    }
    setAnswerString(temp);
    setPlayAni(!playAni);
  };
  useEffect(() => {
    if (drawToggle && autoDraw) {
      const newPositions = Object.entries(dotRefs).reduce((acc, [key, ref]) => {
        const rect = ref.current?.getBoundingClientRect();
        acc[key] = rect
          ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
          : null;
        return acc;
      }, {});
      setDotPositions(newPositions);
    } else {
      setDotPositions({});
      setCurrentLine(null);
      setLines([]);
      setAnswerString("");
      setPlayAni(false);
    }
  }, [drawToggle, autoDraw]);

  const handleAutoDrawToggle = () => setAutoDraw(!autoDraw);

  const handleMouseDown = (e, startDot) => {
    if (!drawToggle || autoDraw) return;

    const rect = dotRefs[startDot]?.current.getBoundingClientRect();
    if (rect) {
      setIsDrawing(true);
      setCurrentLine({
        start: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        },
        end: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
        startDot,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !currentLine) return;

    setCurrentLine((prev) => ({
      ...prev,
      end: { x: e.clientX, y: e.clientY },
    }));
  };
  const handleMouseUp = (e) => {
    if (!isDrawing || !currentLine) return;

    const { startDot } = currentLine;
    const targetDot =
      startDot === "topDot1"
        ? "topDot2"
        : startDot === "bottomDot1"
        ? "bottomDot2"
        : null;

    if (targetDot) {
      const rect = dotRefs[targetDot]?.current.getBoundingClientRect();
      if (
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        setLines((prev) => [
          ...prev,
          {
            start: {
              x:
                dotRefs[startDot].current.getBoundingClientRect().left +
                dotRefs[startDot].current.getBoundingClientRect().width / 2,
              y:
                dotRefs[startDot].current.getBoundingClientRect().top +
                dotRefs[startDot].current.getBoundingClientRect().height / 2,
            },
            end: {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            },
          },
        ]);
      }
    }
    setIsDrawing(false);
    setCurrentLine(null);
  };

  const handleAddBlock = (idx) => {
    if (idx === 0) {
      if (count1 < 10) {
        setCount1(count1 + 1);
      }
    }
    if (idx == 1) {
      setCount2(count2 + 1);
    }
  };
  const getHeight = (idx) => {
    let dafaultHieght = 55;
    let maxHieght = 88;
    let diff = Math.abs(count1 - count2);
    if (diff == 0 || diff >= 4) {
      return dafaultHieght;
    }
    let height = maxHieght - (diff - 1) * 10;
    if (idx === 0 && count1 > count2) {
      return height;
    }
    if (idx === 1 && count2 > count1) {
      return height;
    }
    return dafaultHieght;
  };
  return (
    <div className="main">
      <Visuals
        count1={count1}
        count2={count2}
        setCount1={setCount1}
        setCount2={setCount2}
        drawToggle={drawToggle}
        dotRefs={dotRefs}
        handleMouseDown={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        inputToggle={inputToggle}
        handleAddBlock={handleAddBlock}
        getHeight={getHeight}
        playAni={playAni}
        answerString={answerString}
        lines={lines}
        currentLine={currentLine}
        dotPositions={dotPositions}
      />

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

      <ControlPanel
        inputToggle={inputToggle}
        handleInputToggle={handleInputToggle}
        drawToggle={drawToggle}
        handleDrawToggle={handleDrawToggle}
        autoDraw={autoDraw}
        handleAutoDrawToggle={handleAutoDrawToggle}
        handlePlayAni={handlePlayAni}
      />
    </div>
  );
};
export default App;
