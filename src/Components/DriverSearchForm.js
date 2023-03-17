/**
 * @author Ahmed Rafsan Raqib
 * This component renders a form element with four input fields. The contents, labels and placeholders
 * for each of the input fields is all determined by props. This promotes reusability of this component.
 */

import React from "react";
export default function DriverSearchByLocation(props) {
  return (
    <div className="auth-form-div">
      <form onSubmit={props.onButtonClick} className="driver-form">
        <label>{props.label1}</label>
        <input
          onChange={(e) => props.label1OnChange(e.target.value)}
          placeholder={props.label1Placeholder}
        ></input>

        <label>{props.label2}</label>
        <input
          onChange={(e) => props.label2OnChange(e.target.value)}
          placeholder={props.label2Placeholder}
        ></input>

        <label>{props.label3}</label>
        <input
          onChange={(e) => props.label3OnChange(e.target.value)}
          placeholder={props.label3Placeholder}
        ></input>

        <label>{props.label4}</label>
        <input
          onChange={(e) => props.label4OnChange(e.target.value)}
          placeholder={props.label4Placeholder}
        ></input>

        <button className="driver-button" type="submit">
          {props.buttonLabel}
        </button>
      </form>
    </div>
  );
}
