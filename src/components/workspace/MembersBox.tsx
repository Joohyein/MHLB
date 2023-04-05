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
              <PersonBox key={item.userId} member={item} peopleData={peopleData} isCheckMe={member[0].userId} />
            )
          })
        }
      </StPersonContainer>
    </StContainer>
  )
}
export default MembersBox;

const StContainer = styled.div`
  padding: 0px 18px 18px 16px;
  box-sizing: border-box;
  width: 100%;
  height: 92%;
`;

const StInputBox = styled.div`
  padding: 0px 24px 12px 24px;
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
  &::placeholder {
    color: #B1B1B1;
    font-weight: 200;
  }
`;

const StPersonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 88%;
  overflow-y: auto;
`;
