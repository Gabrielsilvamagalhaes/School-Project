import styled from "styled-components";

export const Title = styled.h2`
  background-color: ${(props) => (props.isRed ? "white" : "violet")};
  color: ${(props) => (props.isRed ? "black" : "white")};
`;
