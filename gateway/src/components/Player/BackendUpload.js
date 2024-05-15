import React, { useState, useEffect } from "react";
import { getSrc } from "@livepeer/react/external";

import { createLivepeerInstance } from "./LivepeerInstance";
import { useStore } from "./state";

const FileUploader = () => {
  const { setError, setSrc, setPlaybackId, apiKey } = useStore();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [livepeer, setLivepeer] = useState(null);

  useEffect(() => {
    if (!apiKey) return;
    setLivepeer(createLivepeerInstance(apiKey));
  }, [apiKey]);

  const getPlaybackSource = async (playbackId, retryCount = 10) => {
    if (!livepeer) throw new Error("Livepeer instance not found");

    const attemptFetch = async (attemptsRemaining) => {
      try {
        const playbackInfo = await livepeer.playback.get(playbackId);
        setPlaybackId(playbackInfo.playbackId);

        const src = getSrc(playbackInfo.playbackInfo);
        return src;
      } catch (error) {
        if (attemptsRemaining === 0) {
          setError(error.message);
          throw error;
        }
        console.log(`Retrying... attempts left: ${attemptsRemaining}`);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return attemptFetch(attemptsRemaining - 1);
      }
    };

    return attemptFetch(retryCount);
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("video", file, fileName);
    formData.append("name", "test-upload-21");

    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    try {
      let result = await fetch("http://localhost:3000/upload", requestOptions);
      result = await result.json();

      const fetchedSrc = await getPlaybackSource(result.asset.playbackId);
      console.log("-- setting src");
      setSrc(fetchedSrc);
    } catch (error) {
      console.log("-- error");
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Enter file name here..."
        value={fileName}
        onChange={handleFileNameChange}
        required
      />
      <button type="submit">Upload File</button>
    </form>
  );
};

export default FileUploader;
