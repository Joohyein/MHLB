import styled from "styled-components";
function ChatSlide() {
  return (
    <StContainer>
      <StTitle>팀원들과 편리하게 소통하기!</StTitle>
      <StDesc>
        <h3>워크스페이스 오른쪽 바를 열면 멤버와 채팅을 할 수 있어요</h3>
        <h3>멤버 목록에서 멤버를 클릭하면 채팅을 시작할 수 있어요</h3>
      </StDesc>
      <StExBox>
        <StBarBox>
          <StSelectBox>
            <StInboxTrue>멤버</StInboxTrue>
            <StMember>인박스</StMember>
          </StSelectBox>
          <StMembersBox>
            <StDivideBox>
              <StProfileImg />
              <StNameRoleBox>
                <StName>가나다</StName>
                <StJob>CEO</StJob>
              </StNameRoleBox>
            </StDivideBox>
            <StStatus></StStatus>        
          </StMembersBox>
          <StMembersBox>
            <StDivideBox>
              <StProfileImg />
              <StNameRoleBox>
                <StName>가나다</StName>
                <StJob>CEO</StJob>
              </StNameRoleBox>
            </StDivideBox>
            <StStatus></StStatus>        
          </StMembersBox>
          <StMembersBox>
            <StDivideBox>
              <StProfileImg />
              <StNameRoleBox>
                <StName>가나다</StName>
                <StJob>CEO</StJob>
              </StNameRoleBox>
            </StDivideBox>
            <StStatus></StStatus>        
          </StMembersBox>
        </StBarBox>
        <StBarBox>
          <StSelectBox>
            <StMember>멤버</StMember>
            <StInboxTrue>인박스</StInboxTrue>
          </StSelectBox>
          <StMembersBox>
            <StDivideBox>
              <StProfileImg />
              <StNameRoleBox>
                <StName>가나다</StName>
                <StJob>회의 끝나면 메시지 부탁드립니다.</StJob>
              </StNameRoleBox>
            </StDivideBox>
            <StUnread>
              <h3>2</h3>
            </StUnread>
          </StMembersBox>
          <StMembersBox>
            <StDivideBox>
              <StProfileImg />
              <StNameRoleBox>
                <StName>가나다</StName>
                <StJob>회의 끝나면 메시지 부탁드립니다.</StJob>
              </StNameRoleBox>
            </StDivideBox>
            <StUnread>
              <h3>5</h3>
            </StUnread>
          </StMembersBox>
          <StMembersBox>
            <StDivideBox>
              <StProfileImg />
              <StNameRoleBox>
                <StName>가나다</StName>
                <StJob>회의 끝나면 메시지 부탁드립니다.</StJob>
              </StNameRoleBox>
            </StDivideBox>
          </StMembersBox>
        </StBarBox>
        <StBarBox>
          <StChatBox>
            <StMessagesBox>
              <StMessages flexDirection="row">
                <StMessagesOther>안녕하세요</StMessagesOther>
                <StMessagesOtherTime>12:34</StMessagesOtherTime>
              </StMessages>
              <StMessages flexDirection="row-reverse">
                <StMessagesMine>안녕하세요.</StMessagesMine>
                <StMessagesMineTime>12:36</StMessagesMineTime>
              </StMessages>
              <StMessages flexDirection="row-reverse">
                <StMessagesMine>회의 끝나면 메시지 부탁드릴게요.</StMessagesMine>
                <StMessagesMineTime>12:36</StMessagesMineTime>
              </StMessages>
            </StMessagesBox>
            <StChatInputBox>
              <StChatInput />
              <StSendBtn>메시지 보내기</StSendBtn>
            </StChatInputBox>
          </StChatBox>
        </StBarBox>
      </StExBox>
    </StContainer>
  )
}

export default ChatSlide;

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width : 1040px) and (min-width : 688px) {
    width : 688px;
  }
  @media screen and (max-width : 688px) {
    width : 336px;
  }
`;
const StTitle = styled.h3`
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 32px;
`;
const StDesc = styled.div`
  margin-bottom: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 8px;
  } 
`;

const StExBox = styled.div`
  width: 100%;
  height: 312px;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; 
  scrollbar-width: none; 
`;
const StBarBox = styled.div`
  width: 286px;
  height: 310px;
  background: #FFFFFF;
  box-shadow: 0px 0px 16px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  border-radius: 6px;
`;

const StSelectBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 36px;
  padding: 32px 0 12px 0;
`;

const StMember = styled.h3`
`;
const StInboxTrue = styled.h3`
  color: #007AFF;
  border-bottom: 2px solid #007AFF;
`;

const StMembersBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 16px 0;
  border-bottom: 1px solid #f1f1f1;
  box-sizing: border-box;
`;
const StDivideBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 0px 24px;
`;
const StProfileImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: gray;
`;
const StNameRoleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const StName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  width: 112px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StJob = styled.h3`
  font-size: 12px;
  font-weight: 400;
  color: #A7A7A7;
  display: inline-block;
  width: 128px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StStatus = styled.div`
  width: 8px;
  height: 8px;
  background-color: #34C759;
  border-radius: 50%;
`;

const StUnread = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #077aff;
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    color: #ffffff;
    font-size: 12px;
    font-weight: 400;
  }
`;
// Chat box
const StChatBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  position: relative;
  padding: 24px 12px;
  box-sizing: border-box;
`;
const StMessagesBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const StMessages = styled.div<{flexDirection:string}>`
  display: flex;
  flex-direction: ${props=>props.flexDirection};
  align-items: flex-end;
`;
const StMessagesOther = styled.div`
  font-size: 0.75rem;
  display: flex;
  background-color: #f3f3f3;
  padding: 8px;
  color: #303030;
  border-radius: 4px;
  margin-right: 4px;
  line-height: 18px;
`;
const StMessagesMine = styled.div`
  font-size: 0.75rem;
  display: flex;
  background-color: #007aff;
  padding: 8px;
  color: #ffffff;
  border-radius: 4px;
  margin-left: 4px;
  line-height: 18px;
`;
const StMessagesOtherTime = styled.div`
  font-size: 9px;
  color: #7f7f7f;
`;
const StMessagesMineTime = styled.div`
  font-size: 9px;
  color: #7f7f7f;
`;

const StChatInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 130px;
  position: absolute;
  bottom: 0;
  padding: 36px 24px 0 0;
  box-sizing: border-box;
`;
const StChatInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
`;
const StSendBtn = styled.button`
  width: 100%;
  height: 32px;
  background-color: #007aff;
  border: none;
  border-radius: 4px;
  color: #ffffff;
`;
