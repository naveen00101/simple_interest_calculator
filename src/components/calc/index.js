import React, { useState } from "react";
import "./index.css";

export default function Calculator({ getResult }) {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [timeUnit, setTimeUnit] = useState("years"); // Default time unit is years
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "timeUnit") {
      setTimeUnit(value);
    } else {
      switch (name) {
        case "principal":
          setPrincipal(value);
          break;
        case "rate":
          setRate(value);
          break;
        case "time":
          setTime(value);
          break;
        default:
          break;
      }
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (
      !principal ||
      !rate ||
      !time ||
      isNaN(principal) ||
      isNaN(rate) ||
      isNaN(time) ||
      parseFloat(principal) === 0 ||
      parseFloat(rate) === 0 ||
      parseFloat(time) === 0
    ) {
      let errorMessage = "";
      if (!principal || parseFloat(principal) === 0) {
        errorMessage +=
          "Principal amount is 0. Please provide a valid value.\n";
      }
      if (!rate || parseFloat(rate) === 0) {
        errorMessage += "Rate is 0. Please provide a valid value.\n";
      }
      if (!time || parseFloat(time) === 0) {
        errorMessage += "Time is 0. Please provide a valid value.\n";
      }
      errorMessage = errorMessage.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
      setError(errorMessage);
    } else {
      let timeInYears = parseFloat(time);
      if (timeUnit === "months") {
        timeInYears = parseFloat(time) / 12;
      } else if (timeUnit === "days") {
        timeInYears = parseFloat(time) / 365;
      }
      const simpleInterest =
        (parseFloat(principal) * parseFloat(rate) * timeInYears) / 100;
      getResult(simpleInterest);
      setError(""); // Clear error message if calculation is successful
    }
  };

  return (
    <form onSubmit={handleClick}>
      <label htmlFor="principal">Principal</label>
      <input
        type="number"
        id="principal"
        name="principal"
        value={principal}
        onChange={handleChange}
      />
      <label htmlFor="rate">Rate</label>
      <input
        type="number"
        id="rate"
        name="rate"
        value={rate}
        onChange={handleChange}
      />
      <label htmlFor="time">Time</label>
      <input
        type="number"
        id="time"
        name="time"
        value={time}
        onChange={handleChange}
      />
      <select name="timeUnit" value={timeUnit} onChange={handleChange}>
        <option value="years">Years</option>
        <option value="months">Months</option>
        <option value="days">Days</option>
      </select>
      {error && <p className="error">{error}</p>}{" "}
      {/* Display error message only if error exists */}
      <button type="submit">Calculate</button>
    </form>
  );
}
