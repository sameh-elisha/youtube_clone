import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { getChannel, getRelatedVideos, getVideo } from "../utils/fetchAPIs";
import { Avatar, Box, Container, Paper, Skeleton, Stack, Typography } from "@mui/material";
import Channel from "./Feed/Channel";
import { Link } from "react-router-dom";

export default function VideoDetail() {
  const formatNumber = (num) => {
    return num > 1000000 ? `${(num / 1000000).toFixed(1)}M` : num > 1000 ? `${(num / 1000).toFixed(1)}K` : `${num}`;
  };

  // take url
  const url = window.location.href;
  // get id from url
  const id = url.split("/").pop();
  console.log(id);
  const [video, setVideo] = useState({});
  const [channel, setChannel] = useState({});
  const [relatedVideos, setRelatedVideos] = useState([]);

  const channelDetails = async (id) => {
    const dataChannel = await getChannel("/channels", id);
    setChannel(dataChannel);
    console.log(channel.items[0].snippet.thumbnails.default.url);
  };
  const videoDetails = async (id) => {
    const dataVideo = await getVideo("/videos", id);
    setVideo(dataVideo);
    channelDetails(dataVideo.items[0].snippet.channelId);
  };

  const relatedVideosDetails = async (id) => {
    const dataRelatedVideos = await getRelatedVideos("/search", id);
    setRelatedVideos(dataRelatedVideos.items);
    console.log(dataRelatedVideos.items);
  };

  useEffect(() => {
    videoDetails(id);
    relatedVideosDetails(id);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        margin: {
          xs: "2rem 0rem",
          lg: "2rem 6rem",
        },
        flexDirection: {
          xs: "column",

          lg: "row",
        },
      }}
    >
      <Box flex={9} marginX={2}>
        <Box
          height={{
            xs: "30vh",

            md: "60vh",
            lg: "70vh",
          }}
        >
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            width='100%'
            height='100%'
            config={{
              file: {
                attributes: {
                  crossOrigin: true,
                },
              },
            }}
          />
        </Box>

        <Box display='inline-block' width={"100%"}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: "bold",
              mt: 3,
              fontSize: {
                xs: "0.7rem",
                lg: "1.2rem",
              },
            }}
          >
            {video.items ? video.items[0].snippet.title : <Skeleton variant='text' width={210} />}
          </Typography>
          <Box display='flex' mt={1} justifyContent='space-between' alignContent={"center"} alignItems={"center"}>
            <Box display={"flex"} gap={1} alignContent='center' alignItems='center'>
              <Avatar src={channel.items ? channel.items[0].snippet.thumbnails.default.url : ""} />
              <Link to={`/channel/${channel.items ? channel.items[0].id : ""}`}>
                <Typography
                  variant='h6'
                  sx={{
                    color: "text.secondary",
                    fontSize: {
                      xs: "0.7rem",
                      lg: "1.2rem",
                    },
                  }}
                >
                  {video.items ? video.items[0].snippet.channelTitle : <Skeleton variant='text' width={210} />}
                </Typography>
              </Link>
            </Box>

            <Stack direction='row' spacing={1} mr={7}>
              <Typography
                variant='h6'
                sx={{
                  color: "text.secondary",

                  fontSize: {
                    xs: "0.7rem",
                    lg: "1.2rem",
                  },
                }}
              >
                {video.items ? formatNumber(video.items[0].statistics.viewCount) : <Skeleton variant='text' width={210} />} Views
              </Typography>

              <Typography
                variant='h6'
                sx={{
                  color: "text.secondary",
                  fontSize: {
                    xs: "0.7rem",
                    lg: "1.2rem",
                  },
                }}
              >
                {video.items ? formatNumber(video.items[0].statistics.likeCount) : <Skeleton variant='text' width={210} />} Likes
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>

      <Box
        flex={1}
        marginX={5}
        sx={{
          display: "flex",
          flexWrap: {
            xs: "wrap",
            lg: "nowrap",
          },
          flexDirection: {
            xs: "row",
            lg: "column",
          },
          gap: 2,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {relatedVideos ? (
          relatedVideos.map((data, index) => <Channel key={data.id.videoId} data={data} />)
        ) : (
          <Skeleton variant='rectangular' width={100} height={100} />
        )}
      </Box>
    </Box>
  );
}
