import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getWorkspaceList } from "../../api/workspace";
import { reorderWorkspaceList } from "../../api/workspace";
import { getCookie } from "../../cookie/cookies";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

export interface WorkspaceListIconType {
    workspaceId : number,
    workspaceImage : string,
    workspaceTitle : string,
    workspaceDesc : string
}

const LeftSideBar = () => {

    const [workspaceList, setWorkspaceList] = useState([]);

    const userId = getCookie('userId');

    const navigate = useNavigate();

    useEffect(()=>{
        const socket = new SockJS(`${process.env.REACT_APP_BE_SERVER}/stomp/ws`);
        const stompClient = Stomp.over(socket);
        if(userId) {
            stompClient.connect({Authorization: getCookie('authorization')}, () => {
                stompClient.subscribe(`/sub/unread-message/${userId}`, (data) => {
                    console.log(JSON.parse(data.body));
                }, {Authorization: getCookie('authorization')});
            },
        );
        }
        return () => {
          stompClient.disconnect();
        }
    }, [userId]);

    useEffect(() => {
        getWorkspaceList()
        .then((res) => {
            console.log(res);
            setWorkspaceList(res.data);
        })
    }, [])

    useEffect(() => {
        const orderList = ({ orders : [...workspaceList.map((val : WorkspaceListIconType, idx : number) => {
            return {workspaceId : Number(val.workspaceId), orderNum : Number(idx)};
        })]})
        reorderWorkspaceList({...orderList})
    }, [workspaceList])

    const handleOnDragEnd = (result : any) => {
        if (!result.destination) return;
        const tempArr = [...workspaceList];
        const [removedArr] = tempArr.splice(result.source.index, 1);
        tempArr.splice(result.destination.index, 0, removedArr);
        setWorkspaceList(tempArr);
    }

    return (
        <DragDropContext onDragEnd = {(result) => {handleOnDragEnd(result)}}>
            <Droppable droppableId = "workspace">
                {(provided) => (
                    <StLeftSideContainer className="workspace" {...provided.droppableProps} ref={provided.innerRef}>
                        {workspaceList?.map((obj : WorkspaceListIconType, index : number) => {
                            return (
                                <Draggable key = {String(obj.workspaceId)} draggableId = {String(obj.workspaceId)} index = {index}>
                                    {(provided) => (
                                        <StIcon onClick = {() => {navigate(`/workspace/${obj.workspaceId}`); window.location.reload()}} img = {obj.workspaceImage} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}/>
                                    )}
                                </Draggable>
                            )
                        })}
                    </StLeftSideContainer>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default LeftSideBar;

const StLeftSideContainer = styled.div`
    width : 64px;
    height : 100%;
    background-color : white;
    box-shadow : 0px 0px 1rem rgba(0, 0, 0, 0.05);
    display : flex;
    flex-direction : column;
    justify-content : flex-start;
    align-items : center;
    flex-shrink : 0;
    position : fixed;
    padding-top : 64px;
    top : 0;
    left : 0;
    box-sizing : border-box;
    z-index : 4;
    @media screen and (max-width : 672px) {
        display : none;
    }
`

const StIcon = styled.div`
    width : 48px;
    height : 48px;
    border-radius : 64px;
    background-image : url('${(props : {img : string}) => props.img}');
    background-size : cover;
    background-position : center;
    cursor : pointer;
    margin-top : 16px;
`