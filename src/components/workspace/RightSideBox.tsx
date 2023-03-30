import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getPeopleList } from "../../api/rightSide";
import { getCookie } from "../../cookie/cookies";
import MembersBox from "./MembersBox";
import { EventSourcePolyfill } from "event-source-polyfill";
import MessageBox from "./MessageBox";
import Chat from "./Chat";
import { useParams } from "react-router-dom";

interface MemberDataType {
  description: string,
  status: string,
  color: number,
  userEmail: string,
  userId: number,
  userImage: string,
  userJob: string,
  userName: string
};

function RightSideBox() {
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

  useEffect(() => {
    if(peopleListData) setPeopleArr(peopleListData);
  }, [peopleListData, isLoadingPeopleData]);


  const EventSource = EventSourcePolyfill;

  useEffect(() => {
    const eventSource = new EventSource(`${process.env.REACT_APP_BE_SERVER}/api/status/${params.workspaceId}/connect`,
      {
        headers: { Authorization: getCookie("authorization")},
        withCredentials: true
      }
    );

    eventSource.addEventListener('connect', (e: any) => { 
      const { data : receiveData } = e;
      // console.log('connect: ', receiveData);
    });
    eventSource.addEventListener('status changed', (e: any) => {
      const { data : statusChangedData } = e;
      // console.log("status changed data : ", statusChangedData);
      setStatusArr(e);
    });
  }, []);

  useEffect(() => {
    if(peopleArr && statusArr) {
      for(let i = 0; i < peopleArr.length; i++) {
        if(peopleArr[i].userId === statusArr.userId) {
          peopleArr[i].status = statusArr.status;
          peopleArr[i].color = statusArr.color;
        }
      }
    }
    const currentUser = peopleArr[0];
    const tempArr = peopleArr.slice(1);
    tempArr.sort((a:MemberDataType, b:MemberDataType) => {
      if(a.userName > b.userName) return 1;
      if(a.userName < b.userName) return -1;
    }).sort((a: MemberDataType, b: MemberDataType) => {
      if(a.color > b.color) return 1;
      if(a.color < b.color) return -1;
    }).unshift(currentUser);
    setMember(tempArr);
  }, [peopleArr, statusArr]);

  const onClickMemberHandler = () => {
    setToggle(false);
    setIsChat(false);
  };
  const onClickInboxHandler = () => {
    setToggle(true);
    setIsChat(false);
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

  return (
    <StContainer>
      <StSelectBox>
        { toggle ? <StMember onClick={onClickMemberHandler} >멤버</StMember> : <StMemberTrue>멤버</StMemberTrue> }
        { toggle ? <StInboxTrue>인박스</StInboxTrue> : <StInbox onClick={onClickInboxHandler} >인박스</StInbox>}
      </StSelectBox>
      {
        isChat
          ?
          <StChatBox>
            <Chat isChat={isChat} userId={userId} uuid={uuid} checkPersonInbox={checkPersonInbox} userName={userName} userJob={userJob} userImage={userImage} color={Number(color)} workspaceId={Number(params.workspaceId)} setToggle={v=>setToggle(v)} setIsChat={v=>setIsChat(v)} />
          </StChatBox>
          :
          <>
          {
            toggle 
              ?
              <StMessageListBox>
                <MessageBox 
                  setIsChat={(v:boolean)=>setIsChat(v)} 
                  setCheckPersonInbox={(v)=>setCheckPersonInbox(v)}
                  workspaceId={Number(params.workspaceId)}
                  setUuid={v=>setUuid(v)}
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
  padding: 16px 0px 0px 0px;
  height: 8%;
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
  
`;

const StMessageListBox = styled.div`

`;