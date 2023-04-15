import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import { getPeopleList } from "../../api/workspace";
import { getCookie } from "../../cookie/cookies";
import { useSelector } from "react-redux";

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
    {title : '근무 ✏️', name : '근무', desc : '현재 근무 중인 멤버', dropId : 'Working', color : 0},
    {title : '회의 🚦', name : '회의', desc : '현재 회의 중인 멤버', dropId : 'Meeting', color : 1},
    {title : '식사 🍽️', name : '식사', desc : '현재 식사 중인 멤버', dropId : 'Eating', color : 1},
    {title : '자리비움 🛝', name : '자리비움', desc : '현재 자리비움 중인 멤버', dropId : 'AFK', color : 1},
    {title : '출장 🚗', name : '출장', desc : '현재 출장 중인 멤버', dropId : 'BusinessTrip', color : 2},
    {title : '휴가 🏝️', name : '휴가', desc : '현재 휴가 중인 멤버', dropId : 'Leave', color : 3}
]

const DragDropComp = ({setUserListData} : {setUserListData : any}) => {

    const params = useParams();
    const navigate = useNavigate();

    const stompClient = useSelector((state : any) => state.websocket.stompClient);

    const [userList, setUserList] = useState<UserInfoType[]>([]);
    const [currentUser, setCurrentUser] = useState<any>();
    const [tempData, setTempData] = useState<any>();
    const [allUsers, setAllUsers] = useState<any>([]);
    const userIdCookie = {userId : getCookie('userId')};

    useEffect(() => {
        getPeopleList(Number(params.workspaceId))
        .then((res) => {
            setCurrentUser(res[0]);
            setUserList(res.slice(1));
        })
        .catch((error) => {
            if (error.response.data.code === 'W-01') return navigate('/select-workspace');
        })

    }, [])

    useEffect(()=>{
        if(params.workspaceId && !(Object.keys(stompClient).length === 0)) {
            stompClient.subscribe(`/sub/status/${params.workspaceId}`, (data : any) => setTempData(JSON.parse(data.body)), userIdCookie);
        }
        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.unsubscribe(`/sub/status/${params.workspaceId}`);
            }
        }
    }, [params.workspaceId, stompClient]);

    useEffect(() => {
        updateStatus(tempData);
    }, [tempData])

    const updateStatus = (data : any) => {
            const mappingData = userList.map((val) => val.userId === data.userId ? {...val, status : data.status, color : data.color} : val)

            mappingData.sort((a : UserInfoType, b : UserInfoType) => {
            if(a.userName > b.userName) return 1;
            if(a.userName < b.userName) return -1;
            return 0;
            }).sort((a : UserInfoType, b : UserInfoType) => {
            if(a.color > b.color) return 1;
            if(a.color < b.color) return -1;
            return 0;
            })

            setUserList(mappingData);
    }

    useEffect(() => {
        setUserListData([currentUser, ...userList]);
    }, [userList, currentUser]);

    const onDragEnd = (result : any) => {
        if (result.destination === null || result.source.droppableId === result.destination.droppableId) return;
        const originObj = {...currentUser, status : result.source.droppableId};
        const tempObj = {...currentUser, status : result.destination.droppableId, color : ([...sectionContents, {title : '업무 종료 🚀', name : '업무 종료', desc : '현재 업무 종료 중인 멤버', dropId : 'NotWorking', color : 3}].filter((val : any) => val.dropId === result.destination.droppableId)[0].color)};
        setCurrentUser(tempObj);
        const sendData = {status : result.destination.droppableId}
        if (stompClient.connected) {
            stompClient.send(`/pub/status`, userIdCookie, JSON.stringify(sendData));
        } else {
            setCurrentUser(originObj);
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <StSectionDiv>
                <StSectionSize1Box>
                    {sectionContents.map((sectionItem : {title : string, name : string, desc : string, dropId : string}) => {
                        return (
                            <StSectionSize1 key = {sectionItem.dropId}>
                            <StSectionTitle>{sectionItem.title}</StSectionTitle>
                            <StSectionDesc>{sectionItem.desc}({userList?.filter((val : any) => val.status === sectionItem.dropId).length + (currentUser?.status === sectionItem?.dropId ? 1 : 0)})</StSectionDesc>
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
                                                    <StUserPinName>{currentUser.userName.split(' ')[0].substring(0, 5)}</StUserPinName>
                                                </StMemberPin>
                                            </div>
                                        }
                                    </Draggable>
                                    : null
                                    }
                                    {(userList?.filter((val : any) => val.status === sectionItem.dropId).length + (currentUser?.status === sectionItem?.dropId ? 1 : 0)) < 9
                                    ?userList.filter((item : UserInfoType) => item.status === sectionItem.dropId).map((item : UserInfoType) => {
                                        return (
                                            <StMemberPin key = {item.userId}>
                                                <StMemberPinProfile img = {item.userImage}/>
                                                <StMemberPinName>{item.userName.split(' ')[0].substring(0, 5)}</StMemberPinName>
                                            </StMemberPin>
                                        )
                                    })
                                    :userList.filter((item : UserInfoType) => item.status === sectionItem.dropId).slice(0, (currentUser.status === sectionItem?.dropId ? 6 : 7)).map((item : UserInfoType) => {
                                        return (
                                            <StMemberPin key = {item.userId}>
                                                <StMemberPinProfile img = {item.userImage}/>
                                                <StMemberPinName>{item.userName.split(' ')[0].substring(0, 5)}</StMemberPinName>
                                            </StMemberPin>
                                        )
                                    })
                                    }
                                    {(userList?.filter((val : any) => val.status === sectionItem.dropId).length + (currentUser?.status === sectionItem?.dropId ? 1 : 0)) === 0 ? <StSectionPlaceholder>현재 {sectionItem.name} 중인 멤버가 없습니다.</StSectionPlaceholder> : null}
                                    {(userList?.filter((val : any) => val.status === sectionItem.dropId).length + (currentUser?.status === sectionItem?.dropId ? 1 : 0)) > 8 ? <StAdditionalPeople>+{(userList.filter((val : any) => val.status === sectionItem.dropId).length + (currentUser?.status === sectionItem?.dropId ? 1 : 0))-7}</StAdditionalPeople> : null}
                                    {provided.placeholder}
                                </StMemberContainer>
                            )}
                            </Droppable>
                        </StSectionSize1>
                        )
                    })}
                </StSectionSize1Box>
                <StSectionSize2>
                    <StSectionTitle>업무 종료 🚀</StSectionTitle>
                    <StSectionDesc>업무를 종료한 멤버({userList?.filter((val : any) => val.status === 'NotWorking').length + (currentUser?.status === 'NotWorking' ? 1 : 0)})</StSectionDesc>
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
                                            <StUserPinName>{currentUser.userName.split(' ')[0].substring(0, 5)}</StUserPinName>
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
                                        <StMemberPinName>{item.userName.split(' ')[0].substring(0, 5)}</StMemberPinName>
                                    </StMemberPin>
                                )
                            })}
                            {(userList?.filter((val : any) => val.status === 'NotWorking').length + (currentUser?.status === 'NotWorking' ? 1 : 0)) === 0 ? <StSectionPlaceholder>현재 업무종료 중인 멤버가 없습니다.</StSectionPlaceholder> : null}
                            {provided.placeholder}
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

const StSectionPlaceholder = styled.div`
    width : 100%;
    height : 100%;
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    font-size : 0.75rem;
    font-weight : 300;
    color : #303030;
`

const StAdditionalPeople = styled.div`
    width : 48px;
    height : 64px;
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    font-size : 1rem;
    font-weight : 700;
    color : #7f7f7f;
`