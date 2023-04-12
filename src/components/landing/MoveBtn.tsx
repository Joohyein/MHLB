import { useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function MoveBtn() {
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
    "linear-gradient(180deg, #4da3ff 0%, rgb(127, 81, 255) 100%)",
    "linear-gradient(180deg, #007aff 0%, rgb(68, 0, 255) 100%)",
  ]);
  const color = useTransform(x, xInput, [
    "rgb(211, 9, 225)",
    "#007aff",
    "rgb(3, 209, 0)"
  ]);
  const tickPath = useTransform(x, [10, 100], [0, 1]);
  const crossPathA = useTransform(x, [-10, -55], [0, 1]);
  const crossPathB = useTransform(x, [-50, -100], [0, 1]);

  useMotionValueEvent(x, "animationStart", () => {
    if(x.get() > 100) navigate('/register')
  });
  
  return (
    <StContainer style={{ background }}>
      <StMoveToDesc>오른쪽으로 드래그해서 회원가입 하러가기</StMoveToDesc>
      <StBox>
        <StMoveToBtn
          style={{ x }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
        >
          <StSvg viewBox="0 0 50 50">
            <StCircle
              fill="none"
              strokeWidth="3"
              stroke={color}
              d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
              style={{translateX:5, translateY:5}}
            />
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M14,26 L 22,33 L 35,16"
              strokeDasharray="0 1"
              style={{ pathLength: tickPath }}
            />
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M17,17 L33,33"
              strokeDasharray="0 1"
              style={{ pathLength: crossPathA }}
            />
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M33,17 L17,33"
              strokeDasharray="0 1"
              style={{ pathLength: crossPathB }}
            />
          </StSvg>
        </StMoveToBtn>
      </StBox>
    </StContainer>
  );
}

export default MoveBtn;

const StContainer = styled(motion.div)`
  width: 1040px;
  height: 386px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const StMoveToDesc = styled.div`
  margin-top: 36px;
  font-size: 28px;
  color: white;
`;
const StBox = styled.div`
  width: 100%;
  height: 100%;
`;
const StMoveToBtn = styled(motion.div)`
  background: white;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  position: absolute;
  top: calc(50% - 150px / 2);
  left: calc(50% - 150px / 2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StSvg = styled(motion.svg)`
  width: 80%;
  height: 80%;
  cursor: pointer;
`;

const StCircle = styled(motion.path)`

`;