import React, { useState, useEffect } from "react";
import { getSrc } from "@livepeer/react/external";

import { createLivepeerInstance } from "./LivepeerInstance";
import { useStore } from "./state";

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
      console.log("-- HERE");
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
    <button type="button" onClick={fetchSrc}>
      Get asset Src
    </button>
  );
};

export default GetSrc;
