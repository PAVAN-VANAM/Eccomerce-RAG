// utils/queryPreprocessor.js

export const preprocessQuery = (rawQuery) => {
    const query = rawQuery.toLowerCase().trim();
  
    const filter = {};
  
    // CATEGORY extraction
    const categories = ['electronics', 'shoes', 'laptops', 'smartphones', 't-shirts']; // Expand this list
    categories.forEach((cat) => {
      if (query.includes(cat)) filter.category = cat;
    });
  
    // PRICE extraction
    const priceRegex = /\b(?:under|below|less than)\s?\$?(\d+)/i;
    const priceMatch = query.match(priceRegex);
    if (priceMatch) {
      filter.price = { $lt: parseFloat(priceMatch[1]) };
    }
  
    // STOCK filter
    if (query.includes('in stock') || query.includes('available')) {
      filter.stock = { $gt: 0 };
    }
  
    // Clean for embedding
    const cleanedQuery = query
      .replace(/under \$?\d+/i, '')
      .replace(/in stock|available/i, '')
      .replace(/[^a-zA-Z0-9\s]/g, '') // remove special chars
      .trim();
  
    return { cleanedQuery, filter };
  };
  