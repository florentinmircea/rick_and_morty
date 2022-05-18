import axios from "axios";

export const BASE_URL = "https://rickandmortyapi.com/api/";
const GET_CHARACTERS = "character";
const FILTER_CHARACTERS = (name: string, status: string) =>
  `character/?name=${name}&status=${status}`;

export const getCharacters = async (page: number) => {
  return axios
    .get(
      page > 1
        ? BASE_URL + GET_CHARACTERS + "?page=" + page.toString()
        : BASE_URL + GET_CHARACTERS
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
    .get(BASE_URL + FILTER_CHARACTERS(name, status))
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
