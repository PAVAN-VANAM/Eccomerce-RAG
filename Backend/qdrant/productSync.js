import axios from "axios";
import client from "./qdrant_db.js";
import Product from "../models/Product_model.js";
import { randomUUID } from "crypto";

// Constants
const OLLAMA_EMBEDDING_URL = "http://localhost:11434/api/embeddings";
const OLLAMA_MODEL = "granite-embedding:latest";
const COLLECTION_NAME = "ecommerce-products";

export async function syncProductsToQdrant() {
  try {
    const products = await Product.find({ isEmbedded: false });
    console.log(`Found ${products.length} products to embed.`);

    for (const product of products) {
      const text = `${product.name} - ${product.description}`;
      console.log(`Text: ${text}`);

      try {
        // Request embedding from Ollama
        const { data } = await axios.post(OLLAMA_EMBEDDING_URL, {
          model: OLLAMA_MODEL,
          prompt: text,
        });

        const vector = data.embedding;
        console.log(product._id.toString());

        // Check if the point already exists using scrollPoints
        
          // Upsert into Qdrant
          const result = await client.upsert(COLLECTION_NAME, {
            points: [
              {
                id: randomUUID(),
                vector,
                payload: {
                  name: product.name,
                  price: product.price,
                  category: product.category,
                  id: product._id.toString(),
                },
              },
            ],
          });
          console.log(`Result: ${JSON.stringify(result)}`);

          // Mark as embedded
          const updatedProduct = await Product.findByIdAndUpdate(product._id, { isEmbedded: true });
          console.log(`Updated product: ${JSON.stringify(updatedProduct)}`);
        

      } catch (err) {
        console.error(`❌ Failed to embed product ${product._id}:`, err);
      }
    }
  } catch (err) {
    console.error("❌ Sync failed:", err.message);
  }
}

