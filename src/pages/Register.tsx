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
  const [passwordCheckValue, setPasswordCheckValue, clearPasswordCheckValue] =
    useInput();
  const [nameValue, setNameValue, clearNameValue] = useInput();
  const [jobValue, setJobValue, clearJobValue] = useInput();
  const [descValue, setDescValue, clearDescValue] = useInput();

  const [isEmailForm, setIsEmailForm] = useState(false);

  const duplicateEmail = useDebounce(emailValue, 1000);

  useEffect(() => {
    duplicateEmailCheck(duplicateEmail)
      .then((res) => {
        console.log("yes");
      })
      .catch((error) => {
        console.log("no");
      });
  }, [duplicateEmail]);

  const [emailInputRef, emailInputRefFocus] = useInputRefFocus();
  const [passwordInputRef, passwordInputRefFocus] = useInputRefFocus();
  const [passwordCheckInputRef, passwordCheckInputRefFocus] =
    useInputRefFocus();
  const [nameInputRef, nameInputRefFocus] = useInputRefFocus();
  const [jobInputRef, jobInputRefFocus] = useInputRefFocus();
  const [descInputRef, descInputRefFocus] = useInputRefFocus();
  const registerButtonRef = useRef<HTMLButtonElement>(null);

  const [emptyValidation, setEmptyValidation] = useState(false);
  const [emailFormValidation, setEmailFormValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
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
    } else if (
      !(emailValue.includes("@") || emailValue.includes("@")
        ? emailValue.split("@")[1].includes(".")
        : null)
    ) {
      setEmailFormValidation(true);
    } else if (!passwordValue) {
      setPasswordValidation(true);
    } else if (!passwordCheckValue) {
      setPasswordCheckValidation(true);
    } else if (!(passwordValue === passwordCheckValue)) {
      setPasswordMatchValidation(true);
    } else {
      setIsEmailForm(true);
    }
  };

  const onClickRegister = () => {
    if (!nameValue) {
      setNameValidation(true);
    } else if (!passwordValue) {
      setPasswordValidation(true);
    } else {
      register({
        email: emailValue,
        password: passwordValue,
        userName: nameValue,
        userImage: "temp",
        userJob: jobValue,
        userDesc: descValue,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const clearWarningMessage = () => {
    setEmptyValidation(false);
    setEmailFormValidation(false);
    setEmailValidation(false);
    setPasswordValidation(false);
    setPasswordCheckValidation(false);
    setPasswordMatchValidation(false);
    setNameValidation(false);
  };

  return (
    <Wrapper>
      <StBackground>
        <StContainer>
          <StPageTitle>회원가입</StPageTitle>
          {!isEmailForm ? (
            <>
              <StPageSubTitle>이메일과 비밀번호를 입력해주세요!</StPageSubTitle>
              <StInputLabel htmlFor="email" isFocus={emailInputRefFocus}>
                이메일*
              </StInputLabel>
              <StInput
                type={"text"}
                onKeyDown={(e) => onEnterKeyDownEmail(e)}
                ref={emailInputRef}
                id="email"
                value={emailValue}
                onChange={(e) => {
                  setEmailValue(e);
                  clearWarningMessage();
                }}
                placeholder="Email"
              />
              {emailValidation ? (
                <StValidationText>이메일을 입력해주세요.</StValidationText>
              ) : null}
              {emailFormValidation ? (
                <StValidationText>이메일 형식을 확인해주세요.</StValidationText>
              ) : null}
              <StInputLabel htmlFor="password" isFocus={passwordInputRefFocus}>
                비밀번호*
              </StInputLabel>
              <StInput
                type={"password"}
                onKeyDown={(e) => onEnterKeyDownPassword(e)}
                ref={passwordInputRef}
                id="password"
                value={passwordValue}
                onChange={(e) => {
                  setPasswordValue(e);
                  clearWarningMessage();
                }}
                placeholder="Password"
              />
              {passwordValidation ? (
                <StValidationText>비밀번호를 입력해주세요.</StValidationText>
              ) : null}
              <StInputLabel
                htmlFor="passwordCheck"
                isFocus={passwordCheckInputRefFocus}
              >
                비밀번호 확인*
              </StInputLabel>
              <StInput
                type={"password"}
                onKeyDown={(e) => onEnterKeyDownPasswordCheck(e)}
                ref={passwordCheckInputRef}
                id="passwordCheck"
                value={passwordCheckValue}
                onChange={(e) => {
                  setPasswordCheckValue(e);
                  clearWarningMessage();
                }}
                placeholder="Password Check"
              />
              {passwordCheckValidation ? (
                <StValidationText>
                  비밀번호 확인을 입력해주세요.
                </StValidationText>
              ) : null}
              {emptyValidation ? (
                <StValidationText>모든 정보를 입력해주세요.</StValidationText>
              ) : null}
              {passwordMatchValidation ? (
                <StValidationText>
                  비밀번호가 일치하지 않습니다.
                </StValidationText>
              ) : null}
              <StRegisterButton
                ref={registerButtonRef}
                onClick={() => {
                  onClickContinue();
                }}
              >
                회원가입 계속하기
              </StRegisterButton>
              <StOrDiv>
                <StHrTag />
                <StOrText>or</StOrText>
                <StHrTag />
              </StOrDiv>
              <StGoogleRegisterButton>
                <GoogleSocialIcon />
                Google로 계속하기
              </StGoogleRegisterButton>
              <StLoginRecommend>
                이미 계정이 있으신가요?
                <StLoginRecommendLink to="/login">
                  로그인 하러가기
                </StLoginRecommendLink>
              </StLoginRecommend>
            </>
          ) : (
            <>
              <StPageSubTitle>정보를 기입해주세요!</StPageSubTitle>
              <StInputLabel htmlFor="name" isFocus={nameInputRefFocus}>
                이름*
              </StInputLabel>
              <StInput
                type={"text"}
                onKeyDown={(e) => onEnterKeyDownName(e)}
                ref={nameInputRef}
                id="name"
                value={nameValue}
                onChange={(e) => {
                  setNameValue(e);
                  clearWarningMessage();
                }}
                placeholder="Name"
              />
              {nameValidation ? (
                <StValidationText>이름을 입력해주세요.</StValidationText>
              ) : null}
              <StInputLabel htmlFor="job" isFocus={jobInputRefFocus}>
                직업
              </StInputLabel>
              <StInput
                type={"text"}
                onKeyDown={(e) => onEnterKeyDownJob(e)}
                ref={jobInputRef}
                id="job"
                value={jobValue}
                onChange={(e) => {
                  setJobValue(e);
                  clearWarningMessage();
                }}
                placeholder="Job - Default value : White collar"
              />
              <StInputLabel htmlFor="desc" isFocus={descInputRefFocus}>
                자기소개
              </StInputLabel>
              <StInput
                type={"text"}
                onKeyDown={(e) => onEnterKeyDownDesc(e)}
                ref={descInputRef}
                id="desc"
                value={descValue}
                onChange={(e) => {
                  setDescValue(e);
                  clearWarningMessage();
                }}
                placeholder="Desciption - Default value : Hello!"
              />
              <StRegisterButton
                ref={registerButtonRef}
                onClick={() => {
                  onClickRegister();
                }}
              >
                회원가입 계속하기
              </StRegisterButton>
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
  margin-bottom: 1rem;
`;

const StInputLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  transition: 200ms;
  color: ${(props: { isFocus: boolean }) =>
    props.isFocus ? "#007aff" : "#303030"};
`;

const StInput = styled.input`
  width: 100%;
  height: 42px;
  margin-bottom: 1rem;
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
  &:hover {
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
    color: #429dff;
  }
`;

const StValidationText = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: #ff3b30;
`;
