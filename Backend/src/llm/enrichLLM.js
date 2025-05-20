
import { queryOllama } from './ollama.js';

export async function enrichQueryWithLLM(userQuery) {
  const systemPrompt = `
Given a user's product-related query, do the following:
1. Extract key **tags/keywords** (comma separated)
2. Detect **user intent**: one of [product_lookup, recommendation, price_filter, stock_check]
3. Extract any **filters** (e.g., price, stock)
4. Rewrite the query to improve semantic search

Respond ONLY as pure JSON in the following format:
{
  "keywords": [...],
  "intent": "...",
  "filters": {
    "category" : "category that match"
    "price": { "$lt": 2000 },
    "stock": { "$gt": 0 }
  },
  "enhanced_query": "..."
}
`;

  const fullPrompt = `${systemPrompt}\n\nUser Query: "${userQuery}"`;

  console.log("encrichLLM"+fullPrompt);
  
const result = await queryOllama(fullPrompt);
  
  return result;
}
