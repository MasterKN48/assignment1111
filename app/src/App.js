import React, { useState } from "react";
import Clock from "./component/Clock";
import CountdownTimer from "./component/CountdownTimer";
import timezone from "./timezone.json";

const App = () => {
  const [clocks, setClocks] = useState([]);
  const [selectedClock, setSelectedClock] = useState("Asia/Kabul");

  const handleChange = (e) => {
    setSelectedClock(e.target.value);
  };

  const addTimeZone = () => {
    if (clocks.findIndex((c) => c.Timezone === selectedClock) < 0) {
      let zone = timezone.find((k) => k.Timezone === selectedClock);
      setClocks((prevClocks) => [...prevClocks, zone]);
    }
  };

  const removeClick = (zone) => {
    let updateClocks = [...clocks];
    let index = updateClocks.findIndex((t) => t.Timezone === zone);
    updateClocks.splice(index, 1);
    setClocks(updateClocks);
  };

  let optionItems = timezone.map((zone) => (
    <option value={zone.Timezone} key={zone.Timezone}>
      {zone.Country}-{zone.Timezone}
    </option>
  ));

  let clockComponents = clocks.map((zone) => (
    <Clock
      {...zone}
      key={zone.Timezone}
      removeClick={() => removeClick(zone.Timezone)}
    />
  ));

  return (
    <div className="container">
      <div className="my-4">
        <CountdownTimer />
      </div>
      <div>
        <h2>World Clock</h2>
        <p>
          <select
            className="form-select"
            value={selectedClock}
            onChange={handleChange}
          >
            {optionItems}
          </select>
        </p>
        <p>
          <button onClick={addTimeZone} className="btn btn-primary">
            ADD CLOCK
          </button>
        </p>
      </div>
      {clockComponents}
    </div>
  );
};

export default App;
