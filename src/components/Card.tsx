import React from "react";
import { CharacterInfo } from "../types";
import { Root, Status, Title } from "../styles/Card.styles";

interface Props {
  object: CharacterInfo;
}

const Card: React.FunctionComponent<Props> = ({ object }: Props) => {
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
