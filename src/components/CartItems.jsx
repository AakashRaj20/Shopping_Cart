import { useState, useEffect, useContext } from "react";
import { useCartStore } from "../store/cartStore";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add, Remove } from "@mui/icons-material";
import Image from "next/image";
import Loader from "./Loader";

const CartItems = () => {
  const cartItem = useCartStore((state) => state.cartContent);
  const total = useCartStore((state) => state.total);
  const totalqty = useCartStore((state) => state.totalqty);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const [mycart, setCart] = useState([]);
  const [mytotal, setTotal] = useState();
  const [qty, setQty] = useState(0);
  useEffect(() => {
    setCart(cartItem);
    setTotal(total);
  }, [cartItem, total]);
  const handleAddItem = ({ id, price }) => {
    mycart.map((item) => {
      if (item.id === id) {
        item.quantity++;
        setQty(item.quantity);
        updateItem({ id, price });
      }
    });
  };

  const handleRemoveItem = ({ id, price }) => {
    mycart.map((item) => {
      if (item.id === id) {
        item.quantity--;
        setQty(item.quantity);
        removeItem({ id, price });
      }
    });
  };

  return (
    <>
      {mycart === undefined ? (
        <Loader />
      ) : (
        <Grid
          container
          sx={{ display: "flex", justifyContent: "center", margin: "20px" }}
        >
          <Grid item xs={12}>
            {mycart &&
              mycart.map((item, id) => {
                return (
                  <Grid
                    container
                    key={id}
                    sx={{
                      margin: "20px 0",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Grid
                      item
                      sm={3}
                      xs={12}
                      sx={{
                        justifyContent: "center",
                        display: "flex",
                        margin: { xs: "30px 0" },
                      }}
                    >
                      <Image
                        src={item.image}
                        width={100}
                        height={100}
                        alt="product image"
                      />
                    </Grid>
                    <Grid
                      item
                      sm={2}
                      xs={12}
                      sx={{ textAlign: "center", margin: { xs: "30px 0" } }}
                    >
                      {item.name}
                    </Grid>
                    <Grid
                      item
                      sm={2}
                      xs={3}
                      sx={{ justifyContent: "center", display: "flex" }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </Grid>
                    <Grid
                      item
                      sm={3}
                      xs={6}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => {
                          handleAddItem({ id: item.id, price: item.price });
                        }}
                      >
                        <Add color="primary" />
                      </IconButton>
                      <TextField
                        type="text"
                        value={item.quantity}
                        variant="outlined"
                        size="small"
                        sx={{ width: "50px", textAlign: "center" }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => {
                          item.quantity > 1
                            ? handleRemoveItem({
                                id: item.id,
                                price: item.price,
                              })
                            : removeFromCart({
                                id: item.id,
                                price: item.price,
                                quantity: item.quantity,
                              });
                        }}
                      >
                        <Remove color="primary" />
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      sm={2}
                      xs={3}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <DeleteIcon
                        onClick={() =>
                          removeFromCart({
                            id: item.id,
                            price: item.price,
                            quantity: item.quantity,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              width: "100%",
              padding: "20px",
              display: "flex",
              justifyContent: "center",
              gap: "0 100px",
              margin: "20px 190px",
            }}
          >
            <Typography sx={{ fontWeight: "700", fontSize: "25px" }}>
              Total:
            </Typography>
            <Typography sx={{ fontWeight: "700", fontSize: "25px" }}>
              ${mytotal && mytotal.toFixed(2)}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", gap: "80px", justifyContent: "center" }}
          >
            <Button variant="contained">Buy Now</Button>
            <Button onClick={() => clearCart()} variant="outlined">
              Clear Cart
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CartItems;

