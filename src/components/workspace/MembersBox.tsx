import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PersonBox from './PersonBox';
import ArrowUp from '../asset/icons/ArrowUp';

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showBtn, setShowBtn] = useState(false);

  const onChangeInputValue = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    searchMember(inputValue);
  }, [inputValue]);

  const onClickScrollTop = () => {
    if(scrollRef.current) scrollRef.current.scrollTo({top: 0, behavior:'smooth'})
  };

  useEffect(() => {
    console.log(scrollRef.current?.scrollHeight)
    const onShowBtn = () => {
      if(scrollRef.current && scrollRef.current.scrollTop > 24) setShowBtn(true);
      else setShowBtn(false);
    }
    scrollRef.current?.addEventListener('scroll', onShowBtn);
    return () => {scrollRef.current?.removeEventListener('scroll', onShowBtn)}
  }, [scrollRef.current?.scrollHeight]);

  return (
    <StContainer>
      <StInputBox>
        <StInput value={inputValue} name="search" onChange={onChangeInputValue} placeholder="이름으로 검색" />
      </StInputBox>
      <StPersonContainer ref={scrollRef}>
        {
          member?.map((item: MemberDataType) => {
            return(
              <PersonBox key={item.userId} member={item} peopleData={peopleData} isCheckMe={member[0].userId} />
            )
          })
        }
      </StPersonContainer>
      { showBtn && <StScrollTopBtn>
        <ArrowUp size="24" fill="#707070" onClick={onClickScrollTop} cursor="pointer" />
      </StScrollTopBtn>}
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
  padding: 0px 12px 24px 12px;
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
  height: 84%;
  overflow-y: auto;
  position: relative;
  margin: 12px 0px;
`;

const StScrollTopBtn = styled.button`
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : center;
  width : 48px;
  height : 48px;
  border-radius : 64px;
  border: none;
  background-color : white;
  box-shadow : 0px 0px 1rem rgba(0, 0, 0, 0.1);
  position : absolute;
  bottom : 32px;
  right : 32px;
  z-index: 999;
  cursor : pointer;
`;