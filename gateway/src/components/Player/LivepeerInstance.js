import { Livepeer } from "livepeer";

const API_KEY = process.env.REACT_APP_LIVEPEER_STUDIO_API_KEY;

// This variable will hold the instance
let livepeerInstance = null;

function createLivepeerInstance(apiKey = API_KEY) {
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

export default createLivepeerInstance;
