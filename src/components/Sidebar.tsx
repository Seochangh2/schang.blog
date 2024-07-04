import styled from "styled-components";
import profileImg from "../imgs/profile.png";
import { tags } from "../Dummy";
const Sidebar = () => {
  const handleOpenNewTab = (url: string) => {
    window.open(url, "_blank", "noopener, noreferrer");
  };
  return (
    <Container>
      <ImgContainer>
        <Img src={profileImg} alt="" />
      </ImgContainer>
      <Introduce>안녕하세요! 개발자 서창희입니다.</Introduce>
      <Line></Line>
      <LinksContainer>
        <LinkBtn
          onClick={() => {
            handleOpenNewTab("https://velog.io/@changh2/posts");
          }}
        >
          velog
        </LinkBtn>
        <LinkBtn
          onClick={() => {
            handleOpenNewTab("https://bit.ly/3FIIevj");
          }}
        >
          portfolio
        </LinkBtn>
      </LinksContainer>
      <Line></Line>
      <TagsContainer>
        <Tag>전체보기</Tag>
        {tags.map((tag) => {
          return <Tag>{tag}</Tag>;
        })}
      </TagsContainer>
    </Container>
  );
};

export default Sidebar;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100%;
  width: 250px;
`;
const ImgContainer = styled.div`
  height: 200px;
  width: 200px;
  margin-top: 25px;
  margin-bottom: 10px;
`;
const Img = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 75px;
`;
const Introduce = styled.div`
  height: 25px;
  width: 200px;
  font-size: 7px;
  text-align: center;
`;
const Line = styled.div`
  height: 1px;
  width: 90%;
  border-bottom: 1px solid #00000063;
`;
const LinksContainer = styled.div`
  height: 30px;
  width: 200px;
  display: flex;
  justify-content: space-around;
  align-items: start;
  margin: 10px;
`;
const LinkBtn = styled.button`
  height: 100%;
  width: 40%;
  border-radius: 10px;
  background-color: white;
  border: 1px solid #00000063;
  margin-bottom: 2.5%;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
`;
const TagsContainer = styled.div`
  margin-top: 20px;
  height: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;
const Tag = styled.div`
  height: 25px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: start;
  border: 0.5px solid transparent;
  &:hover {
    border-bottom: 0.5px solid #000000;
  }
  cursor: pointer;
`;
