import React from "react";
import styled from "styled-components";
import { CharacterInfo } from "../types";

interface Props {
  object: CharacterInfo;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  border-color: white;
  border-style: solid;
  align-items: center;
`;
const Title = styled.h4`
  color: white;
`;
const Status = styled.h5`
  color: white;
`;

const Card: React.FunctionComponent<Props> = (props) => {
  const { object } = props;
  return (
    <Root>
      <div>
        <Title>{object.name}</Title>
      </div>
      <div>
        <img src={object.image} width={"100px"} alt="character" />
      </div>
      <div>
        <Status>{object.status}</Status>
      </div>
    </Root>
  );
};

export default Card;
