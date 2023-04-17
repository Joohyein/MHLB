import styled from "styled-components";
import NavBarLanding from "../components/common/NavBarLanding";
import Wrapper from "../components/common/Wrapper";
import Intro from "../components/landing/Intro";
import Slider from "../components/landing/slider/Slider";
import { useState, useEffect } from "react";
import ArrowUp from "../components/asset/icons/ArrowUp";
import { logEvent } from "../util/amplitude";
import TryZone from "../components/landing/TryZone";
import Footer from "../components/landing/Footer";
import { motion } from "framer-motion";

const Landing = () => {
  const [showBtn, setShowBtn] = useState(false);

  const onClickScrollTop = () => {
    logEvent('Scroll to top button', {from: 'Landing page'});
    window.scrollTo({top: 0, behavior:'smooth'});
  };
  useEffect(() => {
    logEvent('Enter Landing page', {from: 'Landing page'});
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

  const container = {
    hidden: { opacity: 1, scale: 0},
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.3
      }
    }
  };
  const item = {
    hidden: {y:30, opacity: 0},
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <Wrapper>
      <StBox variants={container} initial="hidden" animate="visible">
        {
          [0,1,2].map((index) => (
            <StTmp key={index} variants={item}>
              {index === 0 && <StTitle>누구나, 쉽게, 온라인 현황 공유</StTitle>}
              {index === 1 && <StCopyDesc>
                <h3>프리랜서, 재택 근무, 온라인 협업을 하시는 분들의</h3>
                <h3>업무 현황을 쉽게 확인할 수 있습니다.</h3>
              </StCopyDesc>}
              {index === 2 && <Slider />}
            </StTmp>
          ))
        }
      </StBox>
      <TryZone />
      <Footer />
      { showBtn && <StScrollTopBtn onClick={onClickScrollTop}>
        <ArrowUp size="32" fill="#707070" cursor="pointer" />
      </StScrollTopBtn>}
    </Wrapper>
  );
};

export default Landing;

const StBox = styled(motion.ul)`
  width: 100%;
  height: 100%;
  margin: 192px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StTmp = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StTitle = styled.h3`
  font-size: 64px;
  font-weight: 900;
  margin-bottom : 18px;
`;

 const StCopyDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 212px;
  h3 {
    font-size: 32px;
    font-weight: 400;
    line-height: 48px;
  };
 `;

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