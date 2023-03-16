import Wrapper from "../components/common/Wrapper";
import styled from "styled-components";
import ArrowBack from "../components/asset/icons/ArrowBack";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUserData, editUserName } from "../api/myPage";
import LeaveWorkspaceModal from "../components/workspaceConfig/LeaveWorkspaceModal";
import useOutsideClick from "../hooks/useOutsideClick";

const MyPage = () => {
  // const { data } = useQuery('user', getUserData);
  // console.log(data);

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [leaveModal, setLeaveModal] = useState(false);
  const modalRef = useOutsideClick(() => setLeaveModal(false));

  // const queryClient = useQueryClient();
  // const mutation = useMutation(editUserName, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('user');
  //   }
  // });


  const onClickEditHandler = (userName: string) => {
    if(!userName) {
      alert('이름을 입력해주세요');
      return;
    }
    setEdit(false);
    // mutation.mutate(userName);
  };
  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') onClickEditHandler(name);
  };

  const leaveModalOpenHandler = () => {
    setLeaveModal(true);
    document.body.style.overflow = "hidden";
  }

  return (
    <Wrapper>
      <StContainer>
        <ArrowBack size="24" fill="#363636" cursor="pointer"/>
        <StTitle>마이 페이지</StTitle>
        <StProfileImg>
          <StSub>프로필 이미지</StSub>
          <StImg src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' />
        </StProfileImg>

        <StEditContainer>
          <StSub>내 이름</StSub>
          <StEditBox>
            {
              edit
                ?
                <>
                  <StEditInput 
                    name="userName"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)}
                    onKeyPress={onKeyPressHandler}
                  />
                  <h5 onClick={() => onClickEditHandler(name)}>Done</h5>
                </>
                :
                <>
                  <h3>username</h3>
                  <h5 onClick={() => setEdit(true)}>Edit</h5>
                </>
            }
          </StEditBox>
        </StEditContainer>

        <StEditContainer>
          <StSub>직업</StSub>
          <StEditBox>
            <h3>개발자</h3>
            <h5>Edit</h5>
          </StEditBox>
        </StEditContainer>

        <StEditContainer>
          <StSub>상태 메시지</StSub>
          <StEditBox>
            <h3>내 이름은 황지상</h3>
            <h5>Edit</h5>
          </StEditBox>
        </StEditContainer>

        <StMyWorkspaceContainer>
          <StSub>내 워크스페이스</StSub>

          <StInvited>
            <StInvitedWorkspaceData>
              <StWorkspaceImg src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'/>
              <StWorkspaceNameSub>
                <h3>테슬라</h3>
                <h5>워크스페이스에 대한 설명이 이곳에 들어갑니다~~~</h5>
              </StWorkspaceNameSub>
            </StInvitedWorkspaceData>
            <StBtnBox>
              <StAcceptBtn>수락</StAcceptBtn>
              <StRejectBtn>거절</StRejectBtn>
            </StBtnBox>
          </StInvited>

          <StWorkspaceBox>
            <StWorkspaceData>
              <StWorkspaceImg src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'/>
              <StContributionBox>
                <h3>테슬라에서의 나의 기여도</h3>
                <StContribution>
                  <StDone></StDone>
                  <StRemain></StRemain>
                </StContribution>
              </StContributionBox>
            </StWorkspaceData>

            <StWithdrawBtn onClick={leaveModalOpenHandler}>워크스페이스 탈퇴</StWithdrawBtn>

          </StWorkspaceBox>
        </StMyWorkspaceContainer>
      </StContainer>
      {
        leaveModal
          ?
          <LeaveWorkspaceModal 
            modalRef={modalRef}
            setLeaveModal={(v: boolean) => setLeaveModal(v)}
          />
          :
          null
      }
    </Wrapper>
  )
};

export default MyPage;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
  width: 80%;
  height: 100%;
  margin: 32px;
`;
const StTitle = styled.h3`
  font-size: 32px;
`;

const StSub = styled.h3`
  font-size: 18px;
  font-weight: 500;
`;
const StProfileImg  = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const StImg = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 50%;
`;

const StEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const StEditBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  h3 {
    font-size: 14px;
    font-weight: 400;
  }
  h5 {
    font-size: 14px;
    color: #007AFF;
    font-weight: 400;
    cursor: pointer;
  }
`;
const StEditInput = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  &:focus {
    outline : none;
  }
`;

// 내 워크스페이스
const StMyWorkspaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const StWorkspaceImg = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;
const StInvited = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;
const StInvitedWorkspaceData = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const StWorkspaceNameSub = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  h3 {
    font-size: 16px;
    font-weight: 400;
  }
  h5 {
    font-size: 14px;
    font-weight: 400;
    color: gray;
  }
`;
const StBtnBox = styled.div`
  display: flex;
  gap: 8px;
`;
const StAcceptBtn = styled.button`
  
`;
const StRejectBtn = styled.button`
  
`;

const StWorkspaceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;
const StWorkspaceData = styled.div`
  display: flex;
  gap: 12px;
`;
const StContributionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  h3 {
  font-size: 16px;
  font-weight: 400;
  }
`;

const StContribution = styled.div`
  width: 512px;
  height: 12px;
  display: flex;
`;
const StDone = styled.div`
  width: 70%;
  height: 100%;
  background-color: #0F82FF;
`;
const StRemain = styled.div`
  width: 30%;
  height: 100%;
  background-color: #D9D9D9;
`;
const StWithdrawBtn = styled.button`
  
`;