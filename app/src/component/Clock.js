import React, { useState, useEffect } from "react";

const Clock = (props) => {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const intervalID = setInterval(() => {
      tick();
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  function getCurrentTime() {
    let today = new Date();
    today.setMinutes(
      today.getMinutes() + today.getTimezoneOffset() + parseInt(props.Offset)
    );
    return today.toLocaleString();
  }

  function tick() {
    setTime(getCurrentTime());
  }

  return (
    <div className="col-3 p-2">
      <div className="card">
        <div className="card-header bg-primary">
          <header>
            <div
              onClick={props.removeClick}
              className="btn btn-danger btn-sm float-end"
            >
              ×
            </div>
            <h5>{props.Country}</h5>
          </header>
        </div>
        <div className="card-body bg-light">
          <p>{time}</p>
        </div>
        <footer className="card-footer bg-primary">
          <h5>{props.Timezone}</h5>
        </footer>
      </div>
    </div>
  );
};

export default Clock;
