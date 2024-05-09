import React, { useState, useEffect } from "react";

import { createLivepeerInstance } from "./LivepeerInstance";
import { useStore } from "./state";

const GetUploadUrl = ({ url }) => {
  const {
    setAssetName,
    setPlaybackId,
    setResumableUploadUrl,
    setUploadUrl,
    setSrc,
  } = useStore();

  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    if (url) {
      // if url it means I want to communicate with the back-end
      try {
        const src = await fetch(url);

        if (!src) {
          console.log("-- error receiving data");
          return;
        }

        src = src.json();

        setSrc(src);
        return;
      } catch (error) {
        console.log("Error:");
        console.log(error.message);
        return;
      }
    }

    console.log("-- here no url");
    event.preventDefault();
    generateUploadLink();
    setAssetName(name);
  };

  const generateUploadLink = async () => {
    const livepeer = createLivepeerInstance();
    const result = await livepeer.asset.create({
      name,
    });

    console.log("-- here");
    console.log(result);

    setUploadUrl(result.data.url);
    setResumableUploadUrl(result.data.tusEndpoint);
    setPlaybackId(result.data.asset.playbackId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Asset name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <button type="submit">Generate link</button>
    </form>
  );
};

export default GetUploadUrl;
