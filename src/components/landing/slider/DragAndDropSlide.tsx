import styled from "styled-components";
import defaultAvatarImg from '../../asset/img/DefaultAvatar.png';
import defaultWorkspaceImg from '../../asset/img/DefaultWorkspaceImage.png'

function DragAndDropSlide() {
  return (
    <StContainer>
      <StTitle>쉽고 빠른 드래그 앤 드롭!</StTitle>
      <StDesc>
        <h3>파랗게 하이라이팅 된 내 뱃지를 드래그 앤 드롭으로 움직여요!</h3>
        <h3>나의 워크스페이스 목록의 순서를 드래그 앤 드롭으로 변경해요!</h3>
      </StDesc>
      <StExBox>
        <StLeftBar>
          <StWorkspaceImg src={defaultWorkspaceImg} alt="image" />
          <StWorkspaceImg src={defaultWorkspaceImg} alt="image" />
          <StWorkspaceImg src={defaultWorkspaceImg} alt="image" />
        </StLeftBar>
        <StBarBox>
          <StStatusName>근무 ✏️</StStatusName>
          <StProfileBox>
            <StUserBox>
              <StUserImg src={defaultAvatarImg} alt="image" />
              <h6>임성춘</h6>
            </StUserBox>
            <StUserBox>
              <StUserImg src={defaultAvatarImg} alt="image" />
              <h6>성경화</h6>
            </StUserBox>
            <StUserBox>
              <StUserImg src={defaultAvatarImg} alt="image" />
              <h6>전영태</h6>
            </StUserBox>
            <StUserBox>
              <StUserImg src={defaultAvatarImg} alt="image" />
              <h6>윤 설</h6>
            </StUserBox>
            <StUserBox>
              <StUserImg src={defaultAvatarImg} alt="image" />
              <h6>가나다</h6>
            </StUserBox>
            <StPlus>
              <h3>+12</h3>
            </StPlus>
          </StProfileBox>
        </StBarBox>
        <StBarBox>
          <StStatusName>식사 🍽️</StStatusName>
          <StProfileBox>
            <h5>현재 식사 중인 멤버가 없습니다.</h5>
          </StProfileBox>
        </StBarBox>
        <StBarBox>
          <StStatusName>업무 종료 🚀</StStatusName>
          <StProfileBox>
            <StUserBox>
              <StUserImg src={defaultAvatarImg} alt="image" />
              <h6>Vega</h6>
            </StUserBox>
            <StUserBox>
              <StUserImg src={defaultAvatarImg} alt="image" />
              <h6>Wong</h6>
            </StUserBox>
            <StPlus>
            </StPlus>
          </StProfileBox>
        </StBarBox>
      </StExBox>
    </StContainer>
  )
}

export default DragAndDropSlide;

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
  margin-bottom: 64px;
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
  height: 312px;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; 
  scrollbar-width: none; 
`;

const StLeftBar = styled.div`
  width: 76px;
  height: 310px;
  background: #FFFFFF;
  box-shadow: 0px 0px 16px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  padding: 12px 0;
  box-sizing: border-box;
`;

const StBarBox = styled.div`
  width: 252px;
  height: 310px;
  background: #FFFFFF;
  box-shadow: 0px 0px 16px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  border-radius: 6px;
`;

const StStatusName = styled.h3`
  font-size: 24px;
  border-bottom: 1px solid #f1f1f1;
  padding: 24px;
  box-sizing: border-box;
`;
const StProfileBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  flex-wrap: wrap;
  padding: 24px 0; 
  h5 {
    font-size: 12px;
    font-weight: 300;
    color: #303030;
    margin-bottom: 24px;
  };
`;
const StUserBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  h6 {
    font-weight: 400;
  }
`;
const StWorkspaceImg = styled.img`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background-color: gray;
`;
const StUserImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: gray;
`;
const StPlus = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    color: #7f7f7f;
  }
`;