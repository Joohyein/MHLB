import { useState } from "react";
import styled from "styled-components";

function MyWorkspace({setLeaveModal, dataWorkspace, setWorkspaceId}:{setLeaveModal:(v: boolean) => void, dataWorkspace: [], setWorkspaceId:(v: number)=>void}) {

    const leaveModalOpenHandler = (workspaceId: number) => {
    setLeaveModal(true);
    setWorkspaceId(workspaceId);
    document.body.style.overflow = "hidden";
    }

  return (
    <StWorkspaceBox>
      {
        dataWorkspace?.map((item:any) => {
          return (
            <StWorkspaceData key={item.workspaceId}>
              <StWorkspaceDataBox>
                <StWorkspaceImg src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'/>
                <StContributionBox>
                <h3>{item.workspaceTitle}에서의 나의 기여도</h3>
                <StContribution>
                    <StDone></StDone>
                    <StRemain></StRemain>
                </StContribution>
                </StContributionBox>
              </StWorkspaceDataBox>
              <StWithdrawBtn onClick={() => leaveModalOpenHandler(item.workspaceId)}>워크스페이스 탈퇴</StWithdrawBtn>
          </StWorkspaceData>

          )
        })
      }
    </StWorkspaceBox>
  )
}

export default MyWorkspace;

const StWorkspaceBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const StWorkspaceData = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;
const StWorkspaceDataBox = styled.div`
  display: flex;
  gap: 24px;
`;
const StWorkspaceImg = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;
const StContributionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  h3 {
  font-size: 16px;
  font-weight: 400;
  }
`;

const StContribution = styled.div`
  width: 512px;
  height: 12px;
  display: flex;
`;
const StDone = styled.div`
  width: 70%;
  height: 100%;
  background-color: #0F82FF;
`;
const StRemain = styled.div`
  width: 30%;
  height: 100%;
  background-color: #D9D9D9;
`;
const StWithdrawBtn = styled.button`
  
`;