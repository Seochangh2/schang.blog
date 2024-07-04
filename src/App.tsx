import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PostsContainer from "./components/PostsContainer";
function App() {
  return (
    <Container>
      <Header></Header>
      <Contents>
        <Sidebar></Sidebar>
        <PostsContainer></PostsContainer>
      </Contents>
    </Container>
  );
}

export default App;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
`;
const Contents = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 1250px;
`;
