import styled from "styled-components";
import Close from "../asset/icons/Close";

function AddMemberModal({modalRef, setInviteModal}:{modalRef:React.MutableRefObject<any>, setInviteModal:(v:boolean)=>void}) { 
    
  return (
    <StWrap>
      <StModalContainer ref={modalRef}>
          <StTitle>
              <h3>멤버 초대하기</h3>
              <Close size="24" fill="#363636" onClick={()=>setInviteModal(false)} cursor="pointer"/>
          </StTitle>
          <StInputContainer>
              <StInputBox type="email" />
              <StInviteBtn>초대 보내기</StInviteBtn>
          </StInputContainer>

          <StSub>초대 중인 사람</StSub>

          <StInviting>
              <StMember>
              <StUser>
                  <h3>김코코</h3>
                  <h5>coco@gmail.com</h5>
              </StUser>
              </StMember>
              <StCancelBtn>초대 취소</StCancelBtn>
          </StInviting>
      </StModalContainer>
    </StWrap>
  )
}

export default AddMemberModal;

const StWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0,0,0,0.3);
`;
const StModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 512px;
    z-index: 999;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;

    border: 3px solid gray;
    padding: 20px;
    box-sizing: border-box;
`;
const StTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {

    }
    div {
    font-size: 32px;
    cursor: pointer;
    }
`;

const StSub = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: gray;
`;
const StInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;
const StInputBox = styled.input`
    width: 70%;
    height: 24px;
`;
const StInviteBtn = styled.button`
    width: 30%;
    border: none;
    cursor: pointer;
`;

const StInviting = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StMember = styled.div`
  display: flex;
  gap: 12px;
`;
const StUser = styled.div`
  display: flex;
  flex-direction: column;
  h5 {
    color: gray;
  }
`;
const StCancelBtn = styled.button`
  cursor: pointer;
`;