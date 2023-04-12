import styled from "styled-components";
import defaultWorkspaceImg from '../../asset/img/DefaultWorkspaceImage.png'
import Plus from "../../asset/icons/Plus";

function CreateWorkspaceSlide() {
  return (
    <StContainer>
      <StTitle>편리한 워크스페이스 생성</StTitle>
      <StDesc>새 워크스페이스 생성 버튼을 누르고 워크스페이스를 생성해 보세요</StDesc>
      <StExBox>
        <StMemberInviteButton>워크스페이스 생성<Plus size = '24' fill = 'white'/></StMemberInviteButton>
        <StDevide>
          <StBarBox>
            <StImage src={defaultWorkspaceImg} />
            <StWorkspaceTitle>Giga Jet</StWorkspaceTitle>
            <StWorkspaceDesc>We create innovation</StWorkspaceDesc>
          </StBarBox>
          <StBarBox>
            <StImage src={defaultWorkspaceImg} />
            <StWorkspaceTitle>핀 미</StWorkspaceTitle>
            <StWorkspaceDesc>행복코딩을 하는 사람들의 모임</StWorkspaceDesc>
          </StBarBox>
          <StBarBox>
            <StImage src={defaultWorkspaceImg} />
            <StWorkspaceTitle>Coulor Ball</StWorkspaceTitle>
            <StWorkspaceDesc>We create innovation</StWorkspaceDesc>
          </StBarBox>
        </StDevide>
      </StExBox>
    </StContainer>
  )
}

export default CreateWorkspaceSlide;

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
  };
  @media screen and (max-width : 688px) {
    width : 336px;
  };
`;
const StTitle = styled.h3`
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 32px;
`;
const StDesc = styled.div`
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  h3 {
    font-size: 16px;
    font-weight: 400;
  }
`;

const StExBox = styled.div`
  width: 100%;
  height: 412px;
  padding-bottom: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 24px;
`;
const StMemberInviteButton = styled.button`
  border : none;
  border-radius : 4px;
  margin-right: 12px;
  padding : 8px 16px;
  background : #007aff;
  color : white;
  font-size : 16px;
  font-weight : 700;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 186px;
`;
const StDevide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: 100%;
  height: 100%;
  padding: 24px 0;
  box-sizing: border-box;
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
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  gap: 12px;
`;

const StImage = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  margin-bottom: 12px;
`;
const StWorkspaceTitle = styled.h3`
  font-size: 24px;
  font-weight: 900;
`;
const StWorkspaceDesc = styled.h3`
  font-size: 16px;
  font-weight: 300;
  width: 212px;
  text-align: center;
`;