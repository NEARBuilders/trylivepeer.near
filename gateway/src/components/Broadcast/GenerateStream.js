import React, { useState } from "react";
import { useStore } from "./state";

const GenerateStream = ({ url }) => {
  const { setStreamKey, playbackId, setPlaybackId, setError, apiKey } =
    useStore();

  const API_KEY = apiKey || process.env.REACT_APP_LIVEPEER_STUDIO_API_KEY;

  const [record, setRecord] = useState(false);
  const [name, setName] = useState("");

  const createStream = async (event) => {
    event.preventDefault();

    if (url) {
      const response = await fetch(`${url}/stream/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, recorded: record }),
      });

      const data = await response.json();

      setStreamKey(data.streamKey);
      setPlaybackId(data.playbackId);
    } else {
      try {
        const response = await fetch("https://livepeer.studio/api/stream", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            record,
          }),
        });

        if (!response.ok) {
          setError("Network response was not ok");
          return;
        }

        const data = await response.json();
        console.log("Stream created:", data);

        setStreamKey(data.streamKey);
        setPlaybackId(data.playbackId);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={createStream}>
        <label>
          Recorded
          <input
            type="checkbox"
            checked={record}
            onChange={(event) => setRecord(event.target.checked)}
          />
        </label>
        <label>
          Stream name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <button type="submit">Start stream</button>
      </form>
      {playbackId && (
        <>
          <div>Sharable link: {`https://lvpr.tv?v=${playbackId}`}</div>
          <div>Sharable playbackId: {playbackId}</div>
        </>
      )}
    </>
  );
};

export default GenerateStream;
