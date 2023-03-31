import styled from "styled-components";
import { useQuery } from "react-query";
import { getChatList } from "../../api/rightSide";

interface ChatListType {
  uuid: string,
  userId: number,
  userImage: string,
  userName: string,
  lastChat: string,
  message: string,
  unreadMessages: number
};
  // setIsChat은 true, checkpersoninbox은 false, uuid 넘겨주기
  // 시간 추가
function MessageBox({setIsChat, setCheckPersonInbox, workspaceId, setUuid, setUserId}:{setIsChat:(v:boolean)=>void, setCheckPersonInbox:(v:boolean)=>void, workspaceId:number, setUuid:(v:string)=>void, setUserId:(v:number)=>void}) {
  
  const { data: chatListData} = useQuery('chatList', () => getChatList(workspaceId))
  console.log("chat list data:", chatListData);

  const onClickChatRoomHandler = (uuid:string, userId:number) => {
    console.log("채팅방 클릭 uuid:", uuid);
    setUuid(uuid);
    setIsChat(true);
    setCheckPersonInbox(false);
    setUserId(userId);
  };
  
  return (
    <StContainer>
      <StInputBox>
        <StInput  name="search" placeholder="이름으로 검색" />
      </StInputBox>
      <StChatListBox>
        {
          chatListData?.map((item:ChatListType) => {
            return(
              <StChatRoom key={item.uuid} onClick={()=>onClickChatRoomHandler(item.uuid, item.userId)}>
                <StUserDatabox>
                <StUserImage src={item.userImage} />
                <StUserNameMsg>
                    <StUserName>{item.userName}</StUserName>
                    <StLastMsg>{item.message}</StLastMsg>
                </StUserNameMsg>
                </StUserDatabox>
                {item.unreadMessages && <StUnreadMsg>{item.unreadMessages}</StUnreadMsg>}
              </StChatRoom>
            )
          })
        }
      </StChatListBox>
    </StContainer>
  )
};

export default MessageBox;

const StContainer = styled.div`
  padding: 0px 18px 18px 16px;
  box-sizing: border-box;
`;

const StInputBox = styled.div`
  padding: 0px 24px 24px 24px;
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
const StChatListBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const StChatRoom = styled.div`
  padding: 16px 0px;
  border-bottom: 1px solid #f1f1f1;
  display:flex;
  justify-content: space-between;
  align-items:center;
`;
const StUserDatabox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const StUserImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;
const StUserNameMsg = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const StUserName = styled.h3`
  font-size: 16px;
  font-weight: 700;
`;
const StLastMsg = styled.h3`
  font-size: 12px;
  font-weight: 400;
  color: #7f7f7f;
`;
const StUnreadMsg = styled.div`
  width: 21px;
  height: 21px;
  background-color: #007AFF;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 12px;
`;