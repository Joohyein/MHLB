import styled from "styled-components";
import MoveBtn from "./MoveBtn";
import { motion } from "framer-motion";

function Intro() {



  return (
    <StContainer>
      <StCopyBox>

      </StCopyBox>
    </StContainer>
  )
}

export default Intro;

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 192px 0 264px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  margin-bottom : 18px;
`;

 const StCopyDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 32px;
    font-weight: 400;
    line-height: 48px;
  };
 `;