import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import List from "@mui/material/List";
import InboxIcon from "@mui/icons-material/Inbox";
import { categories } from "../../utils/constants";
export default function LeftSideBar({ getCategory, fetchChannels, categoryName }) {
  return (
    <List
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        overflow: "auto",
        height: {
          xs: "100%",
          md: "90%",
        },
        // scroll bar
        "&::-webkit-scrollbar": {
          width: "0.1em",
        },

        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 2px rgba(0,0,0,0.00)",
          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "&::-webkit-scrollbar-thumb": {
          outline: "1px solid slategrey",
        },

        flexDirection: {
          xs: "row",
          md: "column",
        },
      }}
    >
      {categories.map((category, index) => (
        <ListItem
          disablePadding
          key={index}
          sx={{
            // if category is selected change color to red
            backgroundColor: category.name === categoryName ? "#FC1503" : "background.paper",
            borderRadius: category.name === categoryName ? "0.9rem" : "0",
          }}
        >
          <ListItemButton
            onClick={async () => {
              getCategory(category.name);

              await fetchChannels(category.name);
            }}
          >
            <ListItemIcon
              sx={{
                // if category is selected change color to red
                color: category.name === categoryName ? "white" : "red",
              }}
            >
              {category.icon}
            </ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
