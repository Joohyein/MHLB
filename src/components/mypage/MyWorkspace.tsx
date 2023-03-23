import styled from "styled-components";

interface WorkspaceDataType {
  workspaceId: number,
  workspaceTitle: string,
  workspaceImage: string,
  workspaceDesc: string
};
interface DataWorkspaceType {
  workspaceId: number,
  workspaceTitle: string,
  workspaceImage: string
  workspaceDesc:string,
};

function MyWorkspace({setLeaveModal, dataWorkspace, setWorkspaceId}:{setLeaveModal:(v: boolean) => void, dataWorkspace: DataWorkspaceType[], setWorkspaceId:(v: number)=>void}) {
  const leaveModalOpenHandler = (workspaceId: number) => {
    setLeaveModal(true);
    setWorkspaceId(workspaceId);
    document.body.style.overflow = "hidden";
  };

  return (
    <StWorkspaceBox>
      {
        dataWorkspace?.map((item: WorkspaceDataType) => {
          return (
            <StWorkspaceData key={item.workspaceId}>
              <StWorkspaceDataBox>
                <StWorkspaceImg src={item.workspaceImage}/>
                <StNameSubBox>
                  <StWorkspaceName>{item.workspaceTitle}</StWorkspaceName>
                  <StWorkspaceDesc>{item.workspaceDesc}</StWorkspaceDesc>
                </StNameSubBox>
              </StWorkspaceDataBox>
              <StWithdrawBtn onClick={() => leaveModalOpenHandler(item.workspaceId)}>탈퇴</StWithdrawBtn>
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
`;
const StWorkspaceData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 24px 0 24px 0;
  border-bottom: 1px solid #F5F5F5;
`;

const StWorkspaceDataBox = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;
const StWorkspaceImg = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;

const StNameSubBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const StWorkspaceName = styled.h3`
  font-size: 16px;
  font-weight: 800;
`;
const StWorkspaceDesc = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #808080;
`;

const StWithdrawBtn = styled.button`
  width: 52px;
  height: 32px;
  border: none;
  color: #FFFFFF;
  background-color: #FF3B31;
  border-radius: 4px;
`;