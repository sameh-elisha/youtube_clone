import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Stack } from "@mui/material";
import { Link, NavLink, Navigate } from "react-router-dom";
import { getVideo } from "../../utils/fetchAPIs";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import { useNavigate } from "react-router-dom";

export default function Channel({ data }) {
  const navigate = useNavigate();
  const { snippet } = data;
  if (data.id.kind === "youtube#channel") {
    return (
      <Link
        to={`/channel/${snippet.channelId}`}
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            height: 340,
            width: 340,
            cursor: "pointer",
            // make shadow with color background.paper
            boxShadow: (theme) => `1px 1px 1px 1px ${theme.palette.action.hover}`,
            borderRadius: 4,
            "&:hover": {
              boxShadow: (theme) => `1=2px 1px 1px 1px ${theme.palette.action.selected}`,
            },
            transition: "all 0.3s ease-in-out",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{
              borderRadius: "50%",
              width: "100%",
              marginBottom: "1rem",
            }}
            src={snippet.thumbnails.high.url}
            title='green iguana'
            alt=''
          />
          <Typography
            variant='body1'
            sx={{ paddingBottom: 1, lineHeight: "1.5", maxHeight: 52, overflow: "hidden", textOverflow: "ellipsis", ml: 1, mr: 1 }}
          >
            {snippet.title} ✔️
          </Typography>
        </Stack>
      </Link>
    );
  }

  return (
    <Stack
      direction={"column"}
      sx={{
        height: 440,
        width: 340,

        cursor: "pointer",
        // make shadow with color background.paper
        boxShadow: (theme) => `1px 1px 1px 1px ${theme.palette.action.hover}`,
        borderRadius: 4,
        "&:hover": {
          boxShadow: (theme) => `1px 1px 1px 1px ${theme.palette.action.selected}`,
        },
        transition: "all 0.3s ease-in-out",
      }}
      onClick={() => {
        navigate(`/video/${data.id.videoId}`, { replace: false });
        // refresh page
        window.location.reload();
      }}
    >
      <img style={{ width: 340, borderRadius: 10, height: "270px" }} src={snippet.thumbnails.high.url} title='green iguana' alt='' />
      <Stack direction={"row"} mt={1}>
        <Stack direction={"column"} ml={"0.5rem"}>
          <Typography
            variant='body1'
            sx={{ paddingBottom: 1, lineHeight: "1.5", maxHeight: 52, overflow: "hidden", textOverflow: "ellipsis", ml: 1, mr: 1 }}
          >
            {snippet.title}
          </Typography>
          <Box
            sx={{
              ml: 1,
              mr: 1,
              fontSize: "bold",
              color: "text.secondary",
              //hover
              "&:hover": {
                color: "text.primary",
              },
              transition: "all 0.3s ease-in-out",
            }}
          >
            <Box
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/channel/${snippet.channelId}`, { replace: false });
              }}
              style={{ textDecoration: "none", color: "inherit" }}
              zIndex={10000}
            >
              {snippet.channelTitle}
            </Box>
          </Box>
          <Typography variant='body1' sx={{ ml: 1, mr: 1, fontSize: "bold", color: "text.secondary" }}>
            {/* {snippet.publishedAt} */}
            {snippet.publishedAt.slice(0, 10)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
