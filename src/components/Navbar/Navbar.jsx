import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, styled, IconButton, Box, Stack } from "@mui/material";
import { logo } from "../../utils/constants";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Search from "./Search";
export default function Navbar({ toggle, mode }) {
  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "80px",
    padding: "0 20px",
    // backgroundColor: theme.palette.background.paper,
  }));

  return (
    <AppBar position='sticky'>
      <StyledToolbar>
        <Typography variant='h6' component='div'>
          <Link to='/'>
            <img src={logo} alt='logo' style={{ height: 40 }} />
          </Link>
        </Typography>

        <Stack direction='row' spacing={2}>
          <Search />
          <IconButton sx={{ ml: 1 }} onClick={toggle} color='inherit'>
            {JSON.parse(localStorage.getItem("darkMode")) ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Stack>
      </StyledToolbar>
    </AppBar>
  );
}
