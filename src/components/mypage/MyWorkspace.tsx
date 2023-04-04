import { useNavigate } from "react-router-dom";
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
  
  const navigate = useNavigate();
  
  const leaveModalOpenHandler = (workspaceId: number) => {
    document.body.style.overflow = "hidden";
    setLeaveModal(true);
    setWorkspaceId(workspaceId);
  };

  return (
    <StWorkspaceList>
      {dataWorkspace?.map((item : any) => {
        return (
          <StWorkspaceInfoDiv key={item.workspaceId}>
            <StWorkspaceImage img = {item.workspaceImage} />
            <StWorkspaceTextInfoDiv>
              <StWorkspaceName>{item.workspaceTitle}</StWorkspaceName>
              <StWorkspaceDesc>{item.workspaceDesc}</StWorkspaceDesc>
            </StWorkspaceTextInfoDiv>
            {item.userRole === 'ADMIN' ? <StWorkspaceConfigBtn onClick = {() => {navigate(`/workspace-config/${item.workspaceId}`); window.scrollTo({top: 0});}}>관리자 페이지로 이동</StWorkspaceConfigBtn> : <StWithdrawBtn onClick={() => leaveModalOpenHandler(item.workspaceId)}>탈퇴</StWithdrawBtn>}
          </StWorkspaceInfoDiv>
        )
      })}
    </StWorkspaceList>
  )
}

export default MyWorkspace;

const StWorkspaceList = styled.div`
  margin-bottom : 32px;
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

const StWorkspaceConfigBtn = styled.button`
  border : none;
  border-radius : 4px;
  outline : 1px solid #007aff;
  outline-offset : -1px;
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

const StWithdrawBtn = styled.button`
  border : none;
  border-radius : 4px;
  color : white;
  flex-shrink : 0;
  background : #ff3b30;
  font-size : 1rem;
  font-weight : 700;
  padding : 8px 16px;
  transition : 200ms;
  &:hover {
    background : #ff645c;
    cursor : pointer;
  }
`