import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed } from "./components";
import { useState } from "react";

const App = () => {
  const theme = createTheme({
    palette: {
      // check if dark mode is enabled in local storage
      mode: JSON.parse(localStorage.getItem("darkMode")) ? "dark" : "light",
    },
  });

  const toggleMode = () => {
    // check if dark mode is enabled in local storage
    const darkMode = JSON.parse(localStorage.getItem("darkMode"));
    // toggle dark mode
    localStorage.setItem("darkMode", !darkMode);
    // refresh page
    window.location.reload();
  };

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box>
          <Navbar toggle={toggleMode} />
          <Routes>
            <Route exact path='/' element={<Feed />} />
            <Route path='/video/:id' element={<VideoDetail />} />
            <Route path='/channel/:id' element={<ChannelDetail />} />
            <Route path='/results' element={<SearchFeed />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
