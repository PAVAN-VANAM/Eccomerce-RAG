import { enrichQueryWithLLM } from '../llm/enrichLLM.js';
import { embedText } from '../utils/embed.js';
import axios from 'axios';
import Product from '../models/Product_model.js'; // MongoDB schema
import client from '../qdrant/qdrant_db.js';
import { json } from 'express';
import { queryOllama } from '../llm/ollama.js';
function buildQdrantFilter(keywords = [], originalFilters = {}) {
  const must = [];

  // Add tag matches from keywords
  // for (const keyword of keywords) {
  //   must.push({
  //     key: "tags", // assuming your payload has a `tags` field
  //     match: {
  //       value: keyword
  //     }
  //   });
  // }

  // ✅ Add category match
  if (originalFilters?.category) {
    must.push({
      key: "category",
      match: {
        value: originalFilters.category
      }
    });
  }

  return { must };
}

export async function handleChatQuery(req, res) {
  const { query } = req.body;
  console.log(query);
  
  try {
    // Step 1: LLM Enrichment
    const llmResponse = await enrichQueryWithLLM(query);
    function extractJSON(text) {
      const match = text.match(/\{[\s\S]*\}/); // greedy match between first `{` and last `}`
      if (!match) throw new Error("No JSON found in LLM response");
      return JSON.parse(match[0]);
    }
    
    const parsed = extractJSON(llmResponse);
    
    console.log(parsed);
    const { keywords, filters, enhanced_query } = parsed;
    
    // Step 2: Embedding for Vector Search
    const vector = await embedText(enhanced_query);  
    // Step 3: Hybrid Search
    console.log(vector);

    const mongoQuery = {};
    if (filters?.category) {
      mongoQuery.category = filters.category;
    }
    if (filters?.price?.$lt !== undefined) {
      mongoQuery.price = { ...mongoQuery.price, $lt: filters.price.$lt };
    }
    if (filters?.price?.$gt !== undefined) {
      mongoQuery.price = { ...mongoQuery.price, $gt: filters.price.$gt };
    }
    if (filters?.stock?.$gt !== undefined) {
      mongoQuery.stock = { $gt: filters.stock.$gt };
    }

    const mongoResults = await Product.find(mongoQuery).limit(3);
    console.log(mongoResults);
    
    const qdrantFilter = buildQdrantFilter(keywords, filters);
    console.log("Qdrant Filter Payload:", JSON.stringify(qdrantFilter, null, 2));

    const vectorSearchRes = await client.search("ecommerce-products", {
      vector:vector,
      limit :5,
      with_payload: true,
    });
    console.log(vectorSearchRes);
    // Get full products from Qdrant result IDs (assuming IDs are Mongo ObjectIds stored in payload)
const qdrantProductIds = vectorSearchRes
.map(item => item.payload?.id)
.filter(Boolean); // ensure non-null/undefined IDs

// Fetch products by ID from MongoDB
const qdrantMongoProducts = await Product.find({ _id: { $in: qdrantProductIds } });

// Combine with MongoDB results from filters
const contextData = [...mongoResults, ...qdrantMongoProducts];

    console.log("Contexetd Data " + contextData);
    
    // Step 4: Prepare Context String
    const contextText = contextData.map((item, i) => {
      return `Product ${i + 1}:\nName: ${item.name}\nPrice: ₹${item.price}\nStock: ${item.stock}\nDescription: ${item.description}\nTags: ${item.tags?.join(', ')}`;
    }).join('\n\n');

    console.log(contextData);
    
    // Step 5: Ask Ollama (Gemma/Mistral etc.) using context
    const prompt = `
You are a helpful ecommerce assistant.

Context:
${contextText}

User Query:
"${enhanced_query}"

`;

    const finalResponse = await queryOllama(prompt);
    return res.json({ 
      response: finalResponse,
      products: contextData.map(item => ({
        item: item
      }))
    });

  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({ error: 'Failed to process chat query' });
  }
}
