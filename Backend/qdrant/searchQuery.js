import qdrant from "./qdrant_db.js";
import axios from "axios";

export async function searchSimilarProducts(query) {
  try {
    console.log("Raw Query:", query);

    // Extract category
    let category = null;
    const categoryMatch = query.match(/category\s*:\s*['"]?([^'"]+)['"]?/i);
    if (categoryMatch) {
      category = categoryMatch[1];
      query = query.replace(categoryMatch[0], "").trim();
      console.log("📁 Detected Category:", category);
    }

    // Build filter
    const filter = category
      ? {
          must: [
            {
              key: "category",
              match: {
                value: category,
              },
            },
          ],
        }
      : undefined;

    // If query is empty, just use filter without embedding
    if (!query) {
      console.log("🔎 No query to embed. Performing filter-only search...");
      const result = await qdrant.scroll("ecommerce-products", {
        limit: 5,
        with_payload: true,
        filter,
      });

      console.log("📦 Filter-only Result:", result.points);
      return result.points;
    }

    // Otherwise, embed and search by similarity
    const { data } = await axios.post("http://localhost:11434/api/embeddings", {
      model: "granite-embedding:latest",
      prompt: query,
    });

    const queryVector = data?.embedding;
    if (!queryVector || queryVector.length !== 384) {
      throw new Error("Embedding failed or incorrect vector size.");
    }

    const result = await qdrant.search("ecommerce-products", {
      vector: queryVector,
      limit: 5,
      with_payload: true,
      filter,
    });
    console.log("🔍 Search Result:", result);
    return result;
  } catch (error) {
    console.error("❌ searchSimilarProducts error:", error.message);
    throw error;
  }
}
