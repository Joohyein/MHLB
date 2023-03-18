import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      CelebrateSignUp
    </Wrapper>
  );
};

export default CelebrateSignUp;