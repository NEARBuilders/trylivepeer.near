import React from "react";
import { useStore } from "./state";

const WatchStream = ({ pId }) => {
  const { playbackId } = useStore();

  const currentPlaybackId = pId || playbackId;

  return (
    <div>
      {currentPlaybackId && (
        <iframe
          src={`https://lvpr.tv?v=${currentPlaybackId}`}
          frameborder="0"
          allowfullscreen
          allow="autoplay; encrypted-media; picture-in-picture"
          sandbox="allow-same-origin allow-scripts"
        ></iframe>
      )}
    </div>
  );
};

export default WatchStream;
