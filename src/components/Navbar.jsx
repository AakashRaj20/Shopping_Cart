import { useState, useEffect, useContext, createContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { ShoppingCart } from "@mui/icons-material";
import { useCartStore } from "../store/cartStore";
import { CssBaseline } from "@mui/material";
import Link from "next/link";

const drawerWidth = 240;

const Navbar = (props) => {

  const totalqty = useCartStore((state) => state.totalqty);
  const [cartitems, setCartItems] = useState();

  useEffect(() => {
    setCartItems(totalqty);
  }, [totalqty]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link href="/" style={{ textDecoration: "none" }}>
        <Typography
          variant="h6"
          sx={{ my: 2, color: "black", fontWeight: "700" }}
        >
          Product List
        </Typography>
      </Link>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link href="/cart" style={{ textDecoration: "none" }}>
            <ListItemButton
              sx={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontWeight: "500", fontSize: "20px", color: "black" }}
              >
                Cart
              </Typography>
              <Badge badgeContent={cartitems} color="primary">
                <Link href="/cart">
                  <ShoppingCart />
                </Link>
              </Badge>
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex" },
                color: "white",
                fontWeight: "700",
              }}
            >
              Product List
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              margin: { md: "0 50px 0 0", sm: "0 25px 0 0" },
            }}
          >
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={cartitems} color="success">
                <Link href="/cart">
                  <ShoppingCart />
                </Link>
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
