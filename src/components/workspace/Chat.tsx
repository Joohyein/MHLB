import { useState } from "react";
import styled from "styled-components";

function Chat({userId, uuid}:{userId:number|undefined, uuid:boolean}) {
  const [messages, setMessages] = useState([]);

  // post요청으로 userId 보내고 uuid 받아서 웹소켓에서 구독(url)에 넣기


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