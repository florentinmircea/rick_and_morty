import styled from "styled-components";
import img from "../assets/images/homepage-bg.jpg";

export const Root = styled.div`
  background-image: url(${img});
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;
export const RootContent = styled.div`
  display: flex;
  flex-flow: row wrap;
  position: relative;
`;

export const CardContainer = styled.div`
  margin: 15px;
  flex: 0 1 calc(20% - 30px);
`;

export const CenteredContent = styled.div`
  display: flex;
  justify-content: center;
`;
