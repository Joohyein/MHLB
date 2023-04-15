import styled from "styled-components";
import { useState } from "react";
import { MemberDataType } from "./RightSideBox";

function PersonBox({member, peopleData, isCheckMe, setMouseHoverSection}: {member: MemberDataType, peopleData:any, isCheckMe:number, setMouseHoverSection : any}) {
  const [isHovering, setIsHovering] = useState(false);
  const onClickPersonHandler = (userId:number, userName:string, userImage:string, userJob:string, color:number) => {
    if(isCheckMe === userId) return;
    peopleData({isChat:true, userId, userName, toggle:true, checkPersonInbox:true, userJob, userImage, color})
  };

  const onMouseOverHandler = (status:string) => {
    setIsHovering(true);
    setMouseHoverSection(status);
  };

  const onMouseOverOutHandler = (status:string) => {
    setIsHovering(false)
    setMouseHoverSection(null)
  };
  
  return (
    <StMembersBox onMouseOver={() => onMouseOverHandler(member?.status)} onMouseOut={() => onMouseOverOutHandler(member?.status)} key={member?.userId} onClick={()=>onClickPersonHandler(member?.userId, member?.userName, member?.userImage, member?.userJob, member?.color)} >
      <StDivideBox>
        <StProfileImg src={member?.userImage} />
        <StNameRoleBox>
          <StName>{member?.userName}</StName>
          <StJob>{member?.userJob}</StJob>
        </StNameRoleBox>
      </StDivideBox>
      <StStatus bgColor={member?.color}></StStatus>
    </StMembersBox>
  )
}

export default PersonBox;

const StMembersBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 16px 0;
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
const StStatus = styled.div<{bgColor:number}>`
  width: 8px;
  height: 8px;
  transition : 200ms;
  background-color: ${props => props.bgColor === 0 ? '#34C759' : props.bgColor === 1 ? '#FFCC01' : props.bgColor === 2 ? '#FF3B31' : '#7F7F7F'};
  border-radius: 50%;
`;