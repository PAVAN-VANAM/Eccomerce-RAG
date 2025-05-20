// utils/queryClassifier.js

const classifyQuery = (query) => {
    const q = query.toLowerCase();
  
    if (q.includes('recommend') || q.includes('suggest')) return 'recommendation';
  
    if (q.match(/under \$?\d+/)) return 'price_filter';
  
    if (q.includes('in stock') || q.includes('available')) return 'stock_check';
  
    // default to product lookup if unsure
    return 'product_lookup';
  };
  
  module.exports = { classifyQuery };
  