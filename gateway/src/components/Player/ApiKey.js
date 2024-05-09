import React, { useState } from "react";

import { useStore } from "./state";
import { createLivepeerInstance } from "./LivepeerInstance";

const ApiKey = () => {
  const { setApiKey } = useStore();

  const [apiKeyValue, setApiKeyValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setApiKey(apiKeyValue);
    createLivepeerInstance(apiKeyValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Api key:
        <input
          type="text"
          value={apiKeyValue}
          onChange={(event) => setApiKeyValue(event.target.value)}
        />
      </label>
      <button type="submit">Set api key</button>
    </form>
  );
};

export default ApiKey;
