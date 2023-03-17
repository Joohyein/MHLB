import styled from "styled-components";
import { useQuery } from "react-query";
import { getWorkspaces } from "../../api/myPage";

function MyWorkspace({setLeaveModal}:{setLeaveModal:(v: boolean) => void}) {
    const { data } = useQuery('workspace', getWorkspaces);
    console.log(data);

    const leaveModalOpenHandler = () => {
    setLeaveModal(true);
    document.body.style.overflow = "hidden";
    }

  return (
    <StWorkspaceBox>
        <StWorkspaceData>
            <StWorkspaceImg src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'/>
            <StContributionBox>
            <h3>테슬라에서의 나의 기여도</h3>
            <StContribution>
                <StDone></StDone>
                <StRemain></StRemain>
            </StContribution>
            </StContributionBox>
        </StWorkspaceData>

        <StWithdrawBtn onClick={leaveModalOpenHandler}>워크스페이스 탈퇴</StWithdrawBtn>
    </StWorkspaceBox>
  )
}

export default MyWorkspace;

const StWorkspaceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;
const StWorkspaceData = styled.div`
  display: flex;
  gap: 12px;
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