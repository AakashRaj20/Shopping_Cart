import axios from "axios";

 export const getProducts = async (searchParam, retryCount=0) => {
   const options = {
     method: "GET",
     url: "https://real-time-product-search.p.rapidapi.com/search",
     params: {
       q: searchParam,
       country: "us",
       language: "en",
     },
     headers: {
       "X-RapidAPI-Key": "03ea7d33d0msh2ddcb3b26528cb1p1ea52ajsnf815c18ed655",
       "X-RapidAPI-Host": "real-time-product-search.p.rapidapi.com",
     },
   };

const delay = retryCount > 0 ? 4 ** retryCount * 1000 : 0; // Delay in milliseconds

if (delay > 0) {
  // Wait for the specified delay duration
  await new Promise((resolve) => setTimeout(resolve, delay));
}

try {
  const response = await axios.request(options);
  return response.data;
} catch (error) {
  if (error.response && error.response.status === 429) {
    // Handle rate limiting or error case here
    const retryAfter = error.response.headers["retry-after"];
           const delay = retryCount > 0 ? 2 ** retryCount * 1000 : 1000; // Exponential backoff delay

           // Retry the request after the delay
           await new Promise((resolve) => setTimeout(resolve, delay));
           return getProducts(searchParam, retryCount + 1); // Retry the request with an incremented retryCount
  }

  throw error;
}
 };