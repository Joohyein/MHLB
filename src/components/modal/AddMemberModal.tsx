import styled from "styled-components";
import Close from "../asset/icons/Close";
import { useState } from "react";

function AddMemberModal({modalRef, setInviteModal}:{modalRef:React.MutableRefObject<any>, setInviteModal:(v:boolean)=>void}) { 
    
  return <StBackgroundContainer>
    <StModalContainer ref={modalRef}>
        <StTitle>
            <h3>멤버 초대하기</h3>
            <Close size="24" fill="#363636" onClick={()=>setInviteModal(false)} cursor="pointer"/>
        </StTitle>
        <StInputContainer>

        </StInputContainer>

        <StSub>초대 중인 멤버</StSub>

        <StInviting>
            <StMember>
            <StUserProfile></StUserProfile>
            <StUser>
                <h3>김코코</h3>
                <h5>coco@gmail.com</h5>
            </StUser>
            </StMember>
            <StCancelBtn>초대 취소</StCancelBtn>
        </StInviting>
    </StModalContainer>
</StBackgroundContainer>
}

export default AddMemberModal;

const StBackgroundContainer = styled.div`
    width: 100%;
    overflow: hidden;
    position: fixed;
    background-color: rgba(0,0,0,0.25);
`;
const StModalContainer = styled.div`
  width: 500px;
  height: 500px;
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;

  border: 3px solid gray;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
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
const StUserProfile = styled.div`
  background-color: whitesmoke;
  box-shadow: 0px 0px 5px 0px lightgray;
  border-radius: 8px;
  width: 32px;
  height: 32px;
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