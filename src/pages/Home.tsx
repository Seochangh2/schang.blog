import React, { useState } from "react";
import styled from "styled-components";
import Header from ".././components/Header";
import Sidebar from ".././components/Sidebar";
import PostsContainer from ".././components/PostsContainer";
import Wrapper from "../components/Wrapper";

function Home() {
  return (
    <Wrapper>
      <Container>
        <Header></Header>
        <Contents>
          <Sidebar></Sidebar>
          <PostsContainer></PostsContainer>
        </Contents>
      </Container>
    </Wrapper>
  );
}

export default Home;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
`;
export const Contents = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  width: 1250px;
`;
