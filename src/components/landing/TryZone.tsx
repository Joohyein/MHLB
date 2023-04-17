import { useState } from "react";
import styled from "styled-components";
import defaultAvatarImg from '../asset/img/DefaultAvatar.png';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";

interface UserListType {
  name: string,
  userImg: any,
  status: string,
  userId: number,
};

function TryZone() {
  const [currentUser, setCurrentUser] = useState<UserListType>({name: 'me', userImg: `${defaultAvatarImg}`, status: 'Working', userId: 0});
  const navigate = useNavigate();

  const sectionContents = [
    {title : '근무 ✏️', name : '근무', desc : '현재 근무 중인 멤버', dropId : 'Working'},
    {title : '회의 🚦', name : '회의', desc : '현재 회의 중인 멤버', dropId : 'Meeting'},
    {title : '자리비움 🛝', name : '자리비움', desc : '현재 자리비움 중인 멤버', dropId : 'AFK'},
    {title : '로그인', name : '로그인', desc : `로그인 페이지로 이동합니다.`, dropId : 'Login'},
    {title : '회원가입', name : '회원가입', desc : '회원가입 페이지로 이동합니다.', dropId : 'Register'},
  ];
  const userList = [
    {name: 'a', userImg: `${defaultAvatarImg}`, status: 'Working', userId: 1},
    {name: 'b', userImg: `${defaultAvatarImg}`, status: 'Meeting', userId: 2},
    {name: 'c', userImg: `${defaultAvatarImg}`, status: 'Meeting', userId: 3},
    {name: 'd', userImg: `${defaultAvatarImg}`, status: 'Working', userId: 4},
    {name: 'e', userImg: `${defaultAvatarImg}`, status: 'Working', userId: 5},
  ];

  const onDragEnd = (result : any) => {
    if (result.destination === null || result.source.droppableId === result.destination.droppableId) return;
    if (result.destination.droppableId === 'Login') navigate('/login');
    if (result.destination.droppableId === 'Register') navigate('/register');
    console.log('result', result);
    const tmpObj = {...currentUser, status: result.destination.droppableId};
    setCurrentUser(tmpObj);
  };

  return (
    <StContainer>
      <StTitle>
        <h1>체험존</h1>
        <StLine />
        <h3>자유롭게 핀을 옮겨보세요!</h3>
        <h3>로그인, 회원가입 박스에 핀을 놓으면 해당 페이지로 이동합니다.</h3>
      </StTitle>
      <DragDropContext onDragEnd={onDragEnd}>
        <StSectionBox>
          {
            sectionContents.map((sectionItem:{title: string; name: string; desc: string; dropId: string}) => {
              return (
                <StSection key = {sectionItem.dropId}>
                  <StSectionTitle sectionItemTitle={sectionItem.title}>{sectionItem.title}</StSectionTitle>
                  <StSectionDesc>{sectionItem.desc}</StSectionDesc>
                  <Droppable droppableId={sectionItem.dropId}>
                    {
                      provided => (
                        <StMemberContainer className={sectionItem.dropId} {...provided.droppableProps} ref={provided.innerRef}>
                          {
                            currentUser.status === sectionItem.dropId
                            && <Draggable draggableId={String(currentUser.userId)} index={currentUser.userId} key={String(currentUser.userId)}>
                              {provided => 
                                <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                  <StMemberPin key = {currentUser.userId}>
                                    <StUserPinProfile img = {currentUser.userImg} />
                                    <StUserPinName>{currentUser.name}</StUserPinName>                      
                                  </StMemberPin> 
                                </div>
                              }
                            </Draggable>
                          }
                          {
                            userList.filter((v:UserListType) => v.status === sectionItem.dropId).map((item:UserListType) => {
                              return (
                                <StMemberPin key = {item.userId}>
                                  <StMemberPinProfile img = {item.userImg} />
                                  <StMemberPinName>{item.name}</StMemberPinName>
                                </StMemberPin>
                              )
                            })
                          }
                        </StMemberContainer>
                      )
                    }
                  </Droppable>
                </StSection>
              )
            })
          }
        </StSectionBox>
      </DragDropContext>
    </StContainer>
  )
};

export default TryZone;

const StContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 164px 0;
`;
const StTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
  h1 {
    font-size: 52px;
  };
  h3 {
    line-height: 32px;
    font-weight: 400;
  };
`;

const StLine = styled.div`
  width: 50%;
  border: 1px solid #303030;
  margin: 24px 0;
`;

const StSectionBox = styled.div`
  display : flex;
  justify-content: center;
  flex-wrap : wrap;
  gap : 16px;   
`;
const StSection = styled.div`
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
  transition : 200ms;
  outline-offset : -2px;
`;

const StSectionTitle = styled.div<{sectionItemTitle:string}>`
  font-size : 1.5rem;
  font-weight : 900;
  margin-bottom : 4px;
  color: ${props => props.sectionItemTitle === '로그인' || props.sectionItemTitle === '회원가입' ? '#007bff' : '#000000'};
`;
const StSectionDesc = styled.div`
  font-size : 0.75rem;
  font-weight : 300;
  margin-bottom : 16px;
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
  font-size : 0.75rem;
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
  outline-offset : -4px;
`

const StUserPinName = styled.div`
  font-size : 0.75rem;
  font-weight : 900;
  color : #007AFF;
`