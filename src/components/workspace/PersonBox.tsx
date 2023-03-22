import styled from 'styled-components';
import { useState } from 'react';

interface MemberDataType {
  userId: number,
  userImage: string,
  userName: string,
  userJob: string,
  userEmail: string,
  status: string,
  description: string
};
// member array type지정하기
function PersonBox({member}: {member: any}) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <StContainer>
      {
        member?.map((item: MemberDataType) => {
          return(
            <StPersonBox key={item.userId} onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} >
              <StDivideBox>
                <StProfileImg />
                <StNameRoleBox>
                  <StName>{item.userName}</StName>
                  <StJob>{item.userJob}</StJob>
                </StNameRoleBox>
              </StDivideBox>
              <StStatus></StStatus>
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
  padding: 16px 18px 18px 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #eeeeee;
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
const StStatus = styled.div`
  width: 8px;
  height: 8px;
  background-color: #34C759;
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
