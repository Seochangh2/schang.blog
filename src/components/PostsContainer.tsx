import styled from "styled-components";
import { posts } from "../Dummy";
import { PostResponse } from "../types";
const PostsContainer = () => {
  return (
    <Container>
      {posts.map((info: PostResponse) => {
        return (
          <PostContainer>
            <Title>{info.title}</Title>
            <Summary>{info.summary}</Summary>
            <DateAndTags>
              {info.date}
              {info.tags.map((tag) => {
                return <div>{tag}</div>;
              })}
            </DateAndTags>
            <Line></Line>
          </PostContainer>
        );
      })}
    </Container>
  );
};

export default PostsContainer;
const Container = styled.div`
  height: auto;
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;
const PostContainer = styled.div`
  height: 250px;
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;
const Title = styled.div`
  height: 20%;

  width: 90%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
`;
const Summary = styled.div`
  height: 60%;
  width: 90%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 10px;
`;
const DateAndTags = styled.div`
  height: 20%;
  width: 90%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 10px;
`;
const Line = styled.div`
  border-bottom: 1px solid #00000063;
  width: 80%;
  margin-right: 10%;
`;
