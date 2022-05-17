import React, { useEffect, useState } from "react";
import styled from "styled-components";
import img from "../assets/images/detailspage-pg.jpg";
import { getEpisodes } from "../commands/episodes";
import { CharacterInfo } from "../types";

const Root = styled.div`
  background-image: url(${img});
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const RootContent = styled.div`
  display: flex;
  flex-flow: row wrap;
  position: relative;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  align-content: center;
  color: white;
  flex-direction: column;
`;

const Male = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: blue;
  width: 60px;
  height: 60px;
`;

const Female = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: red;
  width: 60px;
  height: 60px;
`;

const DetailsPage: React.FunctionComponent = () => {
  const [item, setItem] = useState<CharacterInfo>();
  const [episodes, setEpisodes] = useState<string[]>([]);

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
      console.log(response);
      if (response) {
        let aux = [];
        for (let i = 0; i < response.length; i++) {
          aux.push(response[i].name);
        }
        setEpisodes(aux);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Unexpected error", err);
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
            <Male> {item?.gender}</Male>
          ) : (
            <Female> {item?.gender}</Female>
          )}
          <div>{item?.origin.name}</div>
          <div>{item?.location.name}</div>
          <ol>
            {episodes.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ol>
          <ul>
            {episodes.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </Content>
      </RootContent>
    </Root>
  );
};

export default DetailsPage;
