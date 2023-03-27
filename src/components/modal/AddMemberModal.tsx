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
import animationData from '../../loadingData.json';

const defaultOptions:any| Readonly<any> = { 
  src:"https://assets10.lottiefiles.com/datafiles/nT4vnUFY9yay7QI/data.json",
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
    }
  })
  const mutationCancel = useMutation(cancelInvite, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('inviting');
      console.log(response);
    },
    onError: (error) => console.log(error),
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

  return (
    <StWrap>
      <StModalContainer ref={modalRef}>
        <StTitle>
          <h3>멤버 초대하기</h3>
          <Close
            size="24"
            fill="#363636"
            onClick={() => setInviteModal(false)}
            cursor="pointer"
          />
        </StTitle>
        <StInputContainer>
          <StInputBox
            type="text"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            onKeyPress={onKeyPressInvite}
          />
          <StInviteBtn onClick={onClickInviteHandler}>
            {inviteLoading ? 
              <StInvitingMessage>
                <Lottie options={defaultOptions} width={64} height={64} />
              </StInvitingMessage> 
              : "초대 보내기" 
            }
          </StInviteBtn>
          {emailValidation && <StEmailCheck>이메일 형식이 맞지 않습니다.</StEmailCheck>}
          {inviteCheck && <StInviteCheck>초대가 완료되었습니다.</StInviteCheck>}
          {alreadyInvited && <StAlreadyInvited>이미 초대된 이메일입니다.</StAlreadyInvited>}
          
        </StInputContainer>

        <StSub>초대 중인 사람</StSub>

        <StInviting>
          <StUser>
            {data?.map((item: DataType) => {
              return (
                <StUserBox key={item.inviteId}>
                  <h5>{item.email}</h5>
                  <StCancelBtn onClick={() => onClickCancelHandler(item.inviteId)}>초대 취소</StCancelBtn>
                </StUserBox>
              );
            })}
          </StUser>
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
  gap: 32px;
  width: 512px;
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;

  border: 3px solid gray;
  padding: 20px;
  box-sizing: border-box;
`;
const StTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
  }
  div {
    font-size: 32px;
    cursor: pointer;
  }
`;

const StSub = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: gray;
`;
const StInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  position: relative;
  margin-bottom: 12px;
`;
const StInputBox = styled.input`
  width: 70%;
  height: 24px;
  padding: 4px;
  &:focus {
    outline: none;
  }
`;
const StInviteBtn = styled.button`
  width: 30%;
  border: none;
  cursor: pointer;
  position: relative;
`;
const StEmailCheck = styled.h3`
  font-size: 12px;
  position: absolute;
  color: #ff5a51;
  top: 38px;
`;
const StInviteCheck = styled.h3`
  font-size: 12px;
  position: absolute;
  color: #01962e;
  top: 38px;
`;
const StAlreadyInvited = styled.h3`
  font-size: 12px;
  position: absolute;
  color: #ffaa00;
  top: 38px;
`;
const StInvitingMessage = styled.h3`
  position: absolute;
  top: -12px;
  right: 32px;
`;

const StInviting = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StUser = styled.div`
  width: 100%;
  height: 168px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: auto;
  padding-right: 8px;
  h5 {
    color: gray;
  }
`;
const StUserBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StCancelBtn = styled.button`
  cursor: pointer;
`;
