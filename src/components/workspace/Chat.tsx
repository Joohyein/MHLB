import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getPrevMessages, getUuid } from "../../api/rightSide";
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import { getCookie } from "../../cookie/cookies";
  // post요청으로 userId 보내고 uuid 받아서 웹소켓에서 구독(url)에 넣기
  // 사람 목록에서 클릭했는지 채팅 목록에서 클릭했는지 구분하기 -> checkpersoninbox - false(messagebox), true(personbox)
  // true이면 post요청 보내서 uuid 받기
  // checkpersoninbox가 false이면 websocket연결하기
function Chat({userId, uuid, checkPersonInbox, workspaceId}:{userId:number|undefined, uuid:string; checkPersonInbox:boolean; userName:string; userJob:string; userImage:string; color:string; workspaceId:number}) {
  const { data : prevMessagesData } = useQuery('prevMessages', async() => getPrevMessages(workspaceId));

  const scrollRef = useRef<HTMLDivElement>(null);
  const cookie = { Authorization : getCookie('authorization') };

  const [messages, setMessages] = useState<any>([]);
  const [stompClient, setStompClient] = useState<any>(null);
  const [inputMessage, setInputMessage] = useState('');

  if(checkPersonInbox) {
    getUuid(Number(userId));
    checkPersonInbox = false;
  };

  useEffect(()=>{
    if(!checkPersonInbox){
      // websocket 연결
      const socket = new SockJS(`${process.env.REACT_APP_BE_SERVER}`);
      const stompClient = Stomp.over(socket);

      stompClient.connect({}, () => {
        console.log("connected");
        stompClient.subscribe(`/sub/inbox/#${uuid}`, (data) => {
          const messageData = JSON.parse(data.body);
          console.log("message data :", messageData);
          setMessages((prev:any) => [...prev, messageData]);
        },
        cookie,
        );
        setStompClient(stompClient);
      })
    }
  }, [uuid, checkPersonInbox]);

  const onKeyDownHandler = (e:any) => {
    if(e.keyCode === 13){
      if(!e.shiftKey){
        e.preventDefault();
        onSubmitHandler();
      }
    }
  };
  const onKeyPressHandler = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.keyCode === 13) onSubmitHandler();
  };
  const onSubmitHandler = () => {
    const sendData = {
      uuid,
      message: inputMessage,
    };
    if(inputMessage) {
      stompClient.send(`/pub/inbox/${workspaceId}`, { cookie }, JSON.stringify(sendData));
      setInputMessage('');
    }
  };

  const scrollToBottom = () => {
    if(scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <StContainer>
      <StChatBox ref={scrollRef}>

      </StChatBox>
      <StChatInputBox>
        <StChatInput 
          name='inputMessage'
          value={inputMessage} 
          onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{setInputMessage(e.target.value)}} 
          onKeyPress={onKeyPressHandler}
          onKeyDown={onKeyDownHandler}
        />
        <StSendBtn onClick={onSubmitHandler} >send</StSendBtn>
      </StChatInputBox>
    </StContainer>
  )
};

export default Chat;

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StChatBox = styled.div`
  height: 86%;
`;

const StChatInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 14%;
  padding: 16px;
`;
const StChatInput = styled.textarea`
  width: 100%;
  height: 32px;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  resize: none;
  :focus{
    outline: none;
    border: 1px solid #007aff;
  }
`;
const StSendBtn = styled.button`
  width: 100%;
  height: 32px;
`;