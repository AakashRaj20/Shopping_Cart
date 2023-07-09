import { Grid, Skeleton } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Skeleton
          variant="rectangular"
          width={1000}
          height={500}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "40px auto",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Skeleton
          variant="rectangular"
          width={1000}
          height={100}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "40px auto",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Skeleton
          variant="rounded"
          width={1000}
          height={350}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "40px auto",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Loader;
