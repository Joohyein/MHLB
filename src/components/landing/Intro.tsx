import styled from "styled-components";
import MoveBtn from "./MoveBtn";
import { motion } from "framer-motion";

function Intro() {

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
    <StContainer>
      <StCopyBox variants={container} initial="hidden" animate="visible">
        {
          [0,1,2].map((index) => (
            <StTmp key={index} variants={item}>
              {index === 0 && <StTitle>편리한 상태 관리 서비스</StTitle>}
              {index === 1 && <StCopyDesc>
                <h3>Pin me는 편리한 상태 관리를 제공하는 서비스입니다</h3>
                <h3>내가 어떤 상태인지 드래그 한 번으로!</h3>
                <h3>저희 서비스를 처음 사용하신다면 아래 서비스 설명을 참고해 주세요</h3>
              </StCopyDesc>}
              {index === 2 && <MoveBtn />}
            </StTmp>
          ))
        }
      </StCopyBox>
    </StContainer>
  )
}

export default Intro;

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 164px 0 264px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 56px;
`;
const StCopyBox = styled(motion.ul)`

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
  margin-bottom : 64px;
`;

 const StCopyDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom : 64px;
  h3 {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 12px;
  }
 `;