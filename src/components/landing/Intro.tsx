import styled from "styled-components";
import MoveBtn from "./MoveBtn";

function Intro() {
  
  return (
    <StContainer>
      <StCopyTitle>개편한 업무 현황 공유</StCopyTitle>
      <StCopyDesc>
        <h3>Pin me는 엄청나게 편리한 상태 관리를 제공하는 서비스입니다.</h3>
        <h3>내가 어떤 상태인지 드래그 한 번으로!</h3>
      </StCopyDesc>
      <MoveBtn />
    </StContainer>
  )
}

export default Intro;

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 164px 0 64px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 56px;
`;
const StCopyTitle = styled.h3`
  font-size: 64px;
  font-weight: 900;
`;
 const StCopyDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 32px;
    font-weight: 400;
  }
 `;
