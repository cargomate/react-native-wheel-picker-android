import WheelPicker from "../wheel-picker";
import React from "react";

export const titles = array => array.map(item => item.title);

export default ({ list, ...props }) => (
  <WheelPicker
    data={titles(list)}
    isAtmospheric
    isCurved
    {...props}
    itemTextSize={100}
    itemTextColor={"white"}
    selectedItemTextColor={"white"}
    visibleItemCount={5}
  />
);
