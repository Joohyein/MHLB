import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import { logEvent } from "../util/amplitude";

function NotFound() {

  const navigate = useNavigate();

  useEffect(() => {
    logEvent('Enter Not found page', {from: 'Not found page'});
  },[]);
  return (
    <StContainer>
      <StTitle>
        <h3>PAGE NOT FOUND</h3>
        <h1>404</h1>
      </StTitle>
      <StDesc>
        <h1>원하시는 페이지를 찾을 수 없습니다.</h1>
        <h3>존재하지 않는 주소를 입력하셨거나,</h3>
        <h3>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</h3>
        <h3>입력하신 페이지의 주소가 정확한지 다시 한 번 확인해 주세요.</h3>
      </StDesc>
      <StHomeBtn onClick = {() => {navigate(`/select-workspace`)}}>메인 페이지로 이동</StHomeBtn>
    </StContainer>
  )
}

export default NotFound;

const StContainer = styled.div`
  width : 100%;
  height : 100vh;
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1{
    font-size: 212px;
  }
`;
const StDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  h1 {
    font-size: 32px;
    margin-bottom: 24px;
    font-weight: 600;
  };
  h3 {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 4px;
  };
`;
const StHomeBtn = styled.button`
  margin-top : 1rem;
  font-size : 1rem;
  font-weight : 700;
  color : white;
  background-color : #3e3e3e;
  padding : 0.5rem 2rem;
  border : none;
  border-radius : 0.25rem;
  line-height : 1.5rem;
  transition : 200ms;
  &:hover {
    background-color : #429dff;
    cursor : pointer;
  };
  &:active {
    scale : 1.05;
  };
`;