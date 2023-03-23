import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getPeopleList } from "../../api/rightSide";
import { getCookie } from "../../cookie/cookies";
import PersonBox from "./PersonBox";
import { EventSourcePolyfill } from "event-source-polyfill";

const workspaceId = 1;

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
  const { isLoading: isLoadingPeopleData, data : peopleListData } = useQuery('peopleList', async () => getPeopleList(workspaceId));

  const [statusArr, setStatusArr] = useState<any>();
  const [peopleArr, setPeopleArr] = useState<any>([]);

  useEffect(() => {
    if(peopleListData) setPeopleArr(peopleListData);
  }, [peopleListData, isLoadingPeopleData]);

  const EventSource = EventSourcePolyfill;

  useEffect(() => {
    const eventSource = new EventSource(`${process.env.REACT_APP_BE_SERVER}/api/status/${workspaceId}/connect`,
      {
        headers: { Authorization: getCookie("authorization")},
        withCredentials: true
      }
    );
    // console.log("eventsource: ", eventSource);

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

  // status 바꼈을 때 다시 정렬 - peopleArr 다시 정렬 / status, color value 변경
  useEffect(() => {
    // console.log(peopleArr);
    if(peopleArr && statusArr) {
      for(let i = 0; i < peopleArr.length; i++) {
        if(peopleArr[i].userId === statusArr.userId) {
          peopleArr[i].status = statusArr.status;
          peopleArr[i].color = statusArr.color;
        }
      }
    }
  }, [peopleArr, statusArr]);

  const [toggle, setToggle] = useState(false);
  const [memberClick, setMemberClick] = useState(true);
  const [inboxClick, setInboxClick] = useState(false);

  const [search, setSearch] = useState('');
  const [member, setMember] = useState<any>();
  const [memberCopy, setMemberCopy] = useState([]);

  // 바뀐 status을 배열에 적용
  useEffect(() => {
    const arr = peopleArr?.map((item:MemberDataType) => item);
    setMemberCopy(arr);
  }, [peopleArr]);

  const onClickMemberHandler = () => {
    setToggle(false);
    setMemberClick(true);
    setInboxClick(false);
  };
  const onClickInboxHandler = () => {
    setToggle(true);
    setMemberClick(false);
    setInboxClick(true);
  };

  useEffect(() => {
    setMember(memberCopy?.filter((item: MemberDataType)=>item.userName.toLowerCase().includes(search.toLowerCase())));
  }, [search, memberCopy]);

  useEffect(() => {
    setMember(member?.sort((a:MemberDataType, b:MemberDataType) => {
      if(a.userName > b.userName) return 1;
      if(a.userName < b.userName) return -1;
    }).sort((a: MemberDataType, b: MemberDataType) => {
      if(a.color > b.color) return 1;
      if(a.color < b.color) return -1;
    }));
  }, [member]);

  return (
    <StContainer>
      <StSelectBox>
        { memberClick ? <StMemberTrue>멤버</StMemberTrue> : <StMember onClick={onClickMemberHandler} >멤버</StMember> }
        { inboxClick ? <StInboxTrue>인박스</StInboxTrue> : <StInbox onClick={onClickInboxHandler} >인박스</StInbox>}
      </StSelectBox>

      <StInputBox>
        <StInput value={search} name="search" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} placeholder="Search People" />
      </StInputBox>
      {
        toggle 
          ?
          <StMessageListBox>

          </StMessageListBox>
          :
          <StPeopleListBox>
            <PersonBox member={member} />
          </StPeopleListBox>
      }
    </StContainer>
  )
}

export default RightSideBox;

const StContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const StSelectBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 36px;
  padding: 32px 32px 12px 32px;
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

const StInputBox = styled.div`
  padding: 0 24px 0 24px;
`;
const StInput = styled.input`
  padding: 12px 16px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-radius: 18px;
  box-shadow: 0 0 5px 0 lightgray;
  &:focus {
    outline: none;
  }
  &::-webkit-input-placeholder {
    color: #B1B1B1;
    font-weight: 200;
  }
`;

const StPeopleListBox = styled.div`
  
`;

const StMessageListBox = styled.div`
  
`;