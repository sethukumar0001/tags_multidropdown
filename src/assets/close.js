import React from "react";
import { getValue } from "../lodash";

function CloseSvgComponent(props) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={getValue(props,`size`,'')?getValue(props,`size`,''):'48'}
        viewBox="0 -960 960 960"
        width={getValue(props,`size`,'')?getValue(props,`size`,''):'48'}
      >
        <path
          d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"
          fill={getValue(props,`size`,'')?getValue(props,`size`,''):'#dadce0'}
        />
      </svg>
    </div>
  );
}

export default CloseSvgComponent;
