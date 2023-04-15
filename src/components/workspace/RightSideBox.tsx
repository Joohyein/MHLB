import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import MembersBox from "./MembersBox";
import MessageBox from "./MessageBox";
import Chat from "./Chat";
import { useLocation, useParams } from "react-router-dom";
import { getPeopleList } from "../../api/workspace";
import { logEvent } from "../../util/amplitude";

export interface MemberDataType {
  userId: number,
  userImage: string,
  userName: string,
  userJob: string,
  userEmail: string,
  status: string,
  color: number,
  userDesc: string
};
interface SetUserDataType {
  isChat: boolean,
  userId: number,
  userName: string,
  uuid: string,
  userImage: string,
  color: number,
  checkPersonInbox: boolean,
  toggle: boolean
};

function RightSideBox({userListData} : {userListData : any}) {
  const params = useParams();

  const { isLoading: isLoadingPeopleData, data : peopleListData } = useQuery('peopleList', () => getPeopleList(Number(params.workspaceId)));

  const [toggle, setToggle] = useState(false);
  const [member, setMember] = useState<any>([]);

  const [statusArr, setStatusArr] = useState<any>();
  const [peopleArr, setPeopleArr] = useState<any>([]);

  const [isChat, setIsChat] = useState(false); // 사람 클릭시, 채팅방 클릭시 채팅방으로 이동
  const [userId, setUserId] = useState<number>(); // 채팅방 id <Chat /> 에 넘겨주기
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userJob, setUserJob] = useState('');
  const [color, setColor] = useState<number>();

  const [uuid, setUuid] = useState('');
  const [checkPersonInbox, setCheckPersonInbox] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if(peopleListData) setPeopleArr(peopleListData);
  }, [peopleListData, isLoadingPeopleData]);

  useEffect(() => {
    if (location.state === null) return;
    setUserData({isChat : true, userId : location.state.userId, userName : location.state.userName, userImage : location.state.userImage, color : location.state.color, uuid : location.state.uuid, checkPersonInbox : false, toggle : true});
  }, [])

  const onClickMemberHandler = () => {
    setToggle(false);
    setIsChat(false);
    logEvent('Member button from Right side bar', {from: 'Main page Right side bar'});
  };
  const onClickInboxHandler = () => {
    setToggle(true);
    setIsChat(false);
    logEvent('Inbox button from Right side bar', {from: 'Main page Right side bar'})
  };
  // 바뀐 status을 배열에 적용

  useEffect(() => {
    setMember(peopleArr);
  }, [peopleArr]);

  const peopleData = ({isChat, userId, userName, toggle, checkPersonInbox, userJob, userImage, color}:{search:string, isChat:boolean, userId:number|undefined,userName:string,toggle:boolean,checkPersonInbox:boolean,userJob:string,userImage:string,color:number|undefined}) => {
    setIsChat(isChat)
    setUserId(userId)
    setToggle(toggle)
    setCheckPersonInbox(checkPersonInbox)
    setUserName(userName)
    setUserJob(userJob)
    setUserImage(userImage)
    setColor(color)
  };

  const searchMember = (search : string) => {
    setMember(peopleArr.filter((item: MemberDataType)=>item?.userName.toLowerCase().includes(search?.toLowerCase())));
  };
  const setUserData = ({isChat, userId, userName, userImage, color, uuid, checkPersonInbox, toggle}:SetUserDataType) => {
    setIsChat(isChat);
    setUserId(userId);
    setUserName(userName);
    setUserImage(userImage);
    setUuid(uuid);
    setColor(color);
    setToggle(toggle);
    setCheckPersonInbox(checkPersonInbox);
  };

  // 배경 스크롤 막기
  const onMouseOverRightSideBox = () => {
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      width: 100%;
      overflow-y: scroll;
    `;
  };
  const onMouseOutRightSideBox = () => {
    const scrollY = document.body.style.top;
    document.body.style.cssText = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  };
 
  return (
    <StContainer onMouseOver={onMouseOverRightSideBox} onMouseOut={onMouseOutRightSideBox}>
      <StSelectBox>
        { toggle ? <StMember onClick={onClickMemberHandler} >멤버</StMember> : <StMemberTrue>멤버</StMemberTrue> }
        { toggle ? <StInboxTrue>인박스</StInboxTrue> : <StInbox onClick={onClickInboxHandler} >인박스</StInbox>}
      </StSelectBox>
      {
        isChat
          ?
          <StChatBox>
            <Chat userId={userId} uuid={uuid} checkPersonInbox={checkPersonInbox} userName={userName} userJob={userJob} userImage={userImage} color={Number(color)} workspaceId={Number(params.workspaceId)} setToggle={v=>setToggle(v)} setIsChat={v=>setIsChat(v)} />
          </StChatBox>
          :
          <>
          {
            toggle 
              ?
              <StMessageListBox>
                <MessageBox 
                  workspaceId={Number(params.workspaceId)}
                  setUserData={setUserData}
                />
              </StMessageListBox>
              :
              <StPeopleListBox>
                <MembersBox 
                  member={member}
                  searchMember={searchMember}
                  peopleData={peopleData}
                />
              </StPeopleListBox>
          }
          </>
      }
    </StContainer>
  )
}

export default RightSideBox;

const StContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const StSelectBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 36px;
  padding: 32px 0px 0px 0px;
`;

const StChatBox = styled.div`
  height:92%;
`;

const StMemberTrue = styled.h3`
  color: #007AFF;
  border-bottom: 2px solid #007AFF;
  cursor: pointer;
`;
const StMember = styled.h3`
  cursor: pointer;
`;
const StInboxTrue = styled.h3`
  color: #007AFF;
  border-bottom: 2px solid #007AFF;
  cursor: pointer;
`;
const StInbox = styled.h3`
  cursor: pointer;
`;

const StPeopleListBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;

const StMessageListBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;