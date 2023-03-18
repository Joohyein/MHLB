import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { sendResetPasswordEmail } from "../api/auth";
import { validateEmailCheck } from "../api/general";
import Wrapper from "../components/common/Wrapper";
import useDebounce from "../hooks/useDebounce";
import useInput from "../hooks/useInput";
import useInputRefFocus from "../hooks/useInputRefFocus";
import useIsLogin from "../hooks/useIsLogin";

const ResetPasswordSendEmail = () => {

    const isLogin = useIsLogin();
    const navigate = useNavigate();

    useEffect(() => {
        if(isLogin === true) return navigate('/select-workspace');
    }, [isLogin])    

    const [emailValue, setEmailValue, clearEmailValue] = useInput();

    const [emailInputRef, emailInputRefFocus] = useInputRefFocus();

    const duplicateEmail = useDebounce(emailValue, 1000);

    const [allowedEmailValidation, setAllowedEmailValidation] = useState(false);
    const [emptyValidation, setEmptyValidation] = useState(false);
    const [emailFormValidation, setEmailFormValidation] = useState(false);
    const [isEmailInput, setIsEmailInput] = useState(false);
    const [duplicateEmailValidation, setDuplicateEmailValidation] = useState(false);
    const [allowEmailMessage, setAllowEmailMessage] = useState(false);
    const [errorMessageToggle, setErrorMessageToggle] = useState(false);

    const [enableSendEmail, setEnableSendEmail] = useState(false);
    const [disableEmail, setDisableEmail] = useState(true);

    const onClickFindPassword = () => {
        if (!emailValue) {
            setEmptyValidation(true);
        } else if (!(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}|\.[a-z]{2,3}\.[a-z]{2,3}/g).test(emailValue)) {
            setEmailFormValidation(true);
        } else {
            if (enableSendEmail) {
                setDisableEmail(false);
                sendResetPasswordEmail({email : emailValue})
                .then((res) => {
                    setDisableEmail(true);
                    navigate('/reset-password-sent');
                })
                .catch((error) => {
                    setDisableEmail(true);
                    setErrorMessageToggle(true);
                })
            }
        }
    };

    useEffect(() => {
        if (allowedEmailValidation) {
            if (isEmailInput) {
                if ((/[a-z0-9]+@[a-z]+\.[a-z]{2,3}|\.[a-z]{2,3}\.[a-z]{2,3}/g).test(emailValue)) {
                    validateEmailCheck({email : duplicateEmail})
                    .then((res) => {
                    setDuplicateEmailValidation(true);
                    setEnableSendEmail(true);
                    })
                    .catch((error) => {
                    setDuplicateEmailValidation(false);
                    setAllowEmailMessage(true);
                    setEnableSendEmail(false);
                    });
                }
            }
        }
    }, [duplicateEmail]);

    const clearWarningMessage = () => {
        setAllowedEmailValidation(true);
        setIsEmailInput(false);
        setEmptyValidation(false);
        setEmailFormValidation(false);
        setErrorMessageToggle(false);
      };

    return (
        <Wrapper>
            <StBackground>
                <StContainer>
                    <StPageTitle>비밀번호 찾기</StPageTitle>
                    <StPageSubTitle>비밀번호 재설정 메일을 받아보세요!</StPageSubTitle>
                    <StInputLabel htmlFor = 'email' isFocus = {emailInputRefFocus}>이메일</StInputLabel>
                    <StInput type = {'text'} ref = {emailInputRef} id = 'email' value = {emailValue} onChange = {(e) => {setEmailValue(e); clearWarningMessage(); setIsEmailInput(true); setDuplicateEmailValidation(false); setAllowEmailMessage(false)}} placeholder = 'Email'/>
                    {duplicateEmailValidation ? <StValidationTextSucceed>이 이메일로 비밀번호 재설정 메일을 보낼 수 있습니다.</StValidationTextSucceed> : allowedEmailValidation && allowEmailMessage ? <StValidationText>이메일이 존재하지 않으므로 보낼 수 없습니다.</StValidationText> : null}
                    {emailFormValidation ? <StValidationText>이메일 형식을 확인해주세요.</StValidationText> : null}
                    {emptyValidation ? <StValidationText>이메일을 입력해주세요.</StValidationText> : null}
                    {errorMessageToggle ? <StValidationText>오류가 발생했습니다. 다시 시도해주세요.</StValidationText> : null}
                    {disableEmail ? <StActivatedButton onClick = {() => {onClickFindPassword()}}>비밀번호 재설정 메일 보내기</StActivatedButton> : <StDeactivatedButton>비밀번호 재설정 메일 보내기</StDeactivatedButton>}
                    {disableEmail ? null : <StValidationInfo>로딩 중...</StValidationInfo>}
                </StContainer>
            </StBackground>
        </Wrapper>
    );
};

export default ResetPasswordSendEmail;

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

const StActivatedButton = styled.button`
  margin-top : 1rem;
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

const StDeactivatedButton = styled.button`
  margin-top : 1rem;
  background-color : #7f7f7f;
  width : 100%;
  height : 35px;
  font-size : 1rem;
  font-weight : 700;
  border : none;
  border-radius : 0.25rem;
  color : white;
  line-height : 1.5rem;
  transition : 200ms;
  cursor : not-allowed;
`

const StValidationText = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: #ff3b30;
`;

const StValidationTextSucceed = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: #007aff;
`;

const StValidationInfo = styled.div`
  font-size : 0.75rem;
  font-weight : 400;
  color : #303030;
  margin-top : 0.5rem;
`;