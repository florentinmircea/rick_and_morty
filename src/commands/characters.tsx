import axios from "axios";

const GET_CHARACTERS = "https://rickandmortyapi.com/api/character";
const FILTER_CHARACTERS = (name: string, status: string) =>
  `https://rickandmortyapi.com/api/character/?name=${name}&status=${status}`;

export const getCharacters = async (page: number) => {
  return axios
    .get(
      page > 1 ? GET_CHARACTERS + "?page=" + page.toString() : GET_CHARACTERS
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

export const filterCharacters = async (name: string, status: string) => {
  return axios
    .get(FILTER_CHARACTERS(name, status))
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
