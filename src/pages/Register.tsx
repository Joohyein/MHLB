import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Wrapper from "../components/common/Wrapper";
import useInput from "../hooks/useInput";
import useInputRefFocus from "../hooks/useInputRefFocus";
import useIsLogin from "../hooks/useIsLogin";
import useDebounce from "../hooks/useDebounce";
import { duplicateEmailCheck } from "../api/general";
import GoogleSocialIcon from "../components/asset/icons/GoogleSocialIcon";
import { register } from "../api/auth";

const Register = () => {
  const isLogin = useIsLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin === true) return navigate("/select-workspace");
  }, [isLogin]);

  const [emailValue, setEmailValue, clearEmailValue] = useInput();
  const [passwordValue, setPasswordValue, clearPasswordValue] = useInput();
  const [passwordCheckValue, setPasswordCheckValue, clearPasswordCheckValue] = useInput();
  const [nameValue, setNameValue, clearNameValue] = useInput();
  const [jobValue, setJobValue, clearJobValue] = useInput();
  const [descValue, setDescValue, clearDescValue] = useInput();

  const [isEmailForm, setIsEmailForm] = useState(false);

  const duplicateEmail = useDebounce(emailValue, 1000);
  const [duplicateEmailValidation, setDuplicateEmailValidation] = useState(false);
  const [allowedEmailValidation, setAllowedEmailValidation] = useState(false);
  const [allowEmailMessage, setAllowEmailMessage] = useState(false);
  const [isEmailInput, setIsEmailInput] = useState(false);

  useEffect(() => {
    if (allowedEmailValidation) {
      if (isEmailInput) {
        duplicateEmailCheck({email : duplicateEmail})
        .then((res) => {
          setDuplicateEmailValidation(false);
          if ((/[a-z0-9]+@[a-z]+\.[a-z]{2,3}|\.[a-z]{2,3}\.[a-z]{2,3}/g).test(emailValue)) {
            setAllowEmailMessage(true);
          }
        })
        .catch((error) => {
          setDuplicateEmailValidation(true);
        });
      }
    }
  }, [duplicateEmail]);

  const [emailInputRef, emailInputRefFocus] = useInputRefFocus();
  const [passwordInputRef, passwordInputRefFocus] = useInputRefFocus();
  const [passwordCheckInputRef, passwordCheckInputRefFocus] = useInputRefFocus();
  const [nameInputRef, nameInputRefFocus] = useInputRefFocus();
  const [jobInputRef, jobInputRefFocus] = useInputRefFocus();
  const [descInputRef, descInputRefFocus] = useInputRefFocus();
  const registerButtonRef = useRef<HTMLButtonElement>(null);

  const [emptyValidation, setEmptyValidation] = useState(false);
  const [emailFormValidation, setEmailFormValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [passwordFormValidation, setPasswordFormValidation] = useState(false);
  const [passwordCheckValidation, setPasswordCheckValidation] = useState(false);
  const [passwordMatchValidation, setPasswordMatchValidation] = useState(false);
  const [nameValidation, setNameValidation] = useState(false);

  const onEnterKeyDownEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      passwordInputRef.current.focus();
    }
  };

  const onEnterKeyDownPassword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      passwordCheckInputRef.current.focus();
    }
  };

  const onEnterKeyDownPasswordCheck = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      onClickContinue();
    }
  };

  const onEnterKeyDownName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      jobInputRef.current.focus();
    }
  };

  const onEnterKeyDownJob = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      descInputRef.current.focus();
    }
  };

  const onEnterKeyDownDesc = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickRegister();
    }
  };

  const onClickContinue = () => {
    if (!emailValue && !passwordValue) {
      setEmptyValidation(true);
    } else if (!emailValue) {
      setEmailValidation(true);
    } else if (!(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}|\.[a-z]{2,3}\.[a-z]{2,3}/g).test(emailValue)) {
      setEmailFormValidation(true);
    } else if (!passwordValue) {
      setPasswordValidation(true);
    } else if (!(passwordValue.length >= 8 && passwordValue.length <= 20 && passwordValue.search(/[0-9]/g) >= 0 && passwordValue.search(/[a-z]/g) >= 0 && passwordValue.search(/[A-Z]/g) >= 0)) {
      setPasswordFormValidation(true);
    } else if (!passwordCheckValue) {
      setPasswordCheckValidation(true);
    } else if (!(passwordValue === passwordCheckValue)) {
      setPasswordMatchValidation(true);
    } else {
      if (allowEmailMessage === true) {
        setIsEmailForm(true);
      }
    }
  };

  const onClickRegister = () => {
    if (!nameValue) {
      setNameValidation(true);
    } else {
      register({email: emailValue, password: passwordValue, userName: nameValue, userImage: "temp", userJob: jobValue, userDesc: descValue})
      .then((res) => {
        navigate('/celebrate-sign-up');
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const clearWarningMessage = () => {
    setAllowedEmailValidation(true);
    setEmptyValidation(false);
    setEmailFormValidation(false);
    setEmailValidation(false);
    setPasswordValidation(false);
    setPasswordFormValidation(false);
    setPasswordCheckValidation(false);
    setPasswordMatchValidation(false);
    setNameValidation(false);
  };

  return (
    <Wrapper>
      <StBackground>
        <StContainer>
          <StPageTitle>회원가입</StPageTitle>
          {!isEmailForm
          ? (<>
              <StPageSubTitle>이메일과 비밀번호를 입력해주세요!</StPageSubTitle>
              <StInputLabel htmlFor="email" isFocus={emailInputRefFocus}>이메일*</StInputLabel>
              <StInput type={"text"} onKeyDown={(e) => onEnterKeyDownEmail(e)} ref={emailInputRef} id="email" value={emailValue} onChange={(e) => {setEmailValue(e); clearWarningMessage(); setIsEmailInput(true); setAllowEmailMessage(false); setDuplicateEmailValidation(false);}} placeholder="Email"/>
              <StValidationTextDiv>
                {emailValidation ? <StValidationText>이메일을 입력해주세요.</StValidationText> : null}
                {emailFormValidation ? <StValidationText>이메일 형식을 확인해주세요.</StValidationText> : null}
                {duplicateEmailValidation ? <StValidationText>해당 이메일이 이미 존재합니다.</StValidationText> : allowedEmailValidation && allowEmailMessage ? <StValidationTextSucceed>사용할 수 있는 이메일입니다.</StValidationTextSucceed> : null}
              </StValidationTextDiv>
              <StInputLabel htmlFor="password" isFocus={passwordInputRefFocus}>비밀번호*</StInputLabel>
              <StInput type={"password"} onKeyDown={(e) => onEnterKeyDownPassword(e)} ref={passwordInputRef} id="password" value={passwordValue} onChange={(e) => {setPasswordValue(e); clearWarningMessage();}} placeholder="Password"/>
              <StValidationInfo>글자수 8~20자, 알파벳 대문자, 소문자, 숫자를 반드시 포함해주세요.</StValidationInfo>
              <StValidationTextDiv>
                {passwordValidation ? <StValidationText>비밀번호를 입력해주세요.</StValidationText> : null}
                {passwordFormValidation ? <StValidationText>비밀번호 형식을 맞춰주세요.</StValidationText> : null}
              </StValidationTextDiv>
              <StInputLabel htmlFor="passwordCheck" isFocus={passwordCheckInputRefFocus}>비밀번호 확인*</StInputLabel>
              <StInput type={"password"} onKeyDown={(e) => onEnterKeyDownPasswordCheck(e)} ref={passwordCheckInputRef} id="passwordCheck" value={passwordCheckValue} onChange={(e) => {setPasswordCheckValue(e); clearWarningMessage();}} placeholder="Password Check"/>
              <StValidationTextDiv>
                {passwordCheckValidation ? <StValidationText>비밀번호 확인을 입력해주세요.</StValidationText> : null}
                {emptyValidation ? <StValidationText>모든 정보를 입력해주세요.</StValidationText> : null}
                {passwordMatchValidation ? <StValidationText>비밀번호가 일치하지 않습니다.</StValidationText> : null}
              </StValidationTextDiv>
              <StRegisterButton ref={registerButtonRef} onClick={() => {onClickContinue();}}>회원가입 계속하기</StRegisterButton>
              <StOrDiv>
                <StHrTag />
                <StOrText>or</StOrText>
                <StHrTag />
              </StOrDiv>
              <StGoogleRegisterButton><GoogleSocialIcon />Google로 계속하기</StGoogleRegisterButton>
              <StLoginRecommend>이미 계정이 있으신가요?<StLoginRecommendLink to="/login">로그인 하러가기</StLoginRecommendLink></StLoginRecommend>
            </>
          )
          : (<>
              <StPageSubTitle>정보를 기입해주세요!</StPageSubTitle>
              <StInputLabel htmlFor="name" isFocus={nameInputRefFocus}>이름*</StInputLabel>
              <StInput type={"text"} onKeyDown={(e) => onEnterKeyDownName(e)} ref={nameInputRef} id="name" value={nameValue} onChange={(e) => {setNameValue(e); clearWarningMessage();}} placeholder="Name"/>
              <StValidationTextDiv>
                {nameValidation ? (<StValidationText>이름을 입력해주세요.</StValidationText>) : null}
              </StValidationTextDiv>
              <StInputLabel htmlFor="job" isFocus={jobInputRefFocus}>직업</StInputLabel>
              <StInput type={"text"} onKeyDown={(e) => onEnterKeyDownJob(e)} ref={jobInputRef} id="job" value={jobValue} onChange={(e) => {setJobValue(e); clearWarningMessage();}} placeholder="Job - Default value : White collar"/>
              <StInputLabel htmlFor="desc" isFocus={descInputRefFocus}>자기소개</StInputLabel>
              <StInput type={"text"} onKeyDown={(e) => onEnterKeyDownDesc(e)} ref={descInputRef} id="desc" value={descValue} onChange={(e) => {setDescValue(e); clearWarningMessage();}} placeholder="Desciption - Default value : Hello!"/>
              <StRegisterButton ref={registerButtonRef} onClick={() => {onClickRegister();}}>회원가입 계속하기</StRegisterButton>
            </>
          )}
        </StContainer>
      </StBackground>
    </Wrapper>
  );
};

export default Register;

const StBackground = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
`;

const StContainer = styled.div`
  width: 464px;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 4rem;
  box-sizing: border-box;
`;

const StPageTitle = styled.div`
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 0.25rem;
`;

const StPageSubTitle = styled.div`
  font-size: 1rem;
  font-weight: 200;
`;

const StInputLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  transition: 200ms;
  color: ${(props: { isFocus: boolean }) =>
    props.isFocus ? "#007aff" : "#303030"};
`;

const StInput = styled.input`
  width: 100%;
  height: 42px;
  margin-bottom : 0.5rem;
  border: none;
  outline: 1px solid #dbdbdb;
  outline-offset: -1px;
  border-radius: 0.25rem;
  padding: 1rem;
  box-sizing: border-box;
  font-weight: 400;
  transition: 200ms;
  &:placeholder {
    color: #d0d0d0;
  }
  &:focus {
    color: #007aff;
    outline: 1px solid #007aff;
  }
`;

const StRegisterButton = styled.button`
  background-color: #007aff;
  width: 100%;
  height: 35px;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  border-radius: 0.25rem;
  color: white;
  line-height: 1.5rem;
  transition: 200ms;
  margin-top : 32px;
  &:hover {
    cursor : pointer;
    background-color: #429dff;
  }
`;

const StOrDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
`;

const StOrText = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #c7c7c7;
  margin: 0 0.5rem;
`;

const StHrTag = styled.hr`
  flex-grow: 1;
  height: 1px;
  background: #e1e1e1;
  border: none;
`;

const StGoogleRegisterButton = styled.button`
  background-color: white;
  width: 100%;
  height: 35px;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  outline: 1px solid #dcdcdc;
  outline-offset: -1px;
  border-radius: 0.25rem;
  color: #303030;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  line-height: 1.5rem;
  transition: 200ms;
  &:hover {
    cursor : pointer;
    background-color: #f0f0f0;
  }
`;

const StLoginRecommend = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  color: #303030;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
`;

const StLoginRecommendLink = styled(Link)`
  font-size: 0.75rem;
  font-weight: 700;
  margin-left: 0.5rem;
  color: #007aff;
  text-decoration-line: none;
  transition: 200ms;
  &:visited {
    text-decoration-line: none;
  }
  &:hover {
    cursor : pointer;
    color: #429dff;
  }
`;

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

const StValidationTextSucceed = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  color: #007aff;
  position : absolute;
  top : 0;
`;

const StValidationInfo = styled.div`
  font-size : 0.75rem;
  font-weight : 400;
  color : #303030;
  margin-bottom : 4px;
`