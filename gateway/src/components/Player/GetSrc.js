import React, { useState, useEffect } from "react";
import { getSrc } from "@livepeer/react/external";

import { createLivepeerInstance } from "./LivepeerInstance";
import { useStore } from "./state";
import styled from "styled-components";
const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #a5a5a5;
  padding: 16px;
  border: 1px solid #23242b;
  border-radius: 8px;
  background-color: #2c2c2c;
`;

const GetSrc = () => {
  const { setSrc, setError, playbackId } = useStore();

  const getPlaybackSource = async (playbackId) => {
    const livepeer = createLivepeerInstance();

    try {
      console.log("-- livepeer.playback");
      // TODO: use livepeer (js) 3.1
      const playbackInfo = await livepeer.playback.get(playbackId);
      // const srcInfo = await livepeer.asset.get(playbackId);

      console.log("playbackInfo:");
      console.log(playbackInfo);
      // console.log(srcInfo);
      const src = getSrc(playbackInfo.playbackInfo);

      return src;
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const fetchSrc = async () => {
    setError("");

    try {
      const fetchedSrc = await getPlaybackSource(playbackId);
      setSrc(fetchedSrc);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <UploadContainer>
      <button type="button" onClick={fetchSrc}>
        Get asset Src
      </button>
    </UploadContainer>
  );
};

export default GetSrc;
