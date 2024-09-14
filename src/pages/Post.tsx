import { useState } from "react";
import styled from "styled-components";
import Header from ".././components/Header";
import Sidebar from ".././components/Sidebar";
import { Container, Contents } from "./Home";
import { Tag, Date } from ".././components/PostsContainer";
import { useParams, useNavigate } from "react-router-dom";
import Markdown from "../components/Markdown";
import { API_KEY } from "../config";
import axios from "axios";
import { CommentType } from "../types";
import Wrapper from "../components/Wrapper";
import useFetchPostDetail from "../hooks/useFetchPostDetail";
function Post() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [commentInfo, setCommentInfo] = useState({
    nickname: "",
    password: "",
    post_id: id,
    comment: "",
  });
  const { postDetail } = useFetchPostDetail(id);

  const deletePost = async () => {
    if (!window.confirm("삭제하시겠습니까?")) {
      return;
    }
    try {
      const response = await axios.delete(`/api/posts/${id}`);
      if (response.data.message.includes("success")) {
        navigate(`/`);
      }
    } catch (error) {
      console.error("Error Delete Post", error);
    }
  };
  const uploadComment = async () => {
    try {
      const response = await axios.post(`/api/comments`, commentInfo);
      if (response.data.message.includes("success")) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error Upload Comment:", error);
    }
  };
  const deleteComment = async (comment: CommentType) => {
    if (!window.confirm("삭제하시겠습니까?")) {
      return;
    }
    const password = window.prompt("비밀번호를 입력해주세요");
    try {
      const response = await axios.delete(`/api/comments`, {
        data: { ...comment, password: password },
      });
      if (response.data.message.includes("success")) {
        window.location.reload();
      } else if (response.data.message.includes("incorrect")) {
        alert("닉네임/패스워드 에러");
      }
    } catch (error) {
      console.error("Error Delete Comment:", error);
    }
  };
  const clickEditBtn = () => {
    navigate(`/write/${id}`);
  };

  return (
    <Wrapper>
      <Container>
        <Header></Header>
        <Contents>
          <Sidebar></Sidebar>
          {postDetail && (
            <PostBox>
              <Title>{postDetail.title}</Title>
              <TagContainer>
                <Date>
                  {postDetail.date.split("T")[0]}{" "}
                  {postDetail.date.split("T")[1].slice(0, 5)}
                </Date>
                {postDetail.tags.map((tag) => {
                  return <Tag key={tag}>{tag}</Tag>;
                })}
              </TagContainer>
              <EditContainer>
                <EditBtn onClick={clickEditBtn}>수정</EditBtn>
                <EditBtn onClick={deletePost}>삭제</EditBtn>
              </EditContainer>
              <WritingBox>
                <Markdown text={postDetail.markdown}></Markdown>
              </WritingBox>
              <CommentBox>
                <InfoBox>
                  <Info
                    placeholder="Name"
                    value={commentInfo.nickname}
                    onChange={(e) => {
                      setCommentInfo({
                        ...commentInfo,
                        nickname: e.target.value,
                      });
                    }}
                  ></Info>
                  <Info
                    placeholder="Password"
                    type="password"
                    value={commentInfo.password}
                    onChange={(e) => {
                      setCommentInfo({
                        ...commentInfo,
                        password: e.target.value,
                      });
                    }}
                  ></Info>
                </InfoBox>
                <InputBox>
                  <Input
                    placeholder="댓글을 작성하세요"
                    value={commentInfo.comment}
                    onChange={(e) => {
                      setCommentInfo({
                        ...commentInfo,
                        comment: e.target.value,
                      });
                    }}
                  ></Input>
                  <InputBtn onClick={uploadComment}>작성</InputBtn>
                </InputBox>
                <Line></Line>
                {postDetail.comments.map((comment) => {
                  return (
                    <Comment key={comment.date}>
                      <CommentText>{comment.comment}</CommentText>
                      <CommentInfoBox>
                        <CommentBtn onClick={() => deleteComment(comment)}>
                          삭제
                        </CommentBtn>
                        <CommentInfo>{comment.ip}</CommentInfo>
                        <CommentInfo>{comment.nickname}</CommentInfo>
                        <CommentInfo>
                          {" "}
                          {comment.date.split("T")[0]}{" "}
                          {comment.date.split("T")[1].slice(0, 5)}
                        </CommentInfo>
                      </CommentInfoBox>
                    </Comment>
                  );
                })}
              </CommentBox>
            </PostBox>
          )}
        </Contents>
      </Container>
    </Wrapper>
  );
}

export default Post;

const PostBox = styled.div`
  min-height: 1000px;
  height: auto;
  width: 850px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: end;
  box-sizing: border-box;
`;
const Title = styled.div`
  height: 100px;
  width: 95%;
  font-size: 30px;
  font-weight: 700;
  display: flex;
  justify-content: start;
  align-items: center;
`;
const TagContainer = styled.div`
  height: 50px;
  width: 95%;
  overflow: hidden;
  display: flex;
  justify-content: start;
  align-items: center;
`;
const EditContainer = styled.div`
  height: 30px;
  width: 95%;
  overflow: hidden;
  display: flex;
  justify-content: end;
  align-items: center;
`;
const EditBtn = styled.button`
  border: none;
  background-color: transparent;
  font-family: LGEITextTTF;
  font-size: 15px;
  color: #00000063;
  border: 0.5px solid transparent;
  &:hover {
    border-bottom: 0.5px solid #00000063;
  }
  cursor: pointer;
`;
const WritingBox = styled.div`
  min-height: 600px;
  height: 100px;
  width: 95%;
`;
const CommentBox = styled.div`
  min-height: 200px;
  height: auto;
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  box-sizing: border-box;
  margin-bottom: 50px;
`;
const Comment = styled.div`
  min-height: 100px;
  height: auto;
  width: 100%;
  margin-top: 12.5px;
  margin-bottom: 12.5px;
  display: flex;
  justify-content: space-between;
  align-content: end;
`;
const CommentText = styled.div`
  min-height: 80px;
  height: auto;
  width: 75%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: #4a4a4a23;
  color: black;
  font-size: 15px;
`;
const CommentInfoBox = styled.div`
  min-height: 100px;
  height: auto;
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: end;
`;
const CommentBtn = styled.button`
  height: 20px;
  width: 50px;
  font-size: 15px;
  display: flex;
  justify-content: end;
  align-items: start;
  color: #00000063;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: LGEITextTTF;
`;
const CommentInfo = styled.div`
  height: 20px;
  width: 100%;
  font-size: 15px;
  display: flex;
  justify-content: end;
  align-items: end;
`;
const InfoBox = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
`;
const Info = styled.input`
  height: 30px;
  width: 15%;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  border: none;
  margin-left: 15px;
  background-color: #4a4a4a23;
  color: black;
  display: flex;
  justify-content: space-between;
  align-content: end;
  font-size: 15px;
  font-weight: 500;
  font-family: LGEITextTTF;
  :focus {
    outline: none;
  }
`;
const InputBox = styled.div`
  height: 125px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
`;
const Input = styled.textarea`
  height: 80px;
  width: 75%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: #4a4a4a23;
  color: black;
  display: flex;
  justify-content: space-between;
  align-content: end;
  font-size: 15px;
  font-weight: 500;
  font-family: LGEITextTTF;
  resize: none;
`;
const InputBtn = styled.button`
  height: 50px;
  width: 10%;
  margin-right: 2.5%;
  margin-top: 50px;
  border-radius: 15px;
  border: none;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  font-family: LGEITextTTF;
`;
const Line = styled.div`
  border-bottom: 1px solid #24242462;
  width: 100%;
`;
