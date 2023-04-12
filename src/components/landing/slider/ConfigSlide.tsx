import styled from "styled-components";
import Plus from "../../asset/icons/Plus";

function ConfigSlide() {
  return (
    <StContainer>
      <StTitle>워크스페이스 관리를 편리하게!</StTitle>
      <StDesc>워크스페이스 관리 페이지에서 멤버를 관리하고 초대를 할 수 있어요</StDesc>
      <StExBox>
      <StMemberInviteButton>멤버 추가하기<Plus size = '24' fill = 'white'/></StMemberInviteButton>
        <StMemberList>
          <StMemberInfoDiv>
            <StMemberProfileImage />
            <StMemberTextInfoDiv>
              <StMemberNameAndEmail>
                <StMemberName>가나다</StMemberName>
                <StMemberEmail>gnd@company.co</StMemberEmail>
              </StMemberNameAndEmail>
              <StMemberJob>CEO</StMemberJob>
            </StMemberTextInfoDiv>
            <StRoleDiv role="ADMIN" >
              <StRole>ADMIN</StRole>
            </StRoleDiv>
          </StMemberInfoDiv>
          <StMemberInfoDiv>
            <StMemberProfileImage />
            <StMemberTextInfoDiv>
              <StMemberNameAndEmail>
                <StMemberName>가나다</StMemberName>
                <StMemberEmail>gnd@company.co</StMemberEmail>
              </StMemberNameAndEmail>
              <StMemberJob>CTO</StMemberJob>
            </StMemberTextInfoDiv>
            <StRoleDiv>
              <StRoleCheckbox type = 'checkbox' checked onChange={() => {}} />
              <StRole>MANAGER</StRole>
            </StRoleDiv>
            <StMemberKickButton>삭제</StMemberKickButton>
          </StMemberInfoDiv>
          <StMemberInfoDiv>
            <StMemberProfileImage />
            <StMemberTextInfoDiv>
              <StMemberNameAndEmail>
                <StMemberName>가나다</StMemberName>
                <StMemberEmail>gnd@company.co</StMemberEmail>
              </StMemberNameAndEmail>
              <StMemberJob>COO</StMemberJob>
            </StMemberTextInfoDiv>
            <StRoleDiv>
              <StRoleCheckbox type = 'checkbox' />
              <StRole>MEMBER</StRole>
            </StRoleDiv>
            <StMemberKickButton>삭제</StMemberKickButton>
          </StMemberInfoDiv>
        </StMemberList>
      </StExBox>
    </StContainer>
  )
}

export default ConfigSlide;

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
const StDesc = styled.h3`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 64px;
`;

const StExBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 24px;
  border-radius: 6px;
`;

const StMemberInviteButton = styled.button`
  margin-left : 16px;
  border : none;
  border-radius : 4px;
  padding : 8px 16px;
  background : #007aff;
  color : white;
  font-size : 16px;
  font-weight : 700;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 156px;
`;

const StMemberList = styled.div`
  width : 100%;
  height : 100%;
  display : flex;
  flex-direction : column;
`;

const StMemberInfoDiv = styled.div`
  width : 100%;
  height : 80px;
  display : flex;
  flex-direction : row;
  justify-content : flex-start;
  align-items : center;
  border-bottom : 1px solid #f1f1f1;
`;

const StMemberProfileImage = styled.div`
  width : 48px;
  height : 48px;
  border-radius : 48px;
  background : gray;
  background-size : cover;
  background-position : center;
  margin-right : 16px;
`

const StMemberTextInfoDiv = styled.div`
  display : flex;
  justify-content : flex-start;
  flex-direction : column;
  gap : 4px;
  margin-right : auto;
`;

const StMemberNameAndEmail = styled.div`
  display : flex;
  align-items : flex-end;
  gap : 8px;
`;

const StMemberName = styled.div`
  font-size : 16px;
  font-weight : 700;
  color : #303030;
`;

const StMemberEmail = styled.div`
  font-size : 0.75rem;
  font-weight : 400;
  color : #7f7f7f;
`;

const StMemberJob = styled.div`
  font-size : 0.75rem;
  font-weight : 400;
  color : #7f7f7f;
`;

const StRoleDiv = styled.div`
  display : flex;
  justify-content : flex-end;
  gap : 8px;
  margin-right : ${(props : any) => props.role === 'ADMIN' ? '94px' : '32px' };
`;

const StRoleCheckbox = styled.input`
  
`;

const StRole = styled.div`
  font-size : 16px;
  font-weight : 700;
  color : #7f7f7f;
`;

const StMemberKickButton = styled.button`
  right : 0;
  background : #ff3b30;
  padding : 8px 16px;
  border-radius : 4px;
  border : none;
  height : 35px;
  color : white;
  font-size : 16px;
  font-weight : 700;
  transition : 200ms;
  &:hover {
    background : #ff645c;
    cursor : pointer;
  }
` ;