import React from 'react'
import styled from 'styled-components';
import Close from '../asset/icons/Close';

interface DataType  {
  workspaceDesc: string,
  workspaceId: number,
  workspaceImage: string,
  workspaceTitle: string
}
function LeaveWorkspaceModal({modalRef, setLeaveModal, dataWorkspace, myWorkspaceId}:{modalRef:React.MutableRefObject<any>, setLeaveModal: (v: boolean) => void, dataWorkspace: DataType[], myWorkspaceId: number}) {
  const myworkspace = dataWorkspace.filter(({workspaceId}) => workspaceId === myWorkspaceId)[0];

  return (
    <StWrap>
      <StModalContainer ref={modalRef}>
        <StTitle>
          <h3>워크스페이스 탈퇴</h3>
          <Close size="24px" fill="gray" onClick={()=>setLeaveModal(false)} cursor="pointer"/>
        </StTitle>

        <StWorkspaceDataBox>
          <StWorkspaceProfile src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'/>
          <StWorkspaceData>
            <h3>{myworkspace.workspaceTitle}</h3>
            <h5>워크스페이스에 대한 설명이 이곳에 들어갑니다.</h5>
          </StWorkspaceData>
        </StWorkspaceDataBox>

        <StWarnningText>
          <h3>워크스페이스에서 탈퇴하면 모든 기록이 삭제됩니다. 기록은 복구할 수 없고,</h3>
          <h3>관리자에게 다시 초대를 받지 않는 이상 재참여가 불가능합니다.</h3>
          <h5>이에 동의하고 탈퇴를 원하시면 "{myworkspace.workspaceTitle}"을 똑같이 입력해주세요.</h5>
        </StWarnningText>

        <StInputBox>
          <StInput />
          <StLeaveBtn>워크스페이스 탈퇴</StLeaveBtn>
        </StInputBox>
      </StModalContainer>
    </StWrap>
  )
}

export default LeaveWorkspaceModal;

const StWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0,0,0,0.3);
`;
const StModalContainer = styled.div`
  width: 512px;
  z-index: 999;
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 24px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: white;
  border: 3px solid lightgray;
  padding: 24px;
  box-sizing: border-box;
`;

const StTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-weight: 400;

  }
`;
const StWorkspaceDataBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const StWorkspaceProfile = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;
const StWorkspaceData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  h3 {
    font-size: 16px;
  }
  h5 {
    font-size: 12px;
    font-weight: 400;
  }
`;

const StWarnningText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  h3 {
    font-size: 12px;
    font-weight: 400;
  }
  h5 {
    font-size: 12px;
    color: gray; 
    font-weight: 400;
  }
`;

const StInputBox = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;
const StInput = styled.input`
  width: 70%;
  height: 32px;
  border: none;
  background-color: lightgray;
`;
const StLeaveBtn = styled.button`
  width: 30%;
  border: none;
`;