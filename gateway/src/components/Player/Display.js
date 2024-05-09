import React, { forwardRef, useEffect, useState, useCallback } from "react";
import * as Player from "@livepeer/react/player";
import {
  MuteIcon,
  PauseIcon,
  LoadingIcon,
  PlayIcon,
  UnmuteIcon,
} from "@livepeer/react/assets";
import { LivepeerPhase, getSrc } from "@livepeer/react/external";

import { createLivepeerInstance } from "./LivepeerInstance";
import { useStore } from "./state";
import Settings from "./Settings";

const Display = (props) => {
  // there's a `props.playbackId` here
  const { src, setSrc, playbackId, setError } = useStore();

  const livepeer = createLivepeerInstance();

  const currentPlaybackId = props.playbackId || playbackId;

  const getPlaybackSource = async () => {
    console.log("-- -- -- in getPlaybackSource");
    if (!livepeer) throw new Error("Livepeer instance not found");

    try {
      console.log("-- -- -- calling livepeer.playback.get");
      console.log("-- -- -- with playbackId: ", currentPlaybackId);
      const playbackInfo = await livepeer.playback.get(currentPlaybackId);
      console.log("-- -- -- after livepeer");
      const src = getSrc(playbackInfo.playbackInfo);
      console.log("-- -- -- src: ", src);

      return src;
    } catch (error) {
      console.log("-- -- -- error:");
      console.log(error.message);
      setError(error.message);
    }
  };

  const fetchSrc = async () => {
    try {
      console.log("-- calling getPlaybackSource");
      const fetchedSrc = await getPlaybackSource();

      setSrc(fetchedSrc);
    } catch (error) {
      console.log("-- -- error in fetchSrc");
      setError(error.message);
    }
  };

  useEffect(() => {
    const asyncGetSrc = async () => {
      if (!livepeer || !currentPlaybackId) {
        console.log("-- something is missing");
        console.log(livepeer);
        console.log(currentPlaybackId);
        return;
      }

      console.log("-- calling fetchSrc");
      await fetchSrc();
    };

    asyncGetSrc();
  }, [livepeer, currentPlaybackId]);

  if (!src) {
    return <p>Loading</p>;
  }

  if (!playbackId && !props.playbackId) {
    <button type="button" onClick={fetchSrc}>
      get src
    </button>;
  }

  return (
    <Player.Root src={src} style={{ color: "white" }}>
      <Player.Container>
        <Player.Video
          style={{ height: "100%", marginLeft: "auto", marginRight: "auto" }}
          title="Live stream"
        />

        <Player.LoadingIndicator asChild>
          <Loading />
        </Player.LoadingIndicator>

        <Player.ErrorIndicator matcher="all" asChild>
          <Loading />
        </Player.ErrorIndicator>

        <Player.Controls
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6))",
            padding: "0.5rem 1rem",
            display: "flex",
            flexDirection: "column-reverse",
            gap: 5,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "between",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                gap: 10,
              }}
            >
              <Player.PlayPauseTrigger
                style={{
                  width: 25,
                  height: 25,
                  color: "white",
                }}
              >
                <Player.PlayingIndicator
                  style={{
                    color: "white",
                  }}
                  asChild
                  matcher={false}
                >
                  <PlayIcon />
                </Player.PlayingIndicator>
                <Player.PlayingIndicator
                  style={{
                    color: "white",
                  }}
                  asChild
                >
                  <PauseIcon />
                </Player.PlayingIndicator>
              </Player.PlayPauseTrigger>

              <Player.LiveIndicator
                style={{ display: "flex", alignItems: "center", gap: 5 }}
              >
                <div
                  style={{
                    backgroundColor: "#ef4444",
                    height: 8,
                    width: 8,

                    color: "white",
                    borderRadius: 9999,
                  }}
                />
                <span style={{ fontSize: 12, userSelect: "none" }}>LIVE</span>
              </Player.LiveIndicator>

              <Player.MuteTrigger
                style={{
                  width: 25,
                  height: 25,
                  color: "white",
                }}
              >
                <Player.VolumeIndicator
                  style={{
                    color: "white",
                  }}
                  asChild
                  matcher={false}
                >
                  <MuteIcon />
                </Player.VolumeIndicator>
                <Player.VolumeIndicator
                  style={{
                    color: "white",
                  }}
                  asChild
                  matcher={true}
                >
                  <UnmuteIcon />
                </Player.VolumeIndicator>
              </Player.MuteTrigger>
              <Player.Volume
                style={{
                  position: "relative",
                  display: "flex",
                  flexGrow: 1,
                  height: 25,
                  alignItems: "center",
                  maxWidth: 120,
                  touchAction: "none",
                  userSelect: "none",
                }}
              >
                <Player.Track
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    position: "relative",
                    flexGrow: 1,
                    borderRadius: 9999,
                    height: "2px",
                  }}
                >
                  <Player.Range
                    style={{
                      position: "absolute",
                      backgroundColor: "white",
                      borderRadius: 9999,
                      height: "100%",
                    }}
                  />
                </Player.Track>
                <Player.Thumb
                  style={{
                    display: "block",
                    width: 12,
                    height: 12,
                    backgroundColor: "white",
                    borderRadius: 9999,
                  }}
                />
              </Player.Volume>
            </div>
            <Settings style={{ color: "white" }} />
          </div>
          <Seek
            style={{
              position: "relative",
              height: 20,
              display: "flex",
              alignItems: "center",
              userSelect: "none",
              touchAction: "none",
            }}
          />
        </Player.Controls>
      </Player.Container>
    </Player.Root>
  );
};

const Seek = forwardRef(({ children, ...props }, forwardedRef) => (
  <Player.Seek ref={forwardedRef} {...props}>
    <Player.Track
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        position: "relative",
        flexGrow: 1,
        borderRadius: 9999,
        height: 2,
      }}
    >
      <Player.SeekBuffer
        style={{
          position: "absolute",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: 9999,
          height: "100%",
        }}
      />
      <Player.Range
        style={{
          position: "absolute",
          backgroundColor: "white",
          borderRadius: 9999,
          height: "100%",
        }}
      />
    </Player.Track>
    <Player.Thumb
      style={{
        display: "block",
        width: 12,
        height: 12,
        backgroundColor: "white",
        borderRadius: 9999,
      }}
    />
  </Player.Seek>
));

const Loading = forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <div
      {...props}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        backgroundColor: "black",
        backdropFilter: "blur(10px)",
        textAlign: "center",
      }}
      ref={forwardedRef}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <LoadingIcon
          style={{
            width: "32px",
            height: "32px",
            animation: "spin infinite 1s linear",
          }}
        />
      </div>
    </div>
  );
});

export default Display;
