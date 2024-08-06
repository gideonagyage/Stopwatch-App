import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Stopwatch() {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const [isRunning, setIsRunning] = useState(false);

  // Start the timer interval
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          let milliseconds = prevTime.milliseconds + 10;
          if (milliseconds >= 1000) {
            milliseconds = 0;
            prevTime.seconds += 0.5;
          }
          if (prevTime.seconds >= 60) {
            prevTime.seconds = 0;
            prevTime.minutes += 1;
          }
          if (prevTime.minutes >= 60) {
            prevTime.minutes = 0;
            prevTime.hours += 1;
          }
          return {
            ...prevTime,
            milliseconds,
          };
        });
      }, 10);
    }
    // Clear the interval when isRunning is false
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    setIsRunning(false);
  };

  const hour = time.hours.toString().padStart(2, "0");
  const minute = time.minutes.toString().padStart(2, "0");
  const second = time.seconds.toString().padStart(2, "0");
  const millisecond = time.milliseconds.toString().padStart(2, "0");

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow p-3 rounded-5 text-center">
          <span className="display-3 m-2">⏱️</span>
          <h2 className="mb-4 txt-color fw-bold">Stopwatch</h2>

          <div className="d-flex justify-content-center">
            <span className="d-flex justify-content-center align-items-center h3">
              <div className="mt-2 h3 box-bg">{hour}</div>:
              <div className="mt-2 h3 box-bg">{minute}</div>:
              <div className="mt-2 h3 box-bg">{second}</div>:
              <div className="mt-2 h3 box-bg">{millisecond.slice(0, 2)}</div>
            </span>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <button className="main-btn" onClick={handleStart}>
              Start
            </button>
            <button className="main-btn mx-4" onClick={handleStop}>
              Stop
            </button>
            <button className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
