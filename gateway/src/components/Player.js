import React from "react";

export const Player = (props) => {
  // import Livepeer
  // implement agnostic component
  // props come from widget
  return (
    <textarea
      value={JSON.stringify(props, undefined, 2)}
      style={props.style ?? { width: "100%", height: "100%" }}
    />
  );
};
