import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getMainWorkspaceInfo } from "../api/workspace";
import NavBarWorkspace from "../components/common/NavBarWorkspace";
import Wrapper from "../components/common/Wrapper";
import DragDropComp from "../components/workspace/DragDropComp";
import LeftSideBar from "../components/workspace/LeftSideBar";
import RightSideBar from "../components/workspace/RightSideBar";
import { getCookie } from "../cookie/cookies";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface WorkspaceInformationType {
    userRole : string,
    workspaceDesc : string,
    workspaceId : number,
    workspaceImage : string,
    workspaceTitle : string
}

const Workspace = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [workspaceInfomation, setWorkspaceInfomation] = useState<WorkspaceInformationType | undefined>();
    const [workspaceId, setWorkspaceId] = useState('');

    useEffect(() => {
        getMainWorkspaceInfo({workspaceId : String(params.workspaceId)})
        .then((res) => {
            setWorkspaceInfomation(res.data);
            setWorkspaceId(res.data.workspaceId);
        })
    }, [])

    useEffect(()=>{
        const socket = new SockJS(`${process.env.REACT_APP_BE_SERVER}/stomp/ws`);
        const stompClient = Stomp.over(socket);
        if(workspaceId) {
            stompClient.connect({Authorization: getCookie('authorization')}, () => {
                stompClient.subscribe(`/sub/status/${workspaceId}`, (data) => {
                    console.log(JSON.parse(data.body));
                }, {Authorization: getCookie('authorization')});
            },
        );
        }
        return () => {
          stompClient.disconnect();
        }
    }, [workspaceId]);

    return (
        <Wrapper>
            <NavBarWorkspace />
            <LeftSideBar />
            <StContainer>
                <StMainContent>
                    <StWorkspaceInfoDiv>
                        <StWorkspaceImage img = {workspaceInfomation?.workspaceImage}/>
                        <StTextInfoDiv>
                            <StWorkspaceTitle>{workspaceInfomation?.workspaceTitle}</StWorkspaceTitle>
                            <StWorkspaceDesc>{workspaceInfomation?.workspaceDesc}</StWorkspaceDesc>
                        </StTextInfoDiv>
                        <StConfigPageLinkButton onClick = {() => {navigate(`/workspace-config/${workspaceInfomation?.workspaceId}`)}}>관리자 페이지로 이동</StConfigPageLinkButton>
                    </StWorkspaceInfoDiv>
                    <DragDropComp />
                </StMainContent>
            </StContainer>
            <RightSideBar />
        </Wrapper>
    );
};

export default Workspace;

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
    @media screen and (max-width : 1200px) and (min-width : 968px) {
        width : 776px;
    }
    @media screen and (max-width : 968px) {
        width : 512px;
    }
`

const StWorkspaceInfoDiv = styled.div`
    margin-top : 62px;
    margin-bottom : 31px;
    width : 100%;
    display : flex;
    flex-direction : flex-start;
    justify-content : flex-start;
    align-items : center;
`

const StWorkspaceImage = styled.div`
    width : 64px;
    height : 64px;
    background-image : url('${(props : {img : string | undefined}) => props.img}');
    background-size : cover;
    background-position : center;
    border-radius : 64px;
`

const StTextInfoDiv = styled.div`
    margin-left : 16px;
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

const StConfigPageLinkButton = styled.button`
    font-size : 1rem;
    font-weight : 700;
    line-height : 24px;
    color : white;
    border : none;
    border-radius : 4px;
    background-color : #007AFF;
    padding : 8px 16px;
    transition : 200ms;
    &:hover {
        background-color : #479fff;
    }
    &:active {
        scale : 1.05;
    }
`