import React, { useEffect, useMemo, useState } from "react";
import { filterCharacters, getCharacters } from "../commands/characters";
import styled from "styled-components";
import img from "../assets/images/homepage-bg.jpg";
import Card from "../components/Card";
import { CharacterInfo } from "../types";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

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
`;

const CardContainer = styled.div`
  margin: 15px;
  flex: 0 1 calc(20% - 30px);
`;

const CenteredContent = styled.div`
  display: flex;
  justify-content: center;
`;

const HomePage: React.FunctionComponent = () => {
  const [characters, setCharacters] = useState<CharacterInfo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(-1);
  const [value, setValue] = useState<string>("alive");
  const [name, setName] = useState<string>("");
  const options = [{ value: "alive" }, { value: "dead" }, { value: "unknown" }];
  const navigate = useNavigate();

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };

  const handleCardClick = (item: CharacterInfo) => {
    sessionStorage.setItem("item", JSON.stringify(item));
    navigate("/details");
  };

  useEffect(() => {
    loadCharacters(1);
    sessionStorage.removeItem("item");
  }, []);

  useEffect(() => {
    loadCharacters(page);
  }, [page]);

  const loadCharacters = async (page: number) => {
    try {
      const response = await getCharacters(page);
      console.log(response);
      setMaxPage(response.info.pages);
      setCharacters(response.results);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Unexpected error", err);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    filter(name, event.target.value);
  };

  const filter = async (name: string, status: string) => {
    try {
      const response = await filterCharacters(name, status);
      console.log(response);
      setMaxPage(response.info.pages);
      setCharacters(response.results);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Unexpected error", err);
      }
    }
  };

  const eventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (event.target.value === "") {
      loadCharacters(1);
    } else {
      filter(event.target.value, value);
    }
    setPage(1);
  };

  const debouncedEventHandler = useMemo(() => debounce(eventHandler, 300), []);

  return (
    <Root>
      <CenteredContent>
        <input
          onChange={debouncedEventHandler}
          type="text"
          placeholder="Character name"
        />
        <select value={value} onChange={handleChange}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
      </CenteredContent>
      <RootContent>
        {characters.map((item, index) => {
          return (
            <CardContainer
              key={index}
              onClick={handleCardClick.bind(this, item)}
            >
              <Card object={item} />
            </CardContainer>
          );
        })}
      </RootContent>
      <CenteredContent>
        <button onClick={handlePrevPage}>Prev page</button>
        <button onClick={handleNextPage}>Next page</button>
      </CenteredContent>
    </Root>
  );
};

export default HomePage;
