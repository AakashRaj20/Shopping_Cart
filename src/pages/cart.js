import { Grid } from "@mui/material";
import CartItems from "@/components/CartItems";
import Navbar from "@/components/Navbar";
const cart = () => {
  
  return (
    <Grid container rowSpacing={15} sx={{ overflowX: "hidden" }}>
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <CartItems />
      </Grid>
    </Grid>
  );
};

export default cart;
