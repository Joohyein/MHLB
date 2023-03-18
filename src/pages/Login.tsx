import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../api/auth";
import GoogleSocialIcon from "../components/asset/icons/GoogleSocialIcon";
import Wrapper from "../components/common/Wrapper";
import useInput from "../hooks/useInput";
import useInputRefFocus from "../hooks/useInputRefFocus";
import useIsLogin from "../hooks/useIsLogin";
import { setCookie } from "../cookie/cookies";

const Login = () => {

  const isLogin = useIsLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if(isLogin === true) return navigate('/select-workspace');
  }, [isLogin])

  const [emailValue, setEmailValue, clearEmailValue] = useInput();
  const [passwordValue, setPasswordValue, clearPasswordValue] = useInput();

  const [emailInputRef, emailInputRefFocus] = useInputRefFocus();
  const [passwordInputRef, passwordInputRefFocus] = useInputRefFocus();
  const loginButtonRef = useRef<HTMLButtonElement>(null);

  const [emptyValidation, setEmptyValidation] = useState(false);
  const [emailFormValidation, setEmailFormValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [wrongValidation, setWrongValidation] = useState(false);

  const onEnterKeyDownEmail = (e : React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      passwordInputRef.current.focus();
    }
  }

  const onEnterKeyDownPassword = (e : React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      onClickLogin();
    }
  }

  const onClickLogin = () => {
    if (!emailValue && !passwordValue) {
      setEmptyValidation(true);
    } else if (!emailValue) {
      setEmailValidation(true);
    } else if (!(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}|\.[a-z]{2,3}\.[a-z]{2,3}/g).test(emailValue)) {
      setEmailFormValidation(true);
    } else if (!passwordValue) {
      setPasswordValidation(true);
    } else {
      login({email : emailValue, password : passwordValue})
      .then((res) => {
        setCookie("authorization", res.headers.authorization);
        navigate("/select-workspace");
      })
      .catch((error) => {
        if(error.response.status === 400) return setWrongValidation(true);
      })
    }
  }

  const clearWarningMessage = () => {
    setEmptyValidation(false);
    setEmailFormValidation(false);
    setEmailValidation(false);
    setPasswordValidation(false);
    setWrongValidation(false);
  }

  return (
    <Wrapper>
      <StBackground>
        <StContainer>
          <StPageTitle>로그인</StPageTitle>
          <StPageSubTitle>이메일과 비밀번호를 입력해주세요!</StPageSubTitle>
          <StInputLabel htmlFor = "email" isFocus = {emailInputRefFocus}>이메일</StInputLabel>
          <StInput type = {'text'} onKeyDown = {(e) => onEnterKeyDownEmail(e)} ref = {emailInputRef} id = "email" value = {emailValue} onChange = {(e) => {setEmailValue(e); clearWarningMessage()}} placeholder = "Email"/>
          {emailValidation ? <StValidationText>이메일을 입력해주세요.</StValidationText> : null}
          {emailFormValidation ? <StValidationText>이메일 형식을 확인해주세요.</StValidationText> : null}
          <StInputLabel htmlFor = "password" isFocus = {passwordInputRefFocus}>비밀번호</StInputLabel>
          <StInput type = {'password'} onKeyDown = {(e) => onEnterKeyDownPassword(e)} ref = {passwordInputRef} id = "password" value = {passwordValue} onChange = {(e) => {setPasswordValue(e); clearWarningMessage()}} placeholder = "Password"/>
          {passwordValidation ? <StValidationText>비밀번호를 입력해주세요.</StValidationText> : null}
          {emptyValidation ? <StValidationText>모든 정보를 입력해주세요.</StValidationText> : null}
          {wrongValidation ? <StValidationText>이메일이나 비밀번호가 틀렸습니다.</StValidationText> : null}
          <StFindPassword to = '/reset-password-send-email'>비밀번호를 잊어버리셨나요?</StFindPassword>
          <StLoginButton ref = {loginButtonRef} onClick = {() => {onClickLogin()}}>로그인</StLoginButton>
          <StOrDiv>
            <StHrTag />
            <StOrText>or</StOrText>
            <StHrTag />
          </StOrDiv>
          <StGoogleLoginButton><GoogleSocialIcon />Google로 계속하기</StGoogleLoginButton>
          <StRegisterRecommend>아직 계정이 없으신가요?<StRegisterRecommendLink to = '/register'>가입하기</StRegisterRecommendLink></StRegisterRecommend>
        </StContainer>
      </StBackground>
    </Wrapper>
  )
};

