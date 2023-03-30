import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PersonBox from './PersonBox';

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

function MembersBox({member, searchMember, peopleData}: {member: MemberDataType[], searchMember:any, peopleData:any}) {

  const [inputValue, setInputValue] = useState('');

  const onChangeInputValue = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    searchMember(inputValue);
  }, [inputValue])

  return (
    <StContainer>
      <StInputBox>
        <StInput value={inputValue} name="search" onChange={onChangeInputValue} placeholder="이름으로 검색" />
      </StInputBox>
      <StPersonContainer>
        {
          member?.map((item: MemberDataType) => {
            return(
              <PersonBox key={item.userId} member={item} peopleData={peopleData} />
            )
          })
        }
      </StPersonContainer>
      <button onClick = {() => {console.log('temp : ', member)}}>Re-render</button>
    </StContainer>
  )
}
// setStatus={v=>setStatus(v)} setIsHovering={v=>setIsHovering(v)}
export default MembersBox;

const StContainer = styled.div`
  padding: 0px 18px 18px 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #eeeeee;
`;

const StInputBox = styled.div`
  padding: 0px 24px 24px 24px;
`;
const StPersonContainer = styled.div`
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

const StMembersBox = styled.div`
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