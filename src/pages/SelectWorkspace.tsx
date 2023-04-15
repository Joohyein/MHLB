import { useEffect, useState } from "react";
import styled from "styled-components";
import Wrapper from "../components/common/Wrapper";
import CreateWorkspaceModal from "../components/selectWorkspace/CreateWorkspaceModal";
import useOutsideClick from "../hooks/useOutsideClick";
import { useQuery } from "react-query";
import { getWorkspaceList } from "../api/selectWorkspace";
import MyWorkspaceList from "../components/selectWorkspace/MyWorkspaceList";
import Plus from "../components/asset/icons/Plus";
import { useSelector } from "react-redux";
import { getCookie } from "../cookie/cookies";
import { logEvent } from "../../src/util/amplitude";
import { setAmplitudeUserId } from "../util/amplitude";

const SelectWorkspace = () => {
  const { data } = useQuery('workspaceList', getWorkspaceList);

  const [createModal, setCreateModal] = useState(false);
  const modalRef = useOutsideClick(() => setCreateModal(false));
  const userId = getCookie('userId');

  const stompClient = useSelector((state : any) => state.websocket.stompClient);

  useEffect(() => {
    setAmplitudeUserId(`userId${userId}`);
    if(!(userId && Object.keys(stompClient).length)) return 
    const connection =  stompClient.subscribe(`/sub/unread-message/${userId}`, (data : any) => {
      console.log(JSON.parse(data.body));
    });
    
    return () => {
        if (stompClient && stompClient.connected) {
            connection.unsubscribe({destination: `/sub/unread-message/${userId}`});
        }
    }
}, [data, stompClient]);

  useEffect(() => {
    logEvent('Enter Select workspace page', {from: 'Select workspace page'});
  },[]);

  return (
    <Wrapper>
      <StContainer>
        <StMainContent>
          <StSelectWorkspaceInfoDiv>
            <StTextInfoDiv>
              <StWorkspaceTitle>나의 워크스페이스</StWorkspaceTitle>
              <StWorkspaceDesc>워크스페이스를 선택하고 근태관리를 시작하세요!</StWorkspaceDesc>
            </StTextInfoDiv>
            <StCreateWorkspaceButton onClick={() => {setCreateModal(true);  document.body.style.overflow = "hidden"; logEvent('Create workspace button', {from: 'Select workspace page'})}}>새 워크스페이스 생성<Plus size = '24' fill = 'white' /></StCreateWorkspaceButton>
          </StSelectWorkspaceInfoDiv>
          <StWorkspaceContainer>
            {data?.map((workspaceData : any) => <MyWorkspaceList key = {workspaceData.workspaceId} workspaceData={workspaceData} />)}
          </StWorkspaceContainer>
        </StMainContent>
      </StContainer>
      { createModal ? <CreateWorkspaceModal modalRef={modalRef} setCreateModal={(v: boolean) => setCreateModal(v)} /> : null }
    </Wrapper>
  )
}
export default SelectWorkspace;

const StContainer = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : flex-start;
    align-items : center;
    width : 1040px;
    height : 100vh;
    box-sizing : border-box;
    padding-top : 64px;
    background-color : transparent;
`

const StMainContent = styled.div`
    height : 100%;
    width : 100%;
    display : flex;
    flex-direction : column;
    justify-content : flex-start;
    align-items : center;
    transition : 200ms;
    @media screen and (max-width : 1040px) and (min-width : 688px) {
        width : 688px;
    }
    @media screen and (max-width : 688px) {
        width : 336px;
    }
`

const StSelectWorkspaceInfoDiv = styled.div`
    margin-top : 64px;
    margin-bottom : 32px;
    width : 100%;
    display : flex;
    flex-direction : flex-start;
    justify-content : flex-start;
    align-items : center;
    @media screen and (max-width : 688px) {
      flex-direction : column;
      gap : 16px;
    }
`

const StTextInfoDiv = styled.div`
    display : flex;
    flex-direction : column;
    align-items : stretch;
    margin-right : auto;
`

const StWorkspaceTitle = styled.div`
    font-size : 2rem;
    font-weight : 900;
    margin-bottom : 0.25rem;
    color : #303030;
`

const StWorkspaceDesc = styled.div`
    font-size : 1rem;
    font-weight : 300;
    color : #303030;
`

const StCreateWorkspaceButton = styled.button`
    font-size : 1rem;
    font-weight : 700;
    line-height : 24px;
    text-align: center;
    color : white;
    border : none;
    border-radius : 4px;
    background-color : #007AFF;
    padding : 8px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition : 200ms;
    flex-shrink : 0;
    &:hover {
        background-color : #479fff;
    }
    &:active {
        scale : 1.05;
    }
    @media screen and (max-width : 688px) {
      width : 100%;
    }
`

const StWorkspaceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction : row;
  flex-wrap : wrap;
  justify-content : flex-start;
  align-items : flex-start;
  gap: 32px 16px;
  padding-bottom : 64px;
`;
