import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { getPeopleList } from "../../api/rightSide";
import { getCookie } from "../../cookie/cookies";
import PersonBox from "./PersonBox";
import { EventSourcePolyfill } from "event-source-polyfill";

const workspaceId = 1;

function RightSideBox() {
  const { data : peopleListData } = useQuery('peopleList', async () => getPeopleList(workspaceId));

  const EventSource = EventSourcePolyfill;
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = new EventSource(`http://183.96.48.66:8080/api/status/1/connect`,
      {
        headers: { Authorization: getCookie("authorization")},
        withCredentials: true
      }
    );
    console.log("eventsource: ", eventSource);
    eventSource.addEventListener('message', (e:any) => {
      console.log("e: ", e);
      queryClient.invalidateQueries('peopleList');
    });
    eventSource.addEventListener('connect', (e: any) => {
      const { data : receiveData } = e;
      console.log('connect: ', receiveData);
    });
    eventSource.onerror = (e: any) => {
      console.log("result", e.data);
    };


  }, []);

  const [toggle, setToggle] = useState(false);
  const [memberClick, setMemberClick] = useState(true);
  const [inboxClick, setInboxClick] = useState(false);

  const [search, setSearch] = useState('');
  const [member, setMember] = useState<any>();
  const [memberCopy, setMemberCopy] = useState([]);

  // dependency array에 peopleListData 넣기
  useEffect(() => {
    const arr = peopleListData?.map((item:any) => item);
    setMemberCopy(arr);
  }, [peopleListData]);

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

  interface MemberDataType {
    description: string,
    status: string,
    userEmail: string,
    userId: number,
    userImage: string,
    userJob: string,
    userName: string
  };

  useEffect(() => {
    setMember(memberCopy?.filter((item: MemberDataType)=>item.userName.toLowerCase().includes(search.toLowerCase())));
  }, [search, memberCopy]);

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