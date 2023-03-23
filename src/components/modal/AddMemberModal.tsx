import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import {
  cancelInvite,
  getInviteMembers,
  inviteMember,
} from '../../api/invitation';
import Close from '../asset/icons/Close';

function AddMemberModal({
  modalRef,
  workspaceId,
  setInviteModal,
}: {
  modalRef: React.MutableRefObject<any>;
  workspaceId: number;
  setInviteModal: (v: boolean) => void;
}) {
  const { data } = useQuery('inviting', async () =>
    getInviteMembers(workspaceId)
  );

  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState(false);
  const [inviteCheck, setInviteCheck] = useState(false);
  const [alreadyInvited, setAlreadyInvited] = useState(false);

  useEffect(() => {
    setEmailValidation(false);
    setInviteCheck(false);
  }, [email]);

  const queryClient = useQueryClient();
  const mutation = useMutation(cancelInvite, {
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
    }
    inviteMember(workspaceId, email)
      .then((response) => {
        setInviteCheck(true);
        console.log(response);
      })
      .catch((error) => {
        console.log('error: ', error.response.data.message);
        if (error.response.data.statusCode === 400) setAlreadyInvited(true);
      });
  };

  const onClickCancelHandler = (inviteId: number) => {
    mutation.mutate({ workspaceId, inviteId });
  };

  const onKeyPressInvite = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onClickInviteHandler();
  };

  interface DataType {
    inviteId: number;
    email: string;
  }

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
          <StInviteBtn onClick={onClickInviteHandler}>초대 보내기</StInviteBtn>
          {emailValidation ? (
            <StEmailCheck>이메일 형식이 맞지 않습니다.</StEmailCheck>
          ) : null}
          {inviteCheck ? (
            <StInviteCheck>초대가 완료되었습니다.</StInviteCheck>
          ) : null}
          {alreadyInvited ? (
            <StAlreadyInvited>이미 초대된 이메일입니다.</StAlreadyInvited>
          ) : null}
        </StInputContainer>

        <StSub>초대 중인 사람</StSub>

        <StInviting>
          <StUser>
            {data?.map((item: DataType) => {
              return (
                <StUserBox key={item.inviteId}>
                  <h5>{item.email}</h5>
                  <StCancelBtn
                    onClick={() => onClickCancelHandler(item.inviteId)}
                  >
                    초대 취소
                  </StCancelBtn>
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
const StAlreadyInvited = styled.div`
  font-size: 12px;
  position: absolute;
  color: #ffaa00;
  top: 38px;
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
