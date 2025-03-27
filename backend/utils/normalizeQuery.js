// utils/normalizer.js

export const normalizeQuery = (query) => {
    // Convert the query to lowercase
    let normalizedQuery = query.toLowerCase();
  
    // Remove extra whitespace (leading/trailing and multiple spaces)
    normalizedQuery = normalizedQuery.trim().replace(/\s+/g, " ");
  
    // Remove punctuation, except for question marks and periods (optional, depending on the use case)
    normalizedQuery = normalizedQuery.replace(/[^\w\s?\.]/g, "");
  
    return normalizedQuery;
  };
  