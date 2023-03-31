import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getPrevMessages, getUuid } from "../../api/rightSide";
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import { getCookie } from "../../cookie/cookies";
import ArrowBack from "../asset/icons/ArrowBack";

function Chat({isChat,userId, uuid, checkPersonInbox, workspaceId, userName, userImage, userJob, color, setToggle, setIsChat}:{isChat:boolean;userId:number|undefined, uuid:string; checkPersonInbox:boolean; userName:string; userJob:string; userImage:string; color:number; workspaceId:number, setToggle:(v:boolean)=>void; setIsChat:(v:boolean)=>void}) {
  const { data : prevMessagesData } = useQuery('prevMessages', () => getPrevMessages(Number(workspaceId), Number(userId)));
  
  const [personBoxUuid, setPersonBoxUuid] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const cookie = { Authorization : getCookie('authorization') };

  const [messages, setMessages] = useState<any>([]); // 초깃값 넣기
  const [stompClient, setStompClient] = useState<any>(null);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(()=>{
    console.log("prevMessagesData:", prevMessagesData);
    if(prevMessagesData) setMessages(prevMessagesData);
  },[prevMessagesData]);

  if(checkPersonInbox) {
    getUuid(Number(workspaceId), Number(userId))
    .then((res)=>{
      setPersonBoxUuid(res);
    });
    checkPersonInbox = false;
  };

  useEffect(()=>{
    const socket = new SockJS(`${process.env.REACT_APP_BE_SERVER}/stomp/chat`); // 웹소켓을 통해 stomp브로커에 연결
    const stompClient = Stomp.over(socket);
    // setPersonBoxUuid(uuid);
    if(!checkPersonInbox && personBoxUuid){
      stompClient.connect({}, () => {
        console.log("websocket is connected");
        stompClient.subscribe(`/sub/${personBoxUuid}`, (data) => {
          const messageData = JSON.parse(data.body);
          console.log("message data :", messageData);
          setMessages((prev:any) => [...prev, messageData]);
        },
        cookie 
        );
        setStompClient(stompClient);
      });
      // if문으로 웹소켓 닫기 or return(unmount) 함수에서 웹소켓 닫기
    }
    return () => {
      if(!isChat) stompClient.disconnect();
    }
  }, [personBoxUuid, checkPersonInbox]);

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
      uuid: personBoxUuid,
      message: inputMessage,
      workspaceId,
    };
    if(inputMessage) {
      stompClient.send(`/pub/inbox`,{ cookie }, JSON.stringify(sendData));
      setInputMessage('');
    }
  };

  const onClickBackBtnHandler = () => {
    setIsChat(false);
    setToggle(true);
  };

  const scrollToBottom = () => {
    if(scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };
  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // scroll to bottom
  useEffect(()=>{
    if(scrollRef.current){
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    };
  },[messages]);

  return (
    <StContainer>
      <StBackBtn onClick={onClickBackBtnHandler}>
        <ArrowBack size="16" fill="#ffffff" cursor="pointer" />
        <h3>채팅 목록으로 돌아가기</h3>
        </StBackBtn>
      <StUserData>
        <StLeftBox>
          <StUserImage src={userImage} />
          <StNameJobBox>
            <StUserName>{userName}</StUserName>
            <StUserJob>{userJob}</StUserJob>
          </StNameJobBox>
        </StLeftBox>
        <StColor colorNum={color} ></StColor>
      </StUserData>
      <StChatBox ref={scrollRef}>
        {
          messages?.map((item:any, index:number)=>{
            return <div key={index}>{item.message}</div>
          })
        }
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
const StBackBtn = styled.button`
  display: flex;
  justify-content: center;
  gap: 8px;
  color: #ffffff;
  background-color: #007AFF;
  border:none;
  border-radius: 4px;
  padding: 8px 16px 8px 16px;
  cursor: pointer;
  h3{
    font-size: 16px;
    font-weight: 500;
  }
`;
const StUserData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f1f1f1;
  padding-top: 16px;
  box-sizing: border-box;
`;
const StLeftBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const StUserImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;
const StNameJobBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const StUserName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #303030;
`;
const StUserJob = styled.h3`
  font-size: 12px;
  font-weight: 400;
  color: #7f7f7f;
`;
const StColor = styled.div<{colorNum:number}>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props=>props.colorNum === 0 ? "#34C759" : props.colorNum === 1 ? "#FFCC01" : props.colorNum === 2 ? "#FF3B31" : "#FF3B31"};
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