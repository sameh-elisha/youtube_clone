import { Box, Container, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { suggestVideo } from "../utils/fetchAPIs";
import Channel from "./Feed/Channel";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
export default function SearchFeed() {
  // recive q from url
  const params = new URLSearchParams(window.location.search);
  const keyWord = params.get("search_query") || "";
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    const fetchChannels = async (keyWord) => {
      if (keyWord === "") return;
      const { items } = await suggestVideo(`/search?part=snippet&maxResults=50&q=${keyWord}}`);
      setChannels(items);
      console.log(channels);
    };
    fetchChannels(keyWord);
  }, []);

  if (!keyWord)
    return (
      <Box
        sx={{
          display: "flex",
          // make text center of the screen
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <ReportGmailerrorredIcon sx={{ fontSize: "10rem" }} />
        <Typography
          variant='h4'
          sx={{
            color: "text.secondary",
          }}
        >
          No results found
        </Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Container
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "2rem",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Box mt='1rem'>
          <Typography variant='h6'>
            You are searching for
            <Typography variant='h6' component={"span"} sx={{ color: "red" }}>{` ${keyWord}`}</Typography>
          </Typography>
        </Box>
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
      </Container>
    </Box>
  );
}
