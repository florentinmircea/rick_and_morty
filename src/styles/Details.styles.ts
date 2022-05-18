import styled from "styled-components";
import img from "../assets/images/detailspage-pg.jpg";

interface GenderProps {
  male?: any;
}

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
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  align-content: center;
  color: white;
  flex-direction: column;
`;

export const Gender = styled.div<GenderProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: ${(props) => (props.male ? "blue" : "red")};
  width: 60px;
  height: 60px;
`;
