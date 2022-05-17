import axios from "axios";

const GET_EPISODE = "https://rickandmortyapi.com/api/episode/";

export const getEpisodes = async (episode: number[]) => {
  return axios
    .get(GET_EPISODE + episode.join(","))
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
