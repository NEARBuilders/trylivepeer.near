import React, { useState } from "react";
import { useStore } from "../Broadcast/state";

const WatchStream = ({ url }) => {
  const { setStreamKey } = useStore();

  const [inputValue, setInputValue] = useState("");
  const [streamLink, setStreamLink] = useState("");
  const [streamName, setStreamName] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStreamLink(inputValue);
  };

  const createStream = async (event) => {
    event.preventDefault();

    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: "test name",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      let result = await fetch(`${url}/stream/create`, requestOptions);

      result = await result.json();

      setStreamKey(result.streamKey);
      setInputValue(result.playbackId);
    } catch (error) {
      console.log("-- error");
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={createStream}>
        <input
          type="text"
          value={streamName}
          onChange={(event) => setStreamName(event.target.value)}
          placeholder="Enter stream name"
        />
        <button type="submit">create stream</button>
      </form>
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
