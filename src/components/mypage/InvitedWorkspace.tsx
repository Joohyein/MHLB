import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { acceptInvite, rejectInvite } from "../../api/myPage";

interface InvitedWorkspaceType {
    workspaceId: number,
    workspaceTitle: string,
    workspaceImage: string,
    workspaceDesc: string
};

function InvitedWorkspace({invitedWorkspaceData}:{invitedWorkspaceData:InvitedWorkspaceType[]}) {

  const queryClient = useQueryClient();
  const mutationAccept = useMutation(acceptInvite, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('workspace');
      console.log(response);
    },
    onError: (error) => console.log(error)
  });
  const mutationReject = useMutation(rejectInvite, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('workspace');
      console.log(response);
    },
    onError: (error) => console.log(error)
  });


  const onClickAcceptHandler = (workspaceId: number) => {
    mutationAccept.mutate(workspaceId);
  };

  const onClickRejectHandler = (workspaceId: number) => {
    mutationReject.mutate(workspaceId);
  };

  return (
    <StWorkspaceBox>
    {
      invitedWorkspaceData?.map((item: InvitedWorkspaceType) => {
        return (
          <StWorkspaceData key={item.workspaceId}>
            <StWorkspaceDataBox>
              <StWorkspaceImg src={item.workspaceImage}/>
              <StNameSubBox>
                <StWorkspaceName>{item.workspaceTitle}</StWorkspaceName>
                <StWorkspaceDesc>{item.workspaceDesc}</StWorkspaceDesc>
              </StNameSubBox>
            </StWorkspaceDataBox>
            <StBtnBox>
              <StAcceptBtn onClick={() => onClickRejectHandler(item.workspaceId)}>거절</StAcceptBtn>
              <StRejectBtn onClick={() => onClickAcceptHandler(item.workspaceId)}>수락</StRejectBtn>
            </StBtnBox>
        </StWorkspaceData>
        )
      })
    }
  </StWorkspaceBox>
  )
}

export default InvitedWorkspace;

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

const StBtnBox = styled.div`
  display: flex;
  gap: 8px;
`;
const StAcceptBtn = styled.button`
  width: 52px;
  height: 32px;
  border: none;
  color: #007AFF;
  background-color: #FFFFFF;
  border-radius: 4px;
`;
const StRejectBtn = styled.button`
  width: 52px;
  height: 32px;
  border: none;
  color: #FFFFFF;
  background-color: #007AFF;
  border-radius: 4px;
`;