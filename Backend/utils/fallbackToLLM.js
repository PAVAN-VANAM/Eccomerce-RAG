// 📁 utils/fallbackToLLM.js
import axios from 'axios';

const fallbackToLLM = async (query) => {
  const response = await axios.post('http://localhost:11434/api/generate', {
    model: 'gemma:latest',
    prompt: `Search the ecommerce catalog and try to answer this user query as best as you can: "${query}"`,
  });

  return response.data.response;
};

export default fallbackToLLM;
