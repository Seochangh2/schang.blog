import styled from "styled-components";
const SearchBox = () => {
  return <Container placeholder="검색"></Container>;
};

export default SearchBox;
const Container = styled.input`
  margin-top: 20%;
  height: 80%;
  padding-left: 10px;
  padding-right: 10px;
  width: calc(20% - 20px);
  background-color: #4a4a4a23;
  margin-right: 5%;
  border-radius: 10px;
  border: none;
  font-family: LGEITextTTF;
`;
