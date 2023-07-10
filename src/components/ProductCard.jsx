import { useContext } from "react";
import { Rating, Grid, Typography, Button } from "@mui/material";
import ProductContext from "@/context/StateContext";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import Loader from "./Loader";

const ProductCard = () => {
  const { apiData } = useContext(ProductContext);
  const addTocart = useCartStore((state) => state.addTocart);
  const updatecart = useCartStore((state) => state.updatecart);
  const mycart = useCartStore((state) => state.cartContent);
  const addProduct = (params) => {
    const product = mycart.findIndex((item) => item.id === params.id);
    if (product !== -1) {
      mycart[product].quantity++;
      updatecart({ params, mycart });
    } else {
      addTocart(params);
    }
  };

  return (
    <>
      {mycart === undefined ? (
        <Loader />
      ) : (
        <Grid
          container
          columnSpacing={2}
          rowSpacing={5}
          sx={{ padding: { xs: "65px 0", lg: '65px 0 0 55px' } }}
        >
          {apiData?.data?.map((each, id) => {
            return (
              <Grid
                item
                key={id}
                xs={12}
                sm={4}
                lg={3}
                sx={{ margin: "20px 0" }}
              >
                <Grid
                  container
                  sx={{
                    maxWidth: "396px",
                    width: "100%",
                    borderRadius: "10px",
                    border: "1px solid rgba(102, 102, 102, 0.12)",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      width: "100%",
                      position: "relative",
                      paddingBottom: "100%",
                      width: "100%",
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <Image
                          src={each.product_photos[0]}
                          height={233}
                          width={396}
                          style={{
                            maxWidth: "396px",
                            width: "100%",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            padding: "2px",
                          }}
                          alt="Product Image"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    sx={{
                      padding: "0px 16px",
                    }}
                  >
                    <Grid item xs={12}>
                      <Typography
                        sx={{
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: { xs: "12px", sm: "16px" },
                          lineHeight: "24px",
                          color: "#1B1B1B",
                          margin: "20px 0",
                        }}
                      >
                        {each.product_title}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    sx={{
                      padding: "0px 16px",
                      margin: "0 0 15px 0",
                    }}
                  >
                    <Grid
                      item
                      xs={6}
                      sx={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "baseline",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "12px",
                          lineHeight: "18px",
                          textDecorationLine: "line-through",
                          color: "#CCCCCC",
                        }}
                      >
                        {each.typical_price_range?.[0]}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "16px",
                          lineHeight: "24px",
                          color: "#1B1B1B",
                          textAlign: "justify",
                        }}
                      >
                        {each.offer.price}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: "12px",
                          lineHeight: "18px",
                          color: "#666666",
                          textAlign: "right",
                        }}
                      >
                        <Rating
                          name="read-only"
                          value={each.product_rating}
                          readOnly
                          sx={{ fontSize: { sm: 20 } }}
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    sx={{
                      padding: "0px 16px",
                      alignItems: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        sx={{
                          background: "#00BAC6",
                          boxShadow:
                            "0px 1px 6px rgba(0, 0, 0, 0.08), 0px 1px 6px rgba(0, 0, 0, 0.08)",
                          borderRadius: "8px",
                          width: "100%",
                          margin: "0 0 20px 0",
                        }}
                        onClick={() =>
                          addProduct({
                            id: each.product_id,
                            name: each.product_title,
                            price: each.offer.price.slice(1),
                            quantity: 1,
                            image: each.product_photos[0],
                          })
                        }
                      >
                        Add to cart
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default ProductCard;