export default Login;

const StBackground = styled.div`
  width : 100%;
  height : 100vh;
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color : #f4f4f4;
`

const StContainer = styled.div`
  width : 464px;
  background-color : white;
  border-radius : 0.5rem;
  box-shadow : 0px 0px 1rem rgba(0, 0, 0, 0.05);
  display : flex;
  flex-direction : column;
  justify-content : flex-start;
  align-items : flex-start;
  padding : 4rem;
  box-sizing : border-box;
`

const StPageTitle = styled.div`
  font-size : 2rem;
  font-weight : 900;
  margin-bottom : 0.25rem;
`

const StPageSubTitle = styled.div`
  font-size : 1rem;
  font-weight : 200;
  margin-bottom : 1rem;
`

const StInputLabel = styled.label`
  font-size : 1rem;
  font-weight : 600;
  margin-top : 1rem;
  margin-bottom : 0.5rem;
  transition : 200ms;
  color : ${(props : {isFocus : boolean}) => props.isFocus ? "#007aff" : "#303030"};
`

const StInput = styled.input`
  width : 100%;
  height : 42px;
  margin-bottom : 1rem;
  border : none;
  outline : 1px solid #dbdbdb;
  outline-offset : -1px;
  border-radius : 0.25rem;
  padding : 1rem;
  box-sizing : border-box;
  font-weight : 400;
  transition : 200ms;
  &:placeholder {
    color : #d0d0d0;
  }
  &:focus {
    color : #007aff;
    outline : 1px solid #007aff;
  }
`

const StFindPassword = styled(Link)`
  font-size : 0.75rem;
  font-weight : 400;
  color : #007aff;
  margin-left : auto;
  margin-bottom : 2rem;
  text-decoration-line : none;
  transition : 200ms;
  &:visited {
    text-decoration-line : none;
  }
  &:hover {
    cursor : pointer;
    color : #429dff;
  }
`

const StLoginButton = styled.button`
  background-color : #007aff;
  width : 100%;
  height : 35px;
  font-size : 1rem;
  font-weight : 700;
  border : none;
  border-radius : 0.25rem;
  color : white;
  line-height : 1.5rem;
  transition : 200ms;
  &:hover {
    cursor : pointer;
    background-color : #429dff;
  }
`

const StOrDiv = styled.div`
  width : 100%;
  display : flex;
  align-items : center;
  margin : 0.5rem 0;
`

const StOrText = styled.div`
  font-size : 1rem;
  font-weight : 700;
  color : #c7c7c7;
  margin : 0 0.5rem;
`

const StHrTag = styled.hr`
  flex-grow : 1;
  height : 1px;
  background : #e1e1e1;
  border : none;
`

const StGoogleLoginButton = styled.button`
  background-color : white;
  width : 100%;
  height : 35px;
  font-size : 1rem;
  font-weight : 700;
  border : none;
  outline : 1px solid #dcdcdc;
  outline-offset : -1px;
  border-radius : 0.25rem;
  color : #303030;
  display : flex;
  gap : 0.5rem;
  justify-content : center;
  align-items : center;
  line-height : 1.5rem;
  transition : 200ms;
  &:hover {
    cursor : pointer;
    background-color : #f0f0f0;
  }
`

const StRegisterRecommend = styled.div`
  font-size : 0.75rem;
  font-weight : 400;
  color : #303030;
  margin-top : 2rem;
  margin-left : auto;
  margin-right : auto;
`

const StRegisterRecommendLink = styled(Link)`
  font-size : 0.75rem;
  font-weight : 700;
  margin-left : 0.5rem;
  color : #007aff;
  text-decoration-line : none;
  transition : 200ms;
  &:visited {
    text-decoration-line : none;
  }
  &:hover {
    cursor : pointer;
    color : #429dff;
  }
`

const StValidationText = styled.div`
  font-size : 0.75rem;
  font-weight : 700;
  color : #ff3b30;
`
