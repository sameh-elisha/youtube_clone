import { Avatar, Box, Container, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import { getChannel, getChannelVideos } from "../utils/fetchAPIs";
import Channel from "./Feed/Channel";

export default function ChannelDetail() {
  const formatNumber = (num) => {
    if (num === undefined) return "";
    return num > 1000000 ? `${(num / 1000000).toFixed(1)}M` : num > 1000 ? `${(num / 1000).toFixed(1)}K` : `${num}`;
  };
  const url = window.location.href;
  const id = url.split("/").pop();

  console.log(id);

  const [channel, setChannel] = React.useState({});
  const [videos, setVideos] = React.useState([]);

  const channelDetails = async (id) => {
    const dataChannel = await getChannel("/channels", id);
    setChannel(dataChannel);
  };

  const channelVideos = async (id) => {
    const dataChannel = await getChannelVideos("/search", id);
    setVideos(dataChannel.items);
  };

  React.useEffect(() => {
    channelDetails(id);
    channelVideos(id);
  }, []);

  return (
    <Box>
      <Box
        display='block'
        sx={{
          width: "100%",
          height: "25vh",
          position: "relative",
          backgroundImage: (theme) =>
            theme.palette.mode === "dark" ? "linear-gradient(45deg, #FE6D8B 30%, #FF8E53 90%)" : "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        }}
      >
        <Avatar
          src={channel.items?.[0]?.snippet?.thumbnails?.high?.url}
          sx={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, 70%)",
            width: 200,
            height: 200,
            border: (theme) => `2px solid ${theme.palette.background.paper}`,
          }}
        />
      </Box>
      <Box height={140}></Box>
      <Stack direction='column'>
        <Typography variant='h4' sx={{ fontWeight: 600, textAlign: "center" }}>
          {channel.items?.[0]?.snippet?.title}
        </Typography>
        <Typography variant='h6' sx={{ fontWeight: 600, textAlign: "center" }}>
          {formatNumber(channel.items?.[0]?.statistics?.subscriberCount)} subscribers
        </Typography>
        <Box
          sx={{
            marginTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            marginX: "5rem",
          }}
        >
          {videos ? (
            videos.map((data, index) => <Channel key={data.id.videoId} data={data} />)
          ) : (
            <Skeleton variant='rectangular' width={210} height={118} />
          )}
        </Box>
      </Stack>
    </Box>
  );
}
