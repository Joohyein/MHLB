import styled from "styled-components";
import { useState } from "react";

function MessageBox({setIsChat}:{setIsChat:(v:boolean)=>void, setCheckPersonInbox:(v:boolean)=>void}) {
  // 방을 클릭했을 때 userId, uuId 둘 다 넘겨줘? 그럼 <Chat />에 uuid, userid 둘 다 넘겨줘? 
  // checkpersoninbox로 false 넘겨주기


  return (
    <StContainer>
      <StInputBox>
        <StInput  name="search" placeholder="이름으로 검색" />
      </StInputBox>
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