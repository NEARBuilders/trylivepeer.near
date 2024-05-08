import React, { useState, useEffect } from "react";
import { getSrc } from "@livepeer/react/external";

import createLivepeerInstance from "./LivepeerInstance";
import { useStore } from "./state";

const GetSrc = () => {
  const { setSrc, setError, playbackId, apiKey } = useStore();
  const [livepeer, setLivepeer] = useState(null);

  useEffect(() => {
    if (!apiKey) return;
    setLivepeer(createLivepeerInstance(apiKey));
  }, [apiKey]);

  const getPlaybackSource = async (playbackId) => {
    if (!livepeer) throw new Error("Livepeer instance not found");

    try {
      const playbackInfo = await livepeer.playback.get(playbackId);
      const src = getSrc(playbackInfo.playbackInfo);

      return src;
    } catch (error) {
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
