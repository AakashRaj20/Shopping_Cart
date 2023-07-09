import { useEffect, useContext } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import {ProductContext} from "@/context/StateContext";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";


export default function Home({ productList }) {
  const { setApiData } = useContext(ProductContext);
  
  useEffect(() => {
    setApiData(productList);
  }, []);

  return (
    <Grid container rowSpacing={10}>
      <Grid item xs={12} sm={12}>
        <Navbar />
      </Grid>
      <Grid item xs={12} sm={12} sx={{ padding: { xs: "0 20px", } }}>
        <ProductCard />
      </Grid>
    </Grid>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts

  const options = {
    method: "GET",
    url: "https://real-time-product-search.p.rapidapi.com/search",
    params: {
      q: "Nike shoes",
      country: "us",
      language: "en",
    },
    headers: {
      "X-RapidAPI-Key": "03ea7d33d0msh2ddcb3b26528cb1p1ea52ajsnf815c18ed655",
      "X-RapidAPI-Host": "real-time-product-search.p.rapidapi.com",
    },
  };

  const response = await axios.request(options);

  return {
    props: {
      productList: response.data,
    },
  };
}
