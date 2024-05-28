import React, { useState } from "react";
import { useStore } from "../Broadcast/state";
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
const IframeContainer = styled.div`
  margin-top: 16px;
`;

const WatchStream = () => {
  const { setStreamKey } = useStore();

  const [inputValue, setInputValue] = useState("");
  const [streamLink, setStreamLink] = useState("");
  const [streamName, setStreamName] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStreamLink(inputValue);
  };

  const createStream = async (event) => {
    event.preventDefault();

    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: "test name",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      let result = await fetch(
        "http://localhost:3000/stream/create",
        requestOptions
      );

      result = await result.json();

      setStreamKey(result.streamKey);
      setInputValue(result.playbackId);
    } catch (error) {
      console.log("-- error");
      console.log(error.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={createStream}>
        <Input
          type="text"
          value={streamName}
          onChange={(event) => setStreamName(event.target.value)}
          placeholder="Enter stream name"
        />
        <Button type="submit">Create Stream</Button>
      </Form>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter playbackId to watch"
        />
        <p>Current Input: {inputValue}</p>
        <Button type="submit">Watch Stream</Button>
      </Form>
      {streamLink && (
        <IframeContainer>
          {" "}
          <iframe
            src={`https://lvpr.tv?v=${streamLink}`}
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
