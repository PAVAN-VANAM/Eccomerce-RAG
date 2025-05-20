import axios from 'axios';


export async function embedText(text) {
  try {
    // Try Ollama first
    const res = await axios.post('http://localhost:11434/api/embeddings', {
      model: 'granite-embedding:latest',
      prompt: text,
    });
    return res.data.embedding;
  } catch (error) {
    console.error("Error with Ollama embeddings,");
  
  }
}