import { createContext, useState } from "react";

export const ProductContext = createContext(null);

export const ProductContextProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);

  const value = {
    apiData,
    setApiData,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContext;
