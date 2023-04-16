import { useState } from "react";
import "../src/App.css";

function CustomButton({ dataSet, data, index, mood, setMood }) {
  const divStyle = {
    backgorundColor: "#dee2e6",
    borderBottom: "5px solid #adb5bd",
    color: "black",
  };

  return (
    <button
      className="tab"
      style={{
        borderRadius:
          index === 0
            ? "4px 0 0 4px"
            : index === dataSet.length - 1
            ? "0 4px 4px 0"
            : "",
        ...(mood.includes(data) ? divStyle : {}),
      }}
      onClick={() => {setMood(mood + "," + data);   console.log(mood);}}
    >
      {data}
    </button>
  );
}

export default CustomButton;
