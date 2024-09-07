import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
const Header = () => {
  return (
    <Container>
      <Title>
        <Black to={"/write"}></Black>
        <Yellow></Yellow>
        <Text to={"/"}>schang.blog</Text>
      </Title>
      <Line></Line>
      <SearchBox></SearchBox>
    </Container>
  );
};
export default Header;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  height: 50px;
  width: 1250px;
`;
const Title = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 20%;
  height: 100%;
`;
const Yellow = styled.div`
  background-color: yellow;
  width: 25px;
  height: 70%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const Black = styled(Link)`
  background-color: black;
  width: 25px;
  height: 70%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
const Text = styled(Link)`
  margin-left: 25px;
  font-size: 15px;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;
const Line = styled.div`
  height: 50px;
  width: 40%;
  border-bottom: 1px solid black;
`;
