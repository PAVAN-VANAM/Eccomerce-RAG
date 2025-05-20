import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({
  url: process.env.Qdrant_URL || "http://localhost:6333",
  apiKey: process.env.Qdrant_API_KEY || undefined,
  checkCompatibility: false, 
});

export default client;
