import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getPrevMessages, getUuid } from "../../api/rightSide";
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import { getCookie } from "../../cookie/cookies";
import ArrowBack from "../asset/icons/ArrowBack";
  // post요청으로 userId 보내고 uuid 받아서 웹소켓에서 구독(url)에 넣기
  // 사람 목록에서 클릭했는지 채팅 목록에서 클릭했는지 구분하기 -> checkpersoninbox - false(messagebox), true(personbox)
  // true이면 post요청 보내서 uuid 받기
  // checkpersoninbox가 false이면 websocket연결하기
function Chat({userId, uuid, checkPersonInbox, workspaceId, userName, userImage, userJob, color, setToggle, setIsChat}:{userId:number|undefined, uuid:string; checkPersonInbox:boolean; userName:string; userJob:string; userImage:string; color:number; workspaceId:number, setToggle:(v:boolean)=>void; setIsChat:(v:boolean)=>void}) {
  // const { data : prevMessagesData } = useQuery('prevMessages', async() => getPrevMessages(workspaceId));

  const scrollRef = useRef<HTMLDivElement>(null);
  const cookie = { Authorization : getCookie('authorization') };

  const [messages, setMessages] = useState<any>([]);
  const [stompClient, setStompClient] = useState<any>(null);
  const [inputMessage, setInputMessage] = useState('');

  // if(checkPersonInbox) {
  //   getUuid(Number(userId));
  //   checkPersonInbox = false;
  // };

  // useEffect(()=>{
  //   if(!checkPersonInbox){
  //     // websocket 연결
  //     const socket = new SockJS(`${process.env.REACT_APP_BE_SERVER}`);
  //     const stompClient = Stomp.over(socket);

  //     stompClient.connect({}, () => {
  //       console.log("connected");
  //       stompClient.subscribe(`/sub/inbox/#${uuid}`, (data) => {
  //         const messageData = JSON.parse(data.body);
  //         console.log("message data :", messageData);
  //         setMessages((prev:any) => [...prev, messageData]);
  //       },
  //       cookie,
  //       );
  //       setStompClient(stompClient);
  //     })
  //   }
  // }, [uuid, checkPersonInbox]);

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

  const onClickBackBtnHandler = () => {
    setIsChat(false);
    setToggle(true);
  };

  const scrollToBottom = () => {
    if(scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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