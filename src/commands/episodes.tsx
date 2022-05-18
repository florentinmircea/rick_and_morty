import axios from "axios";
import { BASE_URL } from "./characters";

const GET_EPISODE = "episode/";

export const getEpisodes = async (episode: number[]) => {
  return axios
    .get(BASE_URL + GET_EPISODE + episode.join(","))
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
