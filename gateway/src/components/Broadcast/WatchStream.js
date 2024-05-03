import React, { useState } from "react";
import { useStore } from "./state";

const WatchStream = () => {
  const { setStreamKey } = useStore();

  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStreamKey(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter stream key to watch"
      />
      <p>Current Input: {inputValue}</p>
      <button type="submit">Watch stream</button>
    </form>
  );
};

export default WatchStream;
