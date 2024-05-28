import React from "react";
import styled from "styled-components";

import { useStore } from "../Broadcast/state";

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
const IframeContainer = styled.div`
  margin-top: 16px;
`;

const WatchStream = ({ pId }) => {
  const { playbackId } = useStore();

  const currentPlaybackId = pId || playbackId;

  return (
    <Container>
      {currentPlaybackId && (
        <IframeContainer>
          <iframe
            src={`https://lvpr.tv?v=${currentPlaybackId}`}
            frameborder="0"
            allowfullscreen
            allow="autoplay; encrypted-media; picture-in-picture"
            sandbox="allow-same-origin allow-scripts"
          ></iframe>
        </IframeContainer>
      )}
    </Container>
  );
};

export default WatchStream;
