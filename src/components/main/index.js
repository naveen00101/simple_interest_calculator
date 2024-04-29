import React, { Component } from "react";
import Calculator from "../calc";
import "./index.css";

export default class Main extends Component {
  state = {
    result: 0,
  };

  getResult = (result) => {
    this.setState({ result: result });
  };
  render() {
    return (
      <div className="bg-container">
        <h1>Simple Interest Calculator</h1>

        <div className="main-container">
          <div className="calculator">
            <Calculator getResult={this.getResult} />
          </div>
          <div className="result">
            <p>Result :</p>
            <h3>{this.state.result}</h3>
          </div>
        </div>
      </div>
    );
  }
}
