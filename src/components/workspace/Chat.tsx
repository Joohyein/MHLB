import { useEffect, useState } from "react";
import styled from "styled-components";

function Chat({userId, uuid, checkPersonInbox}:{userId:number|undefined, uuid:string, checkPersonInbox:boolean}) {
  const [messages, setMessages] = useState([]);

  // post요청으로 userId 보내고 uuid 받아서 웹소켓에서 구독(url)에 넣기
  // 사람 목록에서 클릭했는지 채팅 목록에서 클릭했는지 구분하기 -> checkpersoninbox - false(messagebox), true(personbox)
  // true이면 post요청 보내서 uuid 받기
  // checkpersoninbox가 false이면 websocket연결하기
  if(checkPersonInbox) {
    // post 요청 
  }
  useEffect(()=>{
    if(!checkPersonInbox){
      // websocket 연결
    }
  }, [uuid]);

  return (
    <StContainer>
      <StChatBox>

      </StChatBox>
      <StChatInputBox>
        <StChatInput />
        <StSendBtn>send</StSendBtn>
      </StChatInputBox>
    </StContainer>
  )
};

export default Chat;

const StContainer = styled.div`
  height: 100vh;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StChatBox = styled.div`
  height: 67%;
  background-color: pink;
`;


const StChatInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 20%;
`;
const StChatInput = styled.textarea`
  width: 100%;
  height: 32px;
  padding: 8px;
  box-sizing: border-box;
  :focus{
    outline: none;
  }
`;
const StSendBtn = styled.button`
  width: 100%;
  height: 32px;
`;