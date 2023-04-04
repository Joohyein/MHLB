import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import {
  cancelInvite,
  getInviteMembers,
  inviteMember,
} from '../../api/invitation';
import Close from '../asset/icons/Close';
import Lottie from 'react-lottie';
// import animationData from '../../loadingData.json';
// import animationData from '../../animationData.json';
import animationData from '../../threeDot.json';

// const defaultOptions:any| Readonly<any> = { 
//   src:"https://assets10.lottiefiles.com/datafiles/nT4vnUFY9yay7QI/data.json",
//   background:"transparent",
//   animationData,
//   speed:"1",
//   loop:true,
//   controls:true,
//   autoplay:true,
// };

// const defaultOptions:any| Readonly<any> = { 
//   src:"https://assets3.lottiefiles.com/packages/lf20_irzds0pd.json",
//   background:"transparent",
//   animationData,
//   speed:"1",
//   loop:true,
//   controls:true,
//   autoplay:true,
// };

const defaultOptions:any| Readonly<any> = { 
  src:"https://assets9.lottiefiles.com/packages/lf20_Ok9qdZVyii.json",
  background:"transparent",
  animationData,
  speed:"1",
  loop:true,
  controls:true,
  autoplay:true,
};

function AddMemberModal({modalRef, workspaceId, setInviteModal}: {modalRef: React.MutableRefObject<any>; workspaceId: number; setInviteModal: (v: boolean) => void;}) {
  const { data } = useQuery('inviting', async () => getInviteMembers(workspaceId));

  const [inviteLoading, setInviteLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState(false);
  const [inviteCheck, setInviteCheck] = useState(false);
  const [alreadyInvited, setAlreadyInvited] = useState(false);

  useEffect(() => {
    setEmailValidation(false);
    setInviteCheck(false);
    setAlreadyInvited(false);
  }, [email]);

  const queryClient = useQueryClient();
  const mutationInviting = useMutation(inviteMember, {
    onSuccess: () => {
      queryClient.invalidateQueries('inviting');
      setEmail('');
    },
    onError: (error:any) => {
      if(error.response.data.statusCode) setAlreadyInvited(true);
    }
  })
  const mutationCancel = useMutation(cancelInvite, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('inviting');
      console.log(response);
    }
  });

  const onClickInviteHandler = () => {
    if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}|\.[a-z]{2,3}\.[a-z]{2,3}/g.test(email)) {
      setEmailValidation(true);
      return;
    };
    mutationInviting.mutate({workspaceId, email});
  };

  useEffect(() => {
    if(mutationInviting.isLoading) setInviteLoading(true);
    return () => {setInviteLoading(false)}
  }, [mutationInviting.isLoading]);

  const onClickCancelHandler = (inviteId: number) => {
    mutationCancel.mutate({ workspaceId, inviteId });
  };

  const onKeyPressInvite = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onClickInviteHandler();
  };

  interface DataType {
    inviteId: number;
    email: string;
  };

  // 배경 스크롤 막기
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;
    `
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  });

  return (
    <StWrap>
      <StModalContainer ref={modalRef}>
        <StTitle>
          <h3>멤버 초대하기</h3>
          <Close
            size="24"
            fill="#707070"
            onClick={() => setInviteModal(false)}
            cursor="pointer"
          />
        </StTitle>
        <StInputContainer>
          <StEmailText>이메일</StEmailText>
          <StInputContainerBottom>
            <StInputBox type="text" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} onKeyPress={onKeyPressInvite} />
            <StInviteBtn onClick={onClickInviteHandler}>
              {inviteLoading ?
                <StInvitingMessage>
                  <Lottie options={defaultOptions} width={68} height={68} />
                </StInvitingMessage> :
                <StBtnText>초대</StBtnText>
              }
            </StInviteBtn>
          </StInputContainerBottom>
          {emailValidation && <StEmailCheck>이메일 형식이 맞지 않습니다.</StEmailCheck>}
          {inviteCheck && <StInviteCheck>초대가 완료되었습니다.</StInviteCheck>}
          {alreadyInvited && <StAlreadyInvited>이미 초대된 이메일입니다.</StAlreadyInvited>}
        </StInputContainer>
        <StSub>초대 중인 이메일</StSub>
        <StInviting>
          {
            data?.length ? 
              <StUser>
                {data?.map((item: DataType) => {
                  return (
                    <StUserBox key={item.inviteId}>
                      <h5>{item.email}</h5>
                      <StCancelBtn onClick={() => onClickCancelHandler(item.inviteId)}>취소</StCancelBtn>
                    </StUserBox>
                  );
                })}
              </StUser> :
              <h3>아직 아무도 초대하지 않았습니다. 워크스페이스에 동료를 초대해보세요!</h3>
          } 
        </StInviting>
      </StModalContainer>
    </StWrap>
  );
}

export default AddMemberModal;

const StWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
`;
const StModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 512px;
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: none;
  border-radius:8px;

  padding: 64px ;
  box-sizing: border-box;
`;
const StTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  h3 {
    font-size: 32px;
    font-weight: 900;
  }
  div {
    font-size: 32px;
    cursor: pointer;
  }
`;

const StInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  position: relative;
  margin-bottom: 32px;
`;
const StEmailText = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #007aff;
`;
const StInputContainerBottom = styled.div`
  display: flex;
  gap: 8px;
`;
const StInputBox = styled.input`
  width: 316px;
  height: 28px;
  padding: 4px 10px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  font-size: 16px;
  color: #007aff;
  font-weight: 400;
  &:focus {
    outline: none;
    border: 1px solid #007aff;
  }
`;
const StInviteBtn = styled.button`
  width: 64px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  background-color: #007AFF;
`;

const StSub = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 16px;
`;
const StBtnText = styled.h3`
  color: #ffffff;
`;
const StEmailCheck = styled.h3`
  font-size: 12px;
  position: absolute;
  color: #ff3b30;
  font-weight: 400;
  top: 72px;
`;
const StInviteCheck = styled.h3`
  font-size: 12px;
  position: absolute;
  color: #007aff;
  font-weight: 400;
  top: 72px;
`;
const StAlreadyInvited = styled.h3`
  font-size: 12px;
  position: absolute;
  color: #ff3b30;
  font-weight: 400;
  top: 72px;
`;
const StInvitingMessage = styled.h3`
  position: absolute;
  /* top: -12px;
  right: 32px; */
  top: -14px;
  right: -4px;
`;

const StInviting = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h3{
    font-size: 12px;
    font-weight: 400;
    color: #7f7f7f;
    margin-top: 32px;
  }
`;

const StUser = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow: auto;
  h5 {
    font-size: 16px; 
    color: #7f7f7f;
    font-weight: 400;
  }
`;
const StUserBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StCancelBtn = styled.button`
  width: 60px;
  height: 35px;
  font-size: 16px;
  border: 1px solid ;
  border-radius: 4px;
  background-color: #ffffff;
  color: #FF3B30;
  cursor: pointer;
`;