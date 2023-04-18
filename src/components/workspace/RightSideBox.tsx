import { useEffect, useState } from "react";
import styled from "styled-components";
import MembersBox from "./MembersBox";
import MessageBox from "./MessageBox";
import Chat from "./Chat";
import { useLocation, useParams } from "react-router-dom";
import { logEvent } from "../../util/amplitude";
import useOutsideClick from "../../hooks/useOutsideClick";

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

function RightSideBox({userListData, setMouseHoverSection, chatListProps, setChatListProps, menuOpen} : {userListData : any, setMouseHoverSection : any, chatListProps : any, setChatListProps : any, menuOpen:boolean}) {
  const params = useParams();

  const [toggle, setToggle] = useState(false);
  const [member, setMember] = useState<any>([]);

  const [peopleArr, setPeopleArr] = useState<any>([]);

  const [isChat, setIsChat] = useState(false); 
  const [userId, setUserId] = useState<number>(); 
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userJob, setUserJob] = useState('');
  const [color, setColor] = useState<number>();

  const [uuid, setUuid] = useState('');
  const [checkPersonInbox, setCheckPersonInbox] = useState(true);
  const [openHelp, setOpenHelp] = useState(false);
  const dropdownRef = useOutsideClick(() => {setOpenHelp(false)});

  const location = useLocation();

  useEffect(() => {
    if(userListData) setPeopleArr(userListData);
  }, [userListData]);

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

  const peopleData = ({isChat, userId, userName, toggle, checkPersonInbox, userJob, userImage}:{search:string, isChat:boolean, userId:number|undefined,userName:string,toggle:boolean,checkPersonInbox:boolean,userJob:string,userImage:string}) => {
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

  const setUserData = ({isChat, userId, userName, userImage, uuid, checkPersonInbox, toggle}:SetUserDataType) => {
    setIsChat(isChat);
    setUserId(userId);
    setUserName(userName);
    setUserImage(userImage);
    setUuid(uuid);
    setToggle(toggle);
    setCheckPersonInbox(checkPersonInbox);
  };

  // 배경 스크롤 막기
  const onMouseOverRightSideBox = () => {
    document.body.style.overflow = 'hidden';
  };
  const onMouseOutRightSideBox = () => {
    document.body.style.overflow = 'auto';
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
            <Chat userId={userId} uuid={uuid} checkPersonInbox={checkPersonInbox} userName={userName} userJob={userJob} userImage={userImage} workspaceId={Number(params.workspaceId)} setChatListProps = {setChatListProps} setToggle={v=>setToggle(v)} setIsChat={v=>setIsChat(v)} />
          </StChatBox>
          :
          <StListBox>
          {toggle 
            ? <MessageBox setUserData={setUserData} chatListProps = {chatListProps}/>
            : <MembersBox member={member} searchMember={searchMember} peopleData={peopleData} setMouseHoverSection = {setMouseHoverSection} />
          }
          </StListBox>
      }
      {!toggle && menuOpen && <StHelpBoxDiv ref={dropdownRef}>
        <StHelpBtn onClick={() => setOpenHelp(!openHelp)}>?</StHelpBtn>
        {openHelp
            && <StHelpDropdownDiv>
                <StHelpDropdownContent><StStatus bgColor={0}></StStatus>근무</StHelpDropdownContent>
                <StHelpDropdownContent><StStatus bgColor={1}></StStatus>회의, 식사, 자리비움</StHelpDropdownContent>
                <StHelpDropdownContent><StStatus bgColor={2}></StStatus>출장</StHelpDropdownContent>
                <StHelpDropdownContent><StStatus bgColor={3}></StStatus>휴가, 업무 종료</StHelpDropdownContent>
            </StHelpDropdownDiv>
        }
      </StHelpBoxDiv>}
    </StContainer>
  )
}

export default RightSideBox;

const StContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
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

const StListBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;

const StHelpBoxDiv = styled.div`

`;
const StHelpBtn = styled.button`
    position: absolute;
    bottom: 16px;
    left: -64px;
    z-index: 999;
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    width : 48px;
    height : 48px;
    border: none;
    border-radius : 64px;
    background-color : white;
    box-shadow : 0px 0px 1rem rgba(0, 0, 0, 0.1);
    font-size: 24px;
    color: #303030;
    cursor : pointer;
`;


const StHelpDropdownDiv = styled.div`
    position : absolute;
    background-color : white;
    border-radius : 4px;
    width : auto;
    height : auto;
    bottom: 24px;
    left : -264px;
    box-shadow : 0px 0px 1rem rgba(0, 0, 0, 0.05);
    padding : 16px;
    display : flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap : 16px;
    z-index: 4;
`

const StHelpDropdownContent = styled.div`
    font-size : 1rem;
    font-weight : 400;
    color : #303030;
    transition : 200ms;
    display: flex;
    align-items: center;
    gap: 4px;
`;
const StStatus = styled.div<{bgColor:number}>`
  width: 8px;
  height: 8px;
  transition : 200ms;
  background-color: ${props => props.bgColor === 0 ? '#34C759' : props.bgColor === 1 ? '#FFCC01' : props.bgColor === 2 ? '#FF3B31' : '#7F7F7F'};
  border-radius: 50%;
  margin-right: 4px;
`;