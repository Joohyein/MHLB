import styled from 'styled-components';
import { useState } from 'react';

interface MemberDataType {
  userId: number,
  userImage: string,
  userName: string,
  userJob: string,
  userEmail: string,
  status: string,
  color: number,
  description: string
};
// member array type지정하기
function PersonBox({member, search, setSearch, setIsChat, setUserId, setToggle, setCheckPersonInbox}: {member: any, search: string, setSearch: (v: string) => void, setIsChat: (v:boolean)=>void, setUserId: (v:number)=>void, setToggle: (v:boolean)=>void, setCheckPersonInbox:(v:boolean)=>void, setUserName:(v:string)=>void, setUserImage:(v:string)=>void, setUserJob:(v:string)=>void, setColor:(v:string)=>void}) {
  const [isHovering, setIsHovering] = useState(false);
  const onClickPersonHandler = (userId:number, userImage:string, userName:string, color:string, userJob:string) => {
    setToggle(true);
    setIsChat(true);
    setUserId(userId);
    setCheckPersonInbox(false);
  };

  return (
    <StContainer>
      <StInputBox>
        <StInput value={search} name="search" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} placeholder="이름으로 검색" />
      </StInputBox>
      {
        member?.map((item: MemberDataType) => {
          return(
            <StPersonBox key={item.userId} onClick={()=>onClickPersonHandler(item.userId, item.userImage, item.userName, item.status, item.userJob)} onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} >
              <StDivideBox>
                <StProfileImg />
                <StNameRoleBox>
                  <StName>{item.userName}</StName>
                  <StJob>{item.userJob}</StJob>
                </StNameRoleBox>
              </StDivideBox>
              {item.color === 0 ? <StStatusGreen></StStatusGreen> : item.color === 1 ? <StStatusYellow></StStatusYellow> : item.color === 2 ? <StStatusRed></StStatusRed> : item.color === 3 ? <StStatusGray></StStatusGray> : null}
              {isHovering ? <StHovering>{item.status}</StHovering> : null}
            </StPersonBox>
          )
        })
      }
    </StContainer>
  )
}

export default PersonBox;

const StContainer = styled.div`
  padding: 0px 18px 18px 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #eeeeee;
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
const StPersonBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StDivideBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
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
`;
const StJob = styled.h3`
  font-size: 12px;
  font-weight: 400;
  color: #A7A7A7;
`;
const StStatusGreen = styled.div`
  width: 8px;
  height: 8px;
  background-color: #34C759;
  border-radius: 50%;
`;
const StStatusYellow = styled.div`
  width: 8px;
  height: 8px;
  background-color: #FFCC01;
  border-radius: 50%;
`;
const StStatusRed = styled.div`
  width: 8px;
  height: 8px;
  background-color: #FF3B31;
  border-radius: 50%;
`;
const StStatusGray = styled.div`
  width: 8px;
  height: 8px;
  background-color: #7F7F7F;
  border-radius: 50%;
`;

const StHovering = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  position: absolute;
  bottom: 0px;
  left: -112px;
  background-color: #ffd573;
`;
