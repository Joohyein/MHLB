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
    onSuccess: () => {
      queryClient.invalidateQueries('workspace');
    },
    onError: (error: any) => {
      if(error.response.data.code === 'W-01') {
        alert('삭제된 워크스페이스이거나 존재하지 않는 워크스페이스 입니다.');
        window.location.reload();
      }
    }
  });
  const mutationReject = useMutation(rejectInvite, {
    onSuccess: () => {
      queryClient.invalidateQueries('workspace');
    },
    onError: (error: any) => {
      if(error.response.data.code === 'W-01') {
        alert('삭제된 워크스페이스이거나 존재하지 않는 워크스페이스 입니다.');
        window.location.reload();
      }
    }
  });

  const onClickAcceptHandler = (workspaceId: number) => {
    mutationAccept.mutate(workspaceId);
  };
  const onClickRejectHandler = (workspaceId: number) => {
    mutationReject.mutate(workspaceId);
  };

  return (
    <StWorkspaceList>
      {invitedWorkspaceData?.map((item : InvitedWorkspaceType) => {
        return (
          <StWorkspaceInfoDiv key={item.workspaceId}>
            <StWorkspaceImage img = {item.workspaceImage} />
            <StWorkspaceTextInfoDiv>
              <StWorkspaceName>{item.workspaceTitle}</StWorkspaceName>
              <StWorkspaceDesc>{item.workspaceDesc}</StWorkspaceDesc>
            </StWorkspaceTextInfoDiv>
            <StBtnDiv>
              <StAcceptBtn onClick={() => onClickAcceptHandler(item.workspaceId)}>수락</StAcceptBtn>
              <StRejectBtn onClick={() => onClickRejectHandler(item.workspaceId)}>거절</StRejectBtn>
            </StBtnDiv>
          </StWorkspaceInfoDiv>
        )
      })}
    </StWorkspaceList>
  )
}

export default InvitedWorkspace;

const StWorkspaceList = styled.div`
  width : 100%;
  height : 100%;
  display : flex;
  flex-direction : column;
`

const StWorkspaceInfoDiv = styled.div`
  width : 100%;
  height : 80px;
  display : flex;
  flex-direction : row;
  justify-content : flex-start;
  align-items : center;
  border-bottom : 1px solid #f1f1f1;
`

const StWorkspaceImage = styled.div`
  width : 48px;
  height : 48px;
  flex-shrink : 0;
  border-radius : 48px;
  background : gray;
  background-image : url('${(props : {img : string}) => props.img}');
  background-size : cover;
  background-position : center;
  margin-right : 16px;
`

const StWorkspaceTextInfoDiv = styled.div`
  display : flex;
  justify-content : flex-start;
  flex-direction : column;
  gap : 4px;
  margin-right : auto;
`

const StWorkspaceName = styled.div`
  font-size : 16px;
  font-weight : 700;
  color : #303030;
`

const StWorkspaceDesc = styled.div`
  font-size : 0.75rem;
  font-weight : 400;
  color : #7f7f7f;
`

const StBtnDiv = styled.div`
  display : flex;
  gap : 8px;
`

const StAcceptBtn = styled.button`
  border : none;
  border-radius : 4px;
  color : white;
  flex-shrink : 0;
  background : #007aff;
  font-size : 1rem;
  font-weight : 700;
  padding : 8px 16px;
  transition : 200ms;
  &:hover {
    background : #4da2ff;
    cursor : pointer;
  }
`

const StRejectBtn = styled.button`
  border : none;
  border-radius : 4px;
  outline : 1px solid #007aff;
  color : #007aff;
  flex-shrink : 0;
  background : transparent;
  font-size : 1rem;
  font-weight : 700;
  padding : 8px 16px;
  transition : 200ms;
  &:hover {
    background : #deeeff;
    cursor : pointer;
  }
`
