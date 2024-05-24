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

    event.preventDefault();
    generateUploadLink();
    setAssetName(name);
  };

  const generateUploadLink = async () => {
    const livepeer = createLivepeerInstance();
    const result = await livepeer.asset.create({
      name,
    });

    // // This is for livepeer 3.1
    // setUploadUrl(result.data.url);
    // setResumableUploadUrl(result.data.tusEndpoint);
    // setPlaybackId(result.data.asset.playbackId);

    // This is for livepeer 3.0.2:
    setUploadUrl(result.object.url);
    setResumableUploadUrl(result.object.tusEndpoint);
    setPlaybackId(result.object.asset.playbackId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Assets name:</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <button type="submit">Generate link</button>
    </form>
  );
};

export default GetUploadUrl;
