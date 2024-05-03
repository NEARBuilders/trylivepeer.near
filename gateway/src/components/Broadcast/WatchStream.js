import React, { useState } from "react";

const WatchStream = () => {
  const [inputValue, setInputValue] = useState("");
  const [streamLink, setStreamLink] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStreamLink(inputValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter playbackId to watch"
        />
        <p>Current Input: {inputValue}</p>
        <button type="submit">Watch stream</button>
      </form>
      {streamLink && (
        <iframe
          src={`https://lvpr.tv?v=${streamLink}`}
          frameborder="0"
          allowfullscreen
          allow="autoplay; encrypted-media; picture-in-picture"
          sandbox="allow-same-origin allow-scripts"
        ></iframe>
      )}
    </div>
  );
};

export default WatchStream;
