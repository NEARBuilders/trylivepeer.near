import React, { useState, useEffect } from "react";
import { getSrc } from "@livepeer/react/external";

import { createLivepeerInstance } from "./LivepeerInstance";
import { useStore } from "./state";

const GetSrc = ({ url }) => {
  const { setSrc, setError, playbackId, setLoading } = useStore();

  const getPlaybackSource = async (playbackId) => {
    if (url) {
      try {
        let result = await fetch(`${url}/playback/${playbackId}`);

        result = await result.json();
        const src = getSrc(result);

        return src;
      } catch (error) {
        console.log(error);
      }
    } else {
      const livepeer = createLivepeerInstance();

      try {
        // TODO: use livepeer (js) 3.1
        const playbackInfo = await livepeer.playback.get(playbackId);
        // const srcInfo = await livepeer.asset.get(playbackId);

        const src = getSrc(playbackInfo.playbackInfo);

        return src;
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    }
  };

  const fetchSrc = async () => {
    setError("");
    setLoading(true);

    try {
      const fetchedSrc = await getPlaybackSource(playbackId);
      setSrc(fetchedSrc);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button type="button" onClick={fetchSrc}>
      Get asset Src
    </button>
  );
};

export default GetSrc;
