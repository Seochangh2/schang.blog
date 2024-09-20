import styled from "styled-components";
import { Container } from "./Home";
import Markdown from "../components/Markdown";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "../config";
import axios from "axios";
import Wrapper from "../components/Wrapper";
const Write = () => {
  const navigate = useNavigate();
  const [markdown, setMarkdown] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tagText, setTagText] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const uploadPost = async () => {
    try {
      const data = {
        title: title,
        tags: tags,
        markdown: markdown,
      };
      const response = await axios.post(`/api/posts`, data);
      if (response.data.message.includes("success")) {
        const id = response.data.message.split(":")[0];
        navigate(`/post/${id}`);
      } else {
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!tags.includes(tagText)) {
        setTags((prev) => [...prev, tagText]);
      }
      setTagText("");
    }
  };
  useEffect(() => {
    setTagText("");
  }, [tags]);
  return (
    <Wrapper>
      <Container>
        <Contents>
          <WritingBox>
            <TitleInput
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></TitleInput>
            <Line></Line>
            <TagContainer>
              {tags.map((text) => {
                return <Tag key={text}>{text}</Tag>;
              })}
              {tags.length !== 5 && (
                <TagInput
                  placeholder="태그 입력"
                  value={tagText}
                  onChange={(e) => {
                    setTagText(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                ></TagInput>
              )}
            </TagContainer>
            <Line></Line>
            <MarkdownInput
              placeholder="내용을 입력해주세요"
              value={markdown}
              onChange={(e) => {
                setMarkdown(e.target.value);
              }}
            ></MarkdownInput>
            <Line></Line>
            <ButtonContainer>
              <Btn>임시 저장</Btn>
              <Btn onClick={uploadPost}>포스팅</Btn>
            </ButtonContainer>
          </WritingBox>
          <WritingResult>
            <TitleContainer>{title}</TitleContainer>
            <Line></Line>
            <Markdown
              text={markdown
                .replace(/\n/gi, "\n\n")
                .replace(/\*\*/gi, "@$_%!^")
                .replace(/@\$_%!\^/gi, "**")
                .replace(/<\/?u>/gi, "*")}
            ></Markdown>
          </WritingResult>
        </Contents>
      </Container>
    </Wrapper>
  );
};
export default Write;
const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 1000px;
  width: auto;
`;
const WritingBox = styled.div`
  min-height: 1000px;
  height: calc(100vh - 50px);
  min-width: 625px;
  width: calc(50vw - 100px);
  max-width: 1000px;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 25px;
  padding-bottom: 25px;
  background-color: #f29d4222;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;
const WritingResult = styled.div`
  min-height: 1000px;
  height: calc(100vh - 50px);
  min-width: 625px;
  width: calc(50vw - 100px);
  max-width: 1000px;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 25px;
  padding-bottom: 25px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  overflow: scroll;
`;
const MarkdownInput = styled.textarea`
  margin-top: 25px;
  min-height: 800px;
  height: calc(100vh - 250px);
  width: 100%;
  background-color: transparent;
  font-size: 20px;
  font-weight: 500;
  font-family: LGEITextTTF;
  resize: none;
  padding: 10px;
  border: none;
`;
const ButtonContainer = styled.div`
  height: 50px;
  width: 100%;
  background-color: transparent;
  font-size: 20px;
  font-weight: 600;
  font-family: LGEITextTTF;
  resize: none;
  border: none;
  display: flex;
  align-items: end;
  justify-content: end;
`;
const Btn = styled.button`
  height: 90%;
  width: 100px;
  margin-left: 5%;
  background-color: #7b6864;
  font-family: LGEITextTTF;
  color: white;
  font-weight: 500;
  border-radius: 15px;
  border: none;
  cursor: pointer;
`;
const TagContainer = styled.div`
  height: 50px;
  width: 100%;
  padding: 10px 0px 10px 0px;
  overflow: hidden;
  display: flex;
  justify-content: start;
  align-items: center;
`;
const TitleInput = styled.textarea`
  height: 50px;
  width: 100%;
  background-color: transparent;
  font-size: 35px;
  font-weight: 600;
  font-family: LGEITextTTF;
  resize: none;
  padding: 0px 10px 0px 10px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Line = styled.div`
  border-bottom: 1px solid #24242462;
  width: 100%;
`;
const Tag = styled.div`
  height: 70%;
  width: fit-content;
  min-width: 50px;
  margin-right: 10px;
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
const TagInput = styled.textarea`
  height: 70%;
  width: 100px;
  margin-right: 10px;
  background-color: transparent;
  resize: none;
  padding: 15px 10px 0px 10px;
  border: none;
  border-bottom: 0.5px solid #24242462;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
  font-family: LGEITextTTF;
  overflow: auto;
  white-space: nowrap; /* 줄바꿈 방지 및 가로 스크롤 활성화 */
`;
const TitleContainer = styled.div`
  height: 50px;
  width: 100%;
  background-color: transparent;
  font-size: 35px;
  font-weight: 600;
  font-family: LGEITextTTF;
  resize: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: start;
`;
