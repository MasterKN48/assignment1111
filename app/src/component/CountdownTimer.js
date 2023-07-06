import React, { useState, useEffect } from "react";

const CountdownTimers = () => {
  const [timers, setTimers] = useState([]);
  const [startTime, setStartTime] = useState("");

  const handleAddTimer = () => {
    if (startTime > 0) {
      const newTimer = {
        id: Date.now(),
        startTime: parseInt(startTime),
        remainingTime: parseInt(startTime),
      };
      setTimers([...timers, newTimer]);
      setStartTime("");
    } else {
      window.alert("Duration should be greater than 0.");
    }
  };

  const handleTimerComplete = (timerId) => {
    setTimers(timers.filter((timer) => timer.id !== timerId));
  };

  const updateRemainingTime = () => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => ({
        ...timer,
        remainingTime: timer.remainingTime > 0 ? timer.remainingTime - 1 : 0,
      }))
    );
  };

  useEffect(() => {
    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h2 className="my-4">Countdown Timers</h2>
      <div className="mb-3">
        <label htmlFor="timer">Duration (in seconds)</label>
        <input
          type="number"
          id="timer"
          className="form-control timer"
          value={startTime}
          // placeholder="Add duration in seconds e.g. 10 for 10 seconds"
          onChange={(e) => {
            setStartTime(e.target.value);
          }}
          min={1}
        />
        <button className="btn btn-primary mt-2" onClick={handleAddTimer}>
          Add Timer
        </button>
      </div>
      <ul className="list-group">
        {timers.map((timer) => (
          <li
            key={timer.id}
            className={`list-group-item ${
              timer.remainingTime <= 0 ? "list-group-item-success" : ""
            }`}
          >
            Timer: {timer.remainingTime}s
            {timer.remainingTime <= 0 && (
              <span className="badge bg-success ms-2">Completed!</span>
            )}
            <button
              className="btn btn-danger ms-2"
              onClick={() => handleTimerComplete(timer.id)}
              disabled={timer.remainingTime > 0}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountdownTimers;
