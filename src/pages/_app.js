import React from "react";
import { ProductContextProvider } from "@/context/StateContext";
import Navbar from "@/components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <ProductContextProvider>
      <Navbar />
        <Component {...pageProps} />
    </ProductContextProvider>
  );
}

export default MyApp;
