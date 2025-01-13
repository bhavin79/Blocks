import React from "react";

const ControlPanel = ({
  inputToggle,
  handleInputToggle,
  drawToggle,
  handleDrawToggle,
  autoDraw,
  handleAutoDrawToggle,
  handlePlayAni,
}) => (
  <div className="control-panel">
    <button onClick={handleInputToggle} className="enable">
      {inputToggle ? "Input: On" : "Input: Off"}
    </button>
    <button onClick={handleDrawToggle}>{drawToggle ? "Stop" : "Play"}</button>
    {drawToggle && (
      <button onClick={handleAutoDrawToggle}>
        {autoDraw ? "Draw Yourself: No" : "Draw Yourself: Yes"}
      </button>
    )}
    {drawToggle && <button onClick={handlePlayAni}>Compare</button>}
  </div>
);

export default ControlPanel;
