import { useState, useEffect, useContext } from "react";
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
import { useRouter } from "next/router";

const drawerWidth = 240;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = (props) => {
  const totalqty = useCartStore((state) => state.totalqty);
  const [cartitems, setCartItems] = useState();
  const [search, setSearch] = useState();

  const Router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    Router.push({
      // whatever your baseUrl
      pathname: `/search/${search}`,
      query: { keyword: search },
    });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

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
                <ShoppingCart />
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={handleFormSubmit}>
              <StyledInputBase
                value={search}
                name="search"
                type="text"
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleChange}
              />
            </form>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              margin: { md: "0 50px 0 0", sm: "0 25px 0 0" },
            }}
          >
            <Link href="/cart">
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={cartitems} color="success">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Link>
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
