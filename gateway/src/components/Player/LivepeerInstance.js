import { Livepeer } from "livepeer";

const API_KEY = process.env.REACT_APP_LIVEPEER_STUDIO_API_KEY;

let livepeerInstance = null;

function createLivepeerInstance(apiKey = API_KEY) {
  console.log("-- HERE");
  if (!livepeerInstance) {
    livepeerInstance = new Livepeer({
      apiKey,
    });
    console.log("Livepeer instance created");
  } else {
    console.log("Returning existing Livepeer instance");
  }
  return livepeerInstance;
}

function updateLivepeerInstance(apiKey) {
  console.log("-- updating livepeer instance");
  livepeerInstance = new Livepeer({ apiKey });
  console.log("Livepeer instance updated with new API key: ", apiKey);
  return livepeerInstance;
}

export { createLivepeerInstance, updateLivepeerInstance };
