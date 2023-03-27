import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getPeopleList } from "../../api/rightSide";

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

const DragDropComp = () => {

    const params = useParams();

    const [userList, setUserList] = useState<UserInfoType[]>([]);
    const [currentUser, setCurrentUser] = useState<any>();

    useEffect(() => {
        getPeopleList(Number(params.workspaceId))
        .then((res) => {
            setCurrentUser(res[0]);
            setUserList(res.slice(1));
        });
    }, [])

    useEffect(() => {
        console.log(userList);
    }, [userList]);

    const dragResult = (result : any) => {
        if (result.destination === null) return;
        const tempObj = {...currentUser, status : result.destination.droppableId}
        setCurrentUser(tempObj);
    }

    return (
        <DragDropContext onDragEnd={dragResult}>
            <StSectionDiv>
                <StSectionSize1Box>
                    <StSectionSize1>
                        <StSectionTitle>근무 ✏️</StSectionTitle>
                        <StSectionDesc>현재 근무 중인 멤버</StSectionDesc>
                        <StSectionHr />
                        <Droppable droppableId = '근무'>
                        {provided => (
                            <StMemberContainer className="근무" {...provided.droppableProps} ref={provided.innerRef}>
                                {currentUser?.status === "근무"
                                ? <Draggable draggableId = {String(currentUser.userId)} index={currentUser.userId} key={String(currentUser.userId)}>
                                    {provided => 
                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <StMemberPin key = {currentUser.userId}>
                                                <StMemberPinProfile img = {currentUser.userImage}/>
                                                <StMemberPinName>{currentUser.userName}</StMemberPinName>
                                            </StMemberPin>
                                        </div>
                                    }
                                </Draggable>
                                : null
                                }
                                {userList.filter((item : UserInfoType) => item.status === '근무').map((item : UserInfoType) => {
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
                    <StSectionSize1>
                        <StSectionTitle>회의 🚦</StSectionTitle>
                        <StSectionDesc>현재 회의 중인 멤버</StSectionDesc>
                        <StSectionHr />
                        <Droppable droppableId = '회의'>
                        {provided => (
                            <StMemberContainer className="회의" {...provided.droppableProps} ref={provided.innerRef}>
                                {currentUser?.status === "회의"
                                ? <Draggable draggableId = {String(currentUser.userId)} index={currentUser.userId} key={String(currentUser.userId)}>
                                    {provided => 
                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <StMemberPin key = {currentUser.userId}>
                                                <StMemberPinProfile img = {currentUser.userImage}/>
                                                <StMemberPinName>{currentUser.userName}</StMemberPinName>
                                            </StMemberPin>
                                        </div>
                                    }
                                </Draggable>
                                : null
                                }
                                {userList.filter((item : UserInfoType) => item.status === '회의').map((item : UserInfoType) => {
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
                    <StSectionSize1>
                        <StSectionTitle>식사 🍽️</StSectionTitle>
                        <StSectionDesc>현재 식사 중인 멤버</StSectionDesc>
                        <StSectionHr />
                        <Droppable droppableId = '식사중'>
                        {provided => (
                            <StMemberContainer className="식사중" {...provided.droppableProps} ref={provided.innerRef}>
                                {currentUser?.status === "식사중"
                                ? <Draggable draggableId = {String(currentUser.userId)} index={currentUser.userId} key={String(currentUser.userId)}>
                                    {provided => 
                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <StMemberPin key = {currentUser.userId}>
                                                <StMemberPinProfile img = {currentUser.userImage}/>
                                                <StMemberPinName>{currentUser.userName}</StMemberPinName>
                                            </StMemberPin>
                                        </div>
                                    }
                                </Draggable>
                                : null
                                }
                                {userList.filter((item : UserInfoType) => item.status === '식사중').map((item : UserInfoType) => {
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
                    <StSectionSize1>
                        <StSectionTitle>자리비움 🛝</StSectionTitle>
                        <StSectionDesc>현재 자리비움 중인 멤버</StSectionDesc>
                        <StSectionHr />
                        <Droppable droppableId = '자리비움'>
                        {provided => (
                            <StMemberContainer className="자리비움" {...provided.droppableProps} ref={provided.innerRef}>
                                {currentUser?.status === "자리비움"
                                ? <Draggable draggableId = {String(currentUser.userId)} index={currentUser.userId} key={String(currentUser.userId)}>
                                    {provided => 
                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <StMemberPin key = {currentUser.userId}>
                                                <StMemberPinProfile img = {currentUser.userImage}/>
                                                <StMemberPinName>{currentUser.userName}</StMemberPinName>
                                            </StMemberPin>
                                        </div>
                                    }
                                </Draggable>
                                : null
                                }
                                {userList.filter((item : UserInfoType) => item.status === '자리비움').map((item : UserInfoType) => {
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
                    <StSectionSize1>
                        <StSectionTitle>출장 🚗</StSectionTitle>
                        <StSectionDesc>현재 출장 중인 멤버</StSectionDesc>
                        <StSectionHr />
                        <Droppable droppableId = '출장중'>
                        {provided => (
                            <StMemberContainer className="출장중" {...provided.droppableProps} ref={provided.innerRef}>
                                {currentUser?.status === "출장중"
                                ? <Draggable draggableId = {String(currentUser.userId)} index={currentUser.userId} key={String(currentUser.userId)}>
                                    {provided => 
                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <StMemberPin key = {currentUser.userId}>
                                                <StMemberPinProfile img = {currentUser.userImage}/>
                                                <StMemberPinName>{currentUser.userName}</StMemberPinName>
                                            </StMemberPin>
                                        </div>
                                    }
                                </Draggable>
                                : null
                                }
                                {userList.filter((item : UserInfoType) => item.status === '출장중').map((item : UserInfoType) => {
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
                    <StSectionSize1>
                        <StSectionTitle>휴가 🏝️</StSectionTitle>
                        <StSectionDesc>현재 휴가 중인 멤버</StSectionDesc>
                        <StSectionHr />
                        <Droppable droppableId = '휴가중'>
                        {provided => (
                            <StMemberContainer className="휴가중" {...provided.droppableProps} ref={provided.innerRef}>
                                {currentUser?.status === "휴가중"
                                ? <Draggable draggableId = {String(currentUser.userId)} index={currentUser.userId} key={String(currentUser.userId)}>
                                    {provided => 
                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <StMemberPin key = {currentUser.userId}>
                                                <StMemberPinProfile img = {currentUser.userImage}/>
                                                <StMemberPinName>{currentUser.userName}</StMemberPinName>
                                            </StMemberPin>
                                        </div>
                                    }
                                </Draggable>
                                : null
                                }
                                {userList.filter((item : UserInfoType) => item.status === '휴가중').map((item : UserInfoType) => {
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
                </StSectionSize1Box>
                <StSectionSize2>
                    <StSectionTitle>업무 종료 🚀</StSectionTitle>
                    <StSectionDesc>업무를 종료한 멤버</StSectionDesc>
                    <StSectionHr />
                    <Droppable droppableId = '업무종료'>
                    {provided => (
                        <StMemberContainer className="업무종료" {...provided.droppableProps} ref={provided.innerRef}>
                            {currentUser?.status === "업무종료"
                            ? <Draggable draggableId = {String(currentUser.userId)} index={currentUser.userId} key={String(currentUser.userId)}>
                                {provided => 
                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                        <StMemberPin key = {currentUser.userId}>
                                            <StMemberPinProfile img = {currentUser.userImage}/>
                                            <StMemberPinName>{currentUser.userName}</StMemberPinName>
                                        </StMemberPin>
                                    </div>
                                }
                            </Draggable>
                            : null
                            }
                            {userList.filter((item : UserInfoType) => item.status === '업무종료').map((item : UserInfoType) => {
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
    justify-content : space-between;
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
    height : 534px;
    box-shadow : 0px 0px 1rem rgba(0, 0, 0, 0.05);
    border-radius : 8px;
    background-color : white;
    flex-shrink : 0;
    padding : 16px;
    box-sizing : border-box;
    display : flex;
    flex-direction : column;
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