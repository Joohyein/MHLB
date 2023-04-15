import styled from "styled-components";

interface ChatListType {
  uuid: string,
  userId: number,
  userImage: string,
  userName: string,
  lastChat: string,
  message: string,
  unreadMessages: number,
  unreadMessage : boolean
};

function MessageBox({setUserData, chatListProps}:{setUserData:any, chatListProps : any}) {

  const onClickChatRoomHandler = (uuid:string, userId:number, userName:string, userImage:string) => {
    setUserData({isChat:true, userId:userId, userName:userName, uuid:uuid, userImage: userImage, checkPersonInbox:false, toggle:true})
  };
  return (
    <StContainer>
      <StInputBox>
        <StInput name="search" placeholder="이름으로 검색(추후 개발)" />
      </StInputBox>
      <StChatListBox>
        {
          chatListProps?.map((item:ChatListType) => {
            return (
            chatListProps.length ?
              <StChatRoom key={item.userId} onClick={()=>onClickChatRoomHandler(item.uuid, item.userId, item.userName, item.userImage)}>
                <StUserDatabox>
                <StUserImage src={item.userImage} />
                <StUserNameMsg>
                    <StUserName>{item.userName}</StUserName>
                    <StLastMsg>{item.message}</StLastMsg>
                </StUserNameMsg>
                </StUserDatabox>
                {item.unreadMessages === 0 ? null : <StUnreadMsg>{item.unreadMessages}</StUnreadMsg>}
              </StChatRoom>
             :  <StNoneText>아직 대화방이 없습니다.</StNoneText> )
          })
        }
      </StChatListBox>
    </StContainer>
  )
};

export default MessageBox;

const StContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const StInputBox = styled.div`
  margin-top : 16px;
  width: 100%;
  box-sizing: border-box;
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
  height: 88%;
`;
const StChatRoom = styled.div`
  padding: 16px 0px;
  border-bottom: 1px solid #f1f1f1;
  display:flex;
  justify-content: space-between;
  align-items:center;
  cursor: pointer;
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
  display: inline-block;
  width: 138px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
const StNoneText = styled.h3`
  font-size: 12px;
  color: #7f7f7f;
`;