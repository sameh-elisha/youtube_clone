import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
export default function Search() {
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("search_query", search);
    navigate(`/results?${params.toString()}`);
    // reload the page
    window.location.reload();
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: {
          xs: 200,
          sm: 300,
          md: 400,
        },
      }}
    >
      <Paper
        component='form'
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
        onSubmit={handleSubmit}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Search'
          inputProps={{ "aria-label": "search" }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <IconButton type='button' sx={{ p: "10px" }} aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}
