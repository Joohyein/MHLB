import styled from "styled-components";
import { useState } from "react";

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

function PersonBox({member, peopleData, isCheckMe}: {member: MemberDataType, peopleData:any, isCheckMe:number}) {
  const [isHovering, setIsHovering] = useState(false);
  const onClickPersonHandler = (userId:number, userName:string, userImage:string, userJob:string, color:number) => {
    if(isCheckMe === userId) return;
    peopleData({isChat:true, userId, userName, toggle:true, checkPersonInbox:true, userJob, userImage, color})
  };
  const onMouseOverHandler = (status:string) => {
    setIsHovering(true)
  };
  return (
    <StMembersBox onMouseOver={() => onMouseOverHandler(member?.status)} onMouseOut={() => setIsHovering(false)} key={member?.userId} onClick={()=>onClickPersonHandler(member?.userId, member?.userName, member?.userImage, member?.userJob, member?.color)} >
      <StDivideBox>
        <StProfileImg src={member?.userImage} />
        <StNameRoleBox>
          <StName>{member?.userName}</StName>
          <StJob>{member?.userJob}</StJob>
        </StNameRoleBox>
      </StDivideBox>
      {member?.color === 0 ? <StStatusGreen></StStatusGreen> : member?.color === 1 ? <StStatusYellow></StStatusYellow> : member?.color === 2 ? <StStatusRed></StStatusRed> : member?.color === 3 ? <StStatusGray></StStatusGray> : null}          
      {isHovering && <StHovering>{member?.status}</StHovering>}
    </StMembersBox>
  )
}

export default PersonBox;

const StMembersBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f1f1f1;
  cursor: pointer;
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
  display: inline-block;
  width: 128px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  width: 163px;
  height: 30px;
  font-size: 12px;
  color: #ffffff;
  opacity: 0.8;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 24px;
  left: -186px;
  background-color: #303030;
  border-radius: 4px;
`;