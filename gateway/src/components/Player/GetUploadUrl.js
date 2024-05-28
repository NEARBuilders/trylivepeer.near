import React, { useState, useEffect } from "react";

import { createLivepeerInstance } from "./LivepeerInstance";
import { useStore } from "./state";
import styled from "styled-components";

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #a5a5a5;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: #2c2c2c;
  color: #a5a5a5;
`;

const UploadLabel = styled.label`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const UploadInput = styled.input`
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

const UploadButton = styled.button`
  padding: 12px 24px;
  margin-top: 10px;
  border-radius: 4px;
  background-color: #000;
  border: 1px solid #23242b;
  color: #a5a5a5;
  font-size: 14px;
  cursor: pointer;
  width: 300px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1c1a1a;
  }

  &:disabled {
    background-color: #444;
    cursor: not-allowed;
  }
`;

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
    <UploadContainer>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <UploadLabel>
            Assets name:
            <UploadInput
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <UploadButton type="submit">Generate link</UploadButton>
          </UploadLabel>
        </FormContainer>
      </form>
    </UploadContainer>
  );
};

export default GetUploadUrl;
