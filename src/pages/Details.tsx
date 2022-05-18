import React, { useEffect, useId, useState } from "react";
import { getEpisodes } from "../commands/episodes";
import { Content, Gender, Root, RootContent } from "../styles/Details.styles";
import { CharacterInfo } from "../types";

const DetailsPage: React.FunctionComponent = () => {
  const [item, setItem] = useState<CharacterInfo>();
  const [episodes, setEpisodes] = useState<string[]>([]);
  const id = useId();

  useEffect(() => {
    let aux = JSON.parse(sessionStorage.getItem("item") || "{}");
    setItem(aux);
  }, []);

  useEffect(() => {
    if (item) {
      let aux = [];
      for (let i = 0; i < item.episode.length; i++) {
        let n = item.episode[i].lastIndexOf("/");
        aux.push(Number(item.episode[i].substring(n + 1)));
      }
      loadEpisodesName(aux);
    }
  }, [item]);

  const loadEpisodesName = async (episodes: number[]) => {
    try {
      const response = await getEpisodes(episodes);
      // console.log(response);
      if (response) {
        let aux = [];
        for (let i = 0; i < response.length; i++) {
          aux.push(response[i].name);
        }
        setEpisodes(aux);
      }
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Unexpected error" + err);
      }
    }
  };

  return (
    <Root>
      <RootContent>
        <Content>
          <div>{item?.name}</div>
          <img src={item?.image} alt="character" />
          <div>{item?.status}</div>
          <div>{item?.species}</div>

          {item?.gender === "Male" ? (
            <Gender male> {item?.gender}</Gender>
          ) : (
            <Gender> {item?.gender}</Gender>
          )}
          <div>{item?.origin.name}</div>
          <div>{item?.location.name}</div>
          <ol>
            {episodes.map((item, index) => {
              return <li key={`${id}-${index}`}>{item}</li>;
            })}
          </ol>
          <ul>
            {episodes.map((item, index) => {
              return <li key={`${id}-${index}`}>{item}</li>;
            })}
          </ul>
        </Content>
      </RootContent>
    </Root>
  );
};

export default DetailsPage;
