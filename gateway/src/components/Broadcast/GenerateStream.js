import React, { useState } from "react";
import { useStore } from "./state";
import styled from "styled-components";
const GenerateStream = () => {
  const { setStreamKey, setError, apiKey } = useStore();

  const API_KEY = apiKey || process.env.REACT_APP_LIVEPEER_STUDIO_API_KEY;

  const [record, setRecord] = useState(false);
  const [name, setName] = useState("");

  const createStream = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://livepeer.studio/api/stream", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          record,
        }),
      });

      if (!response.ok) {
        setError("Network response was not ok");
        return;
      }

      const data = await response.json();
      console.log("Stream created:", data);

      setStreamKey(data.streamKey);
    } catch (error) {
      setError(error.message);
    }
  };

  const FormContainer = styled.div`
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

  const Label = styled.label`
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: 700;
    color: #a5a5a5;
    margin-bottom: 8px;
  `;

  const CheckboxLabel = styled(Label)`
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `;

  const Input = styled.input`
    background-color: #1c1c1c;
    border: 1px solid #444;
    color: #a5a5a5;
    border-radius: 4px;
    padding: 12px;
    font-size: 14px;
    margin-top: 4px;

    &:focus {
      outline: none;
      border-color: #666;
    }
  `;

  const Checkbox = styled(Input)`
    width: auto;
    margin-top: 0;
  `;

  const Button = styled.button`
    background-color: #000;
    color: #a5a5a5;
    border: none;
    border-radius: 4px;
    padding: 12px 16px;
    font-size: 14px;
    cursor: pointer;
    width: 300px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #1c1a1a;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
    }
  `;

  return (
    <FormContainer>
      <Form onSubmit={createStream}>
        <CheckboxLabel>
          Recorded
          <Checkbox
            type="checkbox"
            checked={record}
            onChange={(event) => setRecord(event.target.checked)}
          />
        </CheckboxLabel>
        <Label>
          Stream name:
          <Input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Label>
        <Button type="submit">Start stream</Button>
      </Form>
    </FormContainer>
  );
};

export default GenerateStream;
