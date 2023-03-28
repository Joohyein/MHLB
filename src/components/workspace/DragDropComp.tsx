import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getPeopleList } from "../../api/rightSide";
import { requestChangeStatus } from "../../api/workspace";

export interface UserInfoType {
    color : number,
    description : string,
    status : string,
    userEmail : string,
    userId : number,
    userImage : string,
    userJob : string,
    userName : string
}

const sectionContents = [
    {title : '근무 ✏️', desc : '현재 근무 중인 멤버', dropId : 'Working'},
    {title : '회의 🚦', desc : '현재 회의 중인 멤버', dropId : 'Meeting'},
    {title : '식사 🍽️', desc : '현재 식사 중인 멤버', dropId : 'Eating'},
    {title : '자리비움 🛝', desc : '현재 자리비움 중인 멤버', dropId : 'AFK'},
    {title : '출장 🚗', desc : '현재 출장 중인 멤버', dropId : 'BusinessTrip'},
    {title : '휴가 🏝️', desc : '현재 휴가 중인 멤버', dropId : 'Leave'}
]

const DragDropComp = () => {

    const params = useParams();

    const [userList, setUserList] = useState<UserInfoType[]>([]);
    const [currentUser, setCurrentUser] = useState<any>();

    useEffect(() => {
        getPeopleList(Number(params.workspaceId))
        .then((res) => {
            setCurrentUser(res[0]);
            setUserList(res.slice(1));
            console.log(res);
        });
    }, [])

    useEffect(() => {
        console.log(userList);
    }, [userList]);

    const onDragEnd = (result : any) => {
        if (result.destination === null || result.source.droppableId === result.destination.droppableId) return;
        const originObj = {...currentUser, status : result.source.droppableId};
        const tempObj = {...currentUser, status : result.destination.droppableId};
        setCurrentUser(tempObj);
        requestChangeStatus({status : result.destination.droppableId})
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            setCurrentUser(originObj);
            console.log(error);
        })
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <StSectionDiv>
                <StSectionSize1Box>
                    {sectionContents.map((sectionItem : {title : string, desc : string, dropId : string}) => {
                        return (
                            <StSectionSize1 key = {sectionItem.dropId}>
                            <StSectionTitle>{sectionItem.title}</StSectionTitle>
                            <StSectionDesc>{sectionItem.desc}</StSectionDesc>
                            <StSectionHr />
                            <Droppable droppableId = {sectionItem.dropId}>
                            {provided => (
                                <StMemberContainer className={sectionItem.dropId} {...provided.droppableProps} ref={provided.innerRef}>
                                    {currentUser?.status === sectionItem.dropId
                                    ? <Draggable draggableId = {String(currentUser.userId)} index={currentUser.userId} key={String(currentUser.userId)}>
                                        {provided => 
                                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                <StMemberPin key = {currentUser.userId}>
                                                    <StUserPinProfile img = {currentUser.userImage}/>
                                                    <StUserPinName>{currentUser.userName}</StUserPinName>
                                                </StMemberPin>
                                            </div>
                                        }
                                    </Draggable>
                                    : null
                                    }
                                    {userList.filter((item : UserInfoType) => item.status === sectionItem.dropId).map((item : UserInfoType) => {
                                        return (
                                            <StMemberPin key = {item.userId}>
                                                <StMemberPinProfile img = {item.userImage}/>
                                                <StMemberPinName>{item.userName}</StMemberPinName>
                                            </StMemberPin>
                                        )
                                    })}
                                </StMemberContainer>
                            )}
                            </Droppable>
                        </StSectionSize1>
                        )
                    })}
                </StSectionSize1Box>
                <StSectionSize2>
                    <StSectionTitle>업무 종료 🚀</StSectionTitle>
                    <StSectionDesc>업무를 종료한 멤버</StSectionDesc>
                    <StSectionHr />
                    <Droppable droppableId = 'NotWorking'>
                    {provided => (
                        <StMemberContainer className="NotWorking" {...provided.droppableProps} ref={provided.innerRef}>
                            {currentUser?.status === "NotWorking"
                            ? <Draggable draggableId = {String(currentUser.userId)} index={currentUser.userId} key={String(currentUser.userId)}>
                                {provided => 
                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                        <StMemberPin key = {currentUser.userId}>
                                            <StUserPinProfile img = {currentUser.userImage}/>
                                            <StUserPinName>{currentUser.userName}</StUserPinName>
                                        </StMemberPin>
                                    </div>
                                }
                            </Draggable>
                            : null
                            }
                            {userList.filter((item : UserInfoType) => item.status === 'NotWorking').map((item : UserInfoType) => {
                                return (
                                    <StMemberPin key = {item.userId}>
                                        <StMemberPinProfile img = {item.userImage}/>
                                        <StMemberPinName>{item.userName}</StMemberPinName>
                                    </StMemberPin>
                                )
                            })}
                        </StMemberContainer>
                    )}
                    </Droppable>
                </StSectionSize2>
            </StSectionDiv>
        </DragDropContext>
    )
}

export default DragDropComp;

const StSectionDiv = styled.div`
    display : flex;
    justify-content : center;
    width : 100%;
    gap : 16px;
`

const StSectionSize1Box = styled.div`
    display : flex;
    flex-direction : flex-start;
    flex-wrap : wrap;
    gap : 16px;   
`

const StSectionSize1 = styled.div`
    width : 248px;
    height : 259px;
    box-shadow : 0px 0px 1rem rgba(0, 0, 0, 0.05);
    border-radius : 8px;
    background-color : white;
    flex-shrink : 0;
    padding : 16px;
    box-sizing : border-box;
    display : flex;
    flex-direction : column;
`

const StSectionSize2 = styled.div`
    width : 248px;
    height : 100%;
    box-shadow : 0px 0px 1rem rgba(0, 0, 0, 0.05);
    border-radius : 8px;
    background-color : white;
    flex-shrink : 0;
    padding : 16px;
    box-sizing : border-box;
    display : flex;
    flex-direction : column;
    transition : 200ms;
`

const StSectionTitle = styled.div`
    font-size : 1.5rem;
    font-weight : 900;
    margin-bottom : 4px;
`

const StSectionDesc = styled.div`
    font-size : 0.75rem;
    font-weight : 300;
    margin-bottom : 16px;
`

const StSectionHr = styled.hr`
    background : #e1e1e1;
    border : none;
    height : 1px;
    width : 100%;
`

const StMemberContainer = styled.div`
    width : 100%;
    height : 100%;
    display : flex;
    flex-direction : row;
    flex-wrap : wrap;
    justify-content : flex-start;
    align-items : flex-start;
    align-content : flex-start;
    padding-top : 16px;
    box-sizing : border-box;
    gap : 8px;
`

const StMemberPin = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`

const StMemberPinProfile = styled.div`
    width : 48px;
    height : 48px;
    border-radius : 64px;
    background-color : gray;
    background-image : url('${(props : {img : string}) => props.img}');
    background-size : cover;
    background-position : center;
    margin-bottom : 4px;
`

const StMemberPinName = styled.div`
    font-size : 0.75px;
    font-weight : 700;
`

const StUserPinProfile = styled.div`
    width : 48px;
    height : 48px;
    border-radius : 64px;
    background-color : gray;
    background-image : url('${(props : {img : string}) => props.img}');
    background-size : cover;
    background-position : center;
    margin-bottom : 4px;
    outline : 4px solid #007AFF;
    outline-offset : -4px
`

const StUserPinName = styled.div`
    font-size : 0.75px;
    font-weight : 900;
    color : #007AFF;
`