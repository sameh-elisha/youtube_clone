// import usestate and useEffect
import React, { useState, useEffect } from "react";
// import axios
import axios from "axios";
// import the components
import { Box, Typography, Stack, Skeleton } from "@mui/material";
import LeftSideBar from "./LeftSideBar";
import { suggestVideo } from "../../utils/fetchAPIs";
import Channel from "./Channel";

const Feed = () => {
  const [category, setCategory] = useState("New");

  const getCategory = (name) => {
    setCategory(name);
  };
  const [channels, setChannels] = useState([]);
  const fetchChannels = async (category) => {
    setChannels([]);

    if (category === "New") category = "";
    const { items } = await suggestVideo(`/search?part=snippet&maxResults=50&q=${category}}`);
    setChannels(items);
    console.log(channels);
  };

  useEffect(() => {
    fetchChannels(category);
  }, []);

  return (
    <Stack
      sx={{
        display: "flex",
        maxHeight: "calc(100vh - 80px)",
        flexDirection: {
          xs: "column",
          md: "row",
        },
      }}
    >
      <Box flex={0.8}>
        <LeftSideBar getCategory={getCategory} fetchChannels={fetchChannels} categoryName={category} />
        <Typography
          variant='h6'
          sx={{
            color: "text.secondary",
            height: "10%",
            display: {
              xs: "none",
              md: "flex",
            },
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontSize: "0.8rem",
          }}
        >
          All rights reserved by Sameh Elisha
        </Typography>
      </Box>
      <Box
        flex={6}
        sx={{
          overflowY: "scroll",
          // scroll bar
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "red",
            outline: "1px solid slategrey",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "1rem",
            margin: "1rem",
          }}
        >
          {channels ? (
            channels.map((channel, index) => <Channel key={channel.id.channelId} data={channel} />)
          ) : (
            <Skeleton variant='rectangular' width={210} height={118} />
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default Feed;
