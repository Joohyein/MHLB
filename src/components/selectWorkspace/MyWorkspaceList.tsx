import { useEffect, useState } from "react";
import styled from "styled-components";
import { getChatList, getPeopleList } from "../../api/rightSide";

interface workspaceListType {
    workspaceDesc: string,
    workspaceId: number,
    workspaceImage: string,
    workspaceTitle: string
};

function MyWorkspaceList({workspaceData, onClick} : {workspaceData: any, onClick : any}) {

  const [userList, setUserList] = useState<any>([]);
  const [userListLength, setUserListLength] = useState<any>();
  const [recentMessage, setRecentMessage] = useState<any>();

  useEffect(() => {
    getPeopleList(workspaceData.workspaceId)
    .then((res) => {
      const onlineMember = res.filter((val : any) => !(val.color === 3));
      setUserListLength(Number(onlineMember.length));
      if (onlineMember.length <= 7) {
        setUserList(onlineMember);
      } else {
        setUserList(onlineMember.slice(0, 6));
      }
    })
    .catch((error) =>{
      console.log(error);
    })
    getChatList(workspaceData.workspaceId)
    .then((res) => {
      setRecentMessage(res.slice(0, 3));
    })
    .catch((error) => {
      console.log(error);
    })
  }, [workspaceData])

  return (
    <StWorkspaceBox onClick={() => {onClick(workspaceData.workspaceId)}}>
      <StImage img={workspaceData.workspaceImage}/>
      <StTitle>{workspaceData.workspaceTitle}</StTitle>
      <StDesc>{workspaceData.workspaceDesc}</StDesc>
      <StHrTag />
      <StCurrentUserDiv>
        <StSubTitle>현재 근무중인 멤버({userList.length})</StSubTitle>
        <StUserListDiv>
          {userList?.map((item : {color : number, description : string, status : string, userEmail : string, userId : number, userImage : string, userJob : string , userName : string}) => {
            return (
            <StProfileDiv key = {item.userId}>
              <StProfileImg img = {item.userImage} />
              <StProfileName>{item.userName.split(' ')[0].substring(0, 4)}</StProfileName>
            </StProfileDiv>
            )
          })}
          {userListLength <= 7 ? null : <StUserListOverCount>+{userListLength - 6}</StUserListOverCount>}
        </StUserListDiv>
      </StCurrentUserDiv>
      <StHrTag />
      <StRecentMessageListDiv>
        <StSubTitle>최근 메세지</StSubTitle>
        <StRecentMessageList>
          {recentMessage?.map((item : any) => {
            return (
              <StMessageContentDiv key = {item.userId}>
                <StMessageProfileImg img = {item.userImage}/>
                <StMessageTextDiv>
                  <StMessageName>{item.userName}</StMessageName>
                  <StMessageRecent>{item.message}</StMessageRecent>
                </StMessageTextDiv>
                <StMessageBadge>{item.unreadMessages}</StMessageBadge>
              </StMessageContentDiv>
            )
          })}
        </StRecentMessageList>
      </StRecentMessageListDiv>
  </StWorkspaceBox>
  )
};

export default MyWorkspaceList;

const StWorkspaceBox = styled.div`
  width : 336px;
  height : 665px;
  background-color : white;
  border-radius : 8px;
  box-shadow : 0px 0px 16px 4px rgba(0, 0, 0, 0.05);
  padding : 32px;
  box-sizing : border-box;
  display: flex;
  flex-direction : column;
  justify-content : flex-start;
  align-items : center;
  outline : 2px solid white;
  transition : 200ms;
  &:hover {
    cursor : pointer;
    outline : 2px solid #007aff;
    outline-offset : -2px;
    scale : 1.025;
  }
`;

const StImage = styled.div`
  width : 128px;
  height : 128px;
  background-image : url('${(props : {img : string | undefined}) => props.img}');
  background-size : cover;
  background-position : center;
  border-radius : 128px;
  flex-shrink : 0;
`;

const StTitle = styled.h3`
  font-size : 1.5rem;
  font-weight : 900;
  text-align : center;
  color : #303030;
  margin-top : 16px;
`;

const StDesc = styled.h3`
  font-size: 1rem;
  font-weight: 300;
  text-align : center;
  color : #303030;
  line-height : 1.5rem;
  margin-top : 8px;
  margin-bottom : 16px;
  height : 48px;
`;

const StHrTag = styled.hr`
  display: block;
  width : 100%;
  height : 1px;
  background : #e1e1e1;
  border : none;
`

const StCurrentUserDiv = styled.div`
  margin-top : 16px;
  margin-bottom : 16px;
  width : 100%;
  height : 81px;
  display: flex;
  flex-direction : column;
  justify-content : flex-start;
  align-items : flex-start;
`

const StSubTitle = styled.div`
  font-size : 16px;
  font-weight : 700;
  color : #303030;
  margin-bottom : 16px;
`

const StUserListDiv = styled.div`
  width : 100%;
  display : flex;
  flex-direction : flex-start;
  justify-content : flex-start;
  align-items : flex-start;
  gap : 8px;
`

const StProfileDiv = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : flex-start;
  align-items : center;
  height : 48px;
  overflow : hidden;
`

const StProfileImg = styled.div`
  width : 32px;
  height : 32px;
  border-radius : 32px;
  background-color : gray;
  background-image : url('${(props : {img : string}) => props.img}');
  background-size : cover;
  background-position : center;
  margin-bottom : 4px;
  flex-shrink : 0;
`

const StProfileName = styled.div`
  font-size : 0.5rem;
  font-weight : 700;
  color : #303030;
  text-align : center;
`

const StUserListOverCount = styled.div`
  width : 32px;
  height : 44px;
  padding-top : 7px;
  font-size : 1rem;
  font-weight : 700;
  color : #7f7f7f;
`

const StRecentMessageListDiv = styled.div`
  margin-top : 16px;
  width : 100%;
  height : 227px;
  display: flex;
  flex-direction : column;
  justify-content : flex-start;
  align-items : flex-start;
`

const StRecentMessageList = styled.div`
  width : 100%;
  height : 192px;
  display: flex;
  flex-direction : column;
  justify-content : flex-start;
  align-items : center;
`

const StMessageContentDiv = styled.div`
  width : 100%;
  height : 64px;
  display : flex;
  justify-content : flex-start;
  align-items : center;
`

const StMessageProfileImg = styled.div`
  width : 48px;
  height : 48px;
  border-radius : 48px;
  background-color : gray;
  background-image : url('${(props : {img : string}) => props.img}');
  background-size : cover;
  background-position : center;
  flex-shrink : 0;
`

const StMessageTextDiv = styled.div`
  margin-left : 8px;
  margin-right : auto;
  display: flex;
  flex-direction : column;
  justify-content : flex-start;
  align-items : flex-start;
`

const StMessageName = styled.div`
  font-size : 1rem;
  font-weight : 700;
  color : #303030;
`

const StMessageRecent = styled.div`
  font-size : 0.75rem;
  font-weight : 400;
  color : #303030;
`

const StMessageBadge = styled.div`
  padding : 4px;
  color : white;
  font-size : 0.75rem;
  font-weight : 700;
  background : #007aff;
  border-radius : 16px;
`