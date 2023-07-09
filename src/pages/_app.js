import React from 'react';
import { ProductContextProvider } from '@/context/StateContext';

function MyApp({ Component, pageProps }) {
  return (
    <ProductContextProvider>
      <Component {...pageProps} />
    </ProductContextProvider>
  );
}

export default MyApp;
