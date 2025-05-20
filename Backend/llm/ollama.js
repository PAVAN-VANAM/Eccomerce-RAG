import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";


export const queryOllama = async (prompt, model = "qwen2.5:1.5b") => {
  try {
    console.log("Attempting Ollama first...");
    const response = await axios.post("http://localhost:11434/api/generate", {
      model,
      prompt,
      stream: false,
    });

    return response.data.response.trim();
  } catch (error) {
    console.error("Error querying Ollama:", error);
  }
};

