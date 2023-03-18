import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Wrapper from "../components/common/Wrapper";
import useIsLogin from "../hooks/useIsLogin";

const CelebrateSignUp = () => {

  const isLogin = useIsLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if(isLogin === true) return navigate('/select-workspace');
  }, [isLogin])

  return (
    <Wrapper>
      <StContainer>
        <StTitleMessage>회원가입을 축하합니다!</StTitleMessage>
        <StDescButton onClick = {() => {navigate('/login')}}>로그인 화면으로 돌아가기</StDescButton>
      </StContainer>
    </Wrapper>
  );
};

export default CelebrateSignUp;

const StContainer = styled.div`
  width : 100%;
  height : 100vh;
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StTitleMessage = styled.div`
font-size : 3rem;
font-weight : 900;
line-height : 4.5rem;
color : #303030;
text-align : center;
`

const StDescButton = styled.button`
  margin-top : 1rem;
  font-size : 1rem;
  font-weight : 700;
  color : white;
  background-color : #007aff;
  padding : 0.25rem 1rem;
  border : none;
  border-radius : 0.25rem;
  line-height : 1.5rem;
  transition : 200ms;
  &:hover {
    background-color : #429dff;
    cursor : pointer;
  }
  &:active {
    scale : 1.05;
  }
`