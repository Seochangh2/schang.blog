import styled from "styled-components";
import { PostResponse, PostPreviewType } from "../types";
import { Link } from "react-router-dom";
import profileImg from "../imgs/profile.png";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_KEY } from "../config";
import useIntersectionObserver from "../hooks/useInterSectionObserver";
const PostsContainer = () => {
  const [posts, setPosts] = useState<PostPreviewType[]>();
  const [page, setPage] = useState(0);
  //const [loading, setLoading] = useState(false);
  const target = useRef<HTMLDivElement>(null);
  // const options = {
  //   root: null,
  //   threshold: 0.75,
  //   rootMargin: "0px",
  // };
  // const [observe, unobserve] = useIntersectionObserver(() => {
  //   setPage((page) => page + 1);
  // });
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/posts`);
      const data = response.data.map((post: PostResponse): PostPreviewType => {
        return {
          ...post,
          tags: JSON.parse(post.tags),
        };
      });
      setPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    //if (page === 1) observe(target.current);
    // const N = data.result.length;
    // const totalCount = data.totalCount;
    // if (0 === N || totalCount <= N) {
    //   unobserve(target.current);
    // }
  }, [posts]);
  useEffect(() => {
    fetchData();
  }, [page]);
  return (
    <Container>
      {posts &&
        posts.map((post: PostPreviewType) => {
          return (
            <PostContainer key={post.id}>
              <Title to={`/post/${post.id}`}>{post.title}</Title>
              <Content>
                <Summary>{post.preview}</Summary>
                <Img src={profileImg}></Img>
              </Content>
              <TagContainer>
                <Date>{post.date.split("T")[0]}</Date>
                {post.tags.map((tag) => {
                  return <Tag key={tag}>{tag}</Tag>;
                })}
              </TagContainer>
              <Line></Line>
            </PostContainer>
          );
        })}
      {posts && <Target ref={target}></Target>}
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
  box-sizing: border-box;
`;
const PostContainer = styled.div`
  height: 250px;
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
`;
const Title = styled(Link)`
  height: 20%;
  width: 90%;
  overflow-x: hidden;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;
const Content = styled.div`
  margin-bottom: 10px;
  height: 60%;
  width: 90%;
  display: flex;
  justify-content: start;
  align-items: center;
`;
const Summary = styled.div`
  height: 100%;
  width: 70%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 15px;
  margin-right: 5%;
`;
const Img = styled.img`
  height: 100%;
  width: 20%;
  display: flex;
  justify-content: start;
  align-items: center;
  object-fit: cover;
  border-radius: 10px;
`;
const TagContainer = styled.div`
  height: 50px;
  width: 90%;
  overflow: hidden;
  display: flex;
  justify-content: start;
  align-items: center;
`;
export const Date = styled.div`
  height: 70%;
  width: fit-content;
  min-width: 50px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding-left: 5px;
  padding-right: 10px;
  border-right: 0.5px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
`;
export const Tag = styled.div`
  height: 70%;
  width: fit-content;
  min-width: 50px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 20px;
  border: 0.5px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
`;
export const Line = styled.div`
  border-bottom: 1px solid #00000063;
  width: 80%;
  margin-right: 10%;
`;
const Target = styled.div`
  height: 100px;
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  background-color: transparent;
`;
