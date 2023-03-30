import styled from "styled-components";
import { useState } from "react";

interface ChatListType {
  uuid: string,
  userImage: string,
  userName: string,
  lastChat: string,
  message: string,
  unreadMessages: number
};
// 클릭한 방의 uuid => MessageBox로 넘겨주기
function ChatRoom({chatListData}:{chatListData:ChatListType}) {

  return (
    <>
      <StChatRoom>
        <StUserDatabox>
        <StUserImage src={chatListData.userImage} />
        <StUserNameMsg>
            <StUserName>{chatListData.userName}</StUserName>
            <StLastMsg>{chatListData.message}</StLastMsg>
        </StUserNameMsg>
        </StUserDatabox>
        <StUnreadMsg>{chatListData.unreadMessages}</StUnreadMsg>
      </StChatRoom>
    </>
  )
}

export default ChatRoom;
const StChatRoom = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const StUserDatabox = styled.div`
  
`;
const StUserImage = styled.img`
  
`;
const StUserNameMsg = styled.div`
  
`;
const StUserName = styled.h3`
  
`;
const StLastMsg = styled.h3`
  
`;
const StUnreadMsg = styled.div`
  
`;