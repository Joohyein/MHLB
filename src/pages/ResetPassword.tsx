import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { resetPassword } from "../api/auth";
import Wrapper from "../components/common/Wrapper";
import useInput from "../hooks/useInput";
import useInputRefFocus from "../hooks/useInputRefFocus";
import useIsLogin from "../hooks/useIsLogin";

const ResetPassword = () => {

    const isLogin = useIsLogin();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin === true) return navigate("/select-workspace");
    }, [isLogin]);

    const params = useParams();

    const [passwordValue, setPasswordValue, clearPasswordValue] = useInput();
    const [passwordCheckValue, setPasswordCheckValue, clearPasswordCheckValue] = useInput();

    const [passwordInputRef, passwordInputRefFocus] = useInputRefFocus();
    const [passwordCheckInputRef, passwordCheckInputRefFocus] = useInputRefFocus();

    const [emptyValidation, setEmptyValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);
    const [passwordFormValidation, setPasswordFormValidation] = useState(false);
    const [passwordCheckValidation, setPasswordCheckValidation] = useState(false);
    const [passwordMatchValidation, setPasswordMatchValidation] = useState(false);

    useEffect(() => {
      if (passwordValue === '') return;
      if (!(passwordValue.length >= 8 && passwordValue.length <= 20 && passwordValue.search(/[0-9]/g) >= 0 && passwordValue.search(/[a-z]/g) >= 0 && passwordValue.search(/[A-Z]/g) >= 0)) {
        setPasswordFormValidation(true);
      } else {
        setPasswordFormValidation(false);
      }
    }, [passwordValue])

    const onEnterKeyDownPassword = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            passwordCheckInputRef.current.focus();
        }
    }

    const onEnterKeyDownPasswordCheck = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickResetPassword();
        }
    }

    const onClickResetPassword = () => {
        if (!passwordValue && !passwordCheckValue) {
            setEmptyValidation(true);
        } else if (!passwordValue) {
            setPasswordValidation(true);
            setPasswordFormValidation(false);
        } else if (!passwordCheckValue) {
            setPasswordCheckValidation(true);
        } else if (!(passwordValue === passwordCheckValue)) {
            setPasswordMatchValidation(true);
        } else {
            resetPassword(params.uuid, {password : passwordValue})
            .then((res) => {
                navigate('/reset-password-succeed')
            })
        }
    }

    const clearWarningMessage = () => {
        setEmptyValidation(false);
        setPasswordValidation(false);
        setPasswordCheckValidation(false);
        setPasswordMatchValidation(false);
    }

    return (
        <Wrapper>
            <StBackground>
                <StContainer>
                    <StPageTitle>비밀번호 재설정</StPageTitle>
                    <StPageSubTitle>새로운 비밀번호를 설정해주세요.</StPageSubTitle>
                    <StInputLabel htmlFor="password" isFocus = {passwordInputRefFocus}>비밀번호*</StInputLabel>
                    <StInput type={"password"} onKeyDown={(e) => onEnterKeyDownPassword(e)} ref={passwordInputRef} id="password" value={passwordValue} onChange={(e) => {setPasswordValue(e); clearWarningMessage();}} placeholder="Password"/>
                    <StValidationInfo>글자수 8~20자, 알파벳 대문자, 소문자, 숫자를 반드시 포함해주세요.</StValidationInfo>
                    <StValidationTextDiv>
                      {passwordValidation ? <StValidationText>비밀번호를 입력해주세요.</StValidationText> : null}
                      {passwordFormValidation ? <StValidationText>비밀번호 형식을 맞춰주세요.</StValidationText> : null}
                    </StValidationTextDiv>
                    <StInputLabel htmlFor="passwordCheck" isFocus = {passwordCheckInputRefFocus} >비밀번호 확인*</StInputLabel>
                    <StInput type={"password"} onKeyDown={(e) => onEnterKeyDownPasswordCheck(e)} ref={passwordCheckInputRef} id="passwordCheck" value={passwordCheckValue} onChange={(e) => {setPasswordCheckValue(e); clearWarningMessage();}} placeholder="Password Check"/>
                    <StValidationTextDiv>
                      {emptyValidation ? <StValidationText>모든 정보를 입력해주세요.</StValidationText> : null}
                      {passwordCheckValidation ? <StValidationText>비밀번호 확인을 입력해주세요.</StValidationText> : null}
                      {passwordMatchValidation ? <StValidationText>비밀번호가 일치하지 않습니다.</StValidationText> : null}
                    </StValidationTextDiv>
                    <StResetPasswordButton onClick={() => {onClickResetPassword();}}>비밀번호 변경하기</StResetPasswordButton>
                </StContainer>
            </StBackground>
        </Wrapper>
    );
};

export default ResetPassword;

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
`

const StInputLabel = styled.label`
  font-size : 1rem;
  font-weight : 600;
  margin-top : 32px;
  margin-bottom : 0.5rem;
  transition : 200ms;
  color : ${(props : {isFocus : boolean}) => props.isFocus ? "#007aff" : "#303030"};
`

const StInput = styled.input`
  width : 100%;
  height : 42px;
  margin-bottom : 8px;
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

const StResetPasswordButton = styled.button`
  margin-top : 48px;
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

const StValidationTextDiv = styled.div`
  position : relative;
  width : 100%;
`

const StValidationText = styled.div`
  font-size : 0.75rem;
  font-weight : 400;
  color : #ff3b30;
  position : absolute;
  top : 0;
`

const StValidationInfo = styled.div`
  font-size : 0.75rem;
  font-weight : 400;
  color : #303030;
  margin-bottom : 4px;
`