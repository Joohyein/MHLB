import styled from "styled-components";
import NavBarLanding from "../components/common/NavBarLanding";
import Wrapper from "../components/common/Wrapper";
import Intro from "../components/landing/Intro";
import Slider from "../components/landing/slider/Slider";
import { useState, useEffect } from "react";
import ArrowUp from "../components/asset/icons/ArrowUp";

const Landing = () => {
  const [showBtn, setShowBtn] = useState(false);

  const onClickScrollTop = () => {
    window.scrollTo({top: 0, behavior:'smooth'});
  };
  useEffect(() => {
    const onShowBtn = () => {
      if(window.scrollY > 256) setShowBtn(true);
      else setShowBtn(false);
    }
    window.addEventListener('scroll', onShowBtn);
    return () => {window.removeEventListener('scroll', onShowBtn)};
  }, []);

  window.onload = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
  };

  return (
    <Wrapper>
      <Intro />
      <Slider />
      { showBtn && <StScrollTopBtn onClick={onClickScrollTop}>
        <ArrowUp size="32" fill="#707070" cursor="pointer" />
      </StScrollTopBtn>}
    </Wrapper>
  );
};

export default Landing;

const StScrollTopBtn = styled.button`
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : center;
  width : 48px;
  height : 48px;
  border-radius : 64px;
  border: none;
  background-color : white;
  box-shadow : 0px 0px 1rem rgba(0, 0, 0, 0.1);
  position : fixed;
  bottom : 24px;
  right : 24px;
  z-index: 999;
  cursor : pointer;
`;