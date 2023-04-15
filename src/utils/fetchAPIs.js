import axios from "axios";

const BaseURL = "https://youtube-v31.p.rapidapi.com";
const headers = {
  "X-RapidAPI-Key": "2142724773msh44297931f25e309p1d5ccajsnc721db899b87",
  "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
};

const makeRequest = async (endpoint, options) => {
  const { data } = await axios.get(BaseURL + endpoint, options);
  return data;
};

export const suggestVideo = async (endpoint) => {
  const options = {
    params: {
      maxResults: "50",
    },
    headers,
  };

  return makeRequest(endpoint, options);
};

export const getVideo = async (endpoint, id) => {
  const options = {
    params: { part: "contentDetails,snippet,statistics", id },
    headers,
  };

  return makeRequest(endpoint, options);
};

export const getRelatedVideos = async (endpoint, id) => {
  const options = {
    params: { part: "snippet", relatedToVideoId: id, type: "video", maxResults: 50 },
    headers,
  };

  return makeRequest(endpoint, options);
};

export const getChannel = async (endpoint, id) => {
  const options = {
    params: { part: "snippet,statistics", id },
    headers,
  };

  return makeRequest(endpoint, options);
};

export const getChannelVideos = async (endpoint, id) => {
  const options = {
    params: { part: "snippet", channelId: id, type: "video", maxResults: 50 },
    headers,
  };

  return makeRequest(endpoint, options);
};
