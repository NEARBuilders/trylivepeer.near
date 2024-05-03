import React, { useState, useEffect } from "react";

import createLivepeerInstance from "./LivepeerInstance";
import { useStore } from "./state";

const GetUploadUrl = ({ url }) => {
  const {
    setAssetName,
    setPlaybackId,
    setResumableUploadUrl,
    setUploadUrl,
    setSrc,
    apiKey,
  } = useStore();

  const [livepeer, setLivepeer] = useState(null);

  useEffect(() => {
    if (!apiKey) return;
    setLivepeer(createLivepeerInstance(apiKey));
  }, [apiKey]);

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
    const result = await livepeer.asset.create({
      name,
    });

    setUploadUrl(result.object.url);
    setResumableUploadUrl(result.object.tusEndpoint);
    setPlaybackId(result.object.asset.playbackId);
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
