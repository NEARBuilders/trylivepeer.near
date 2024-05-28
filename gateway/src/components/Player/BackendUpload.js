import React, { useState, useEffect } from "react";
import { getSrc } from "@livepeer/react/external";

import { createLivepeerInstance } from "./LivepeerInstance";
import { useStore } from "./state";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #2d2d2d;
  padding: 2rem;
  border-radius: 16px;
  color: #a5a5a5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #1c1c1c;
  color: #a5a5a5;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const Button = styled.button`
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  background-color: #000;
  color: #a5a5a5;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1c1a1a;
  }
`;

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
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input type="file" onChange={handleFileChange} />
        <Input
          type="text"
          placeholder="Enter file name here..."
          value={fileName}
          onChange={handleFileNameChange}
          required
        />
        <Button type="submit">Upload File</Button>
      </Form>
    </Container>
  );
};

export default FileUploader;
