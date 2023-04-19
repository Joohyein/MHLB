import React, { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { leaveWorkspace } from '../../api/myPage';
import Close from '../asset/icons/Close';
import { logEvent } from '../../util/amplitude';

interface DataType  {
  workspaceDesc: string,
  workspaceId: number,
  workspaceImage: string,
  workspaceTitle: string
}
function LeaveWorkspaceModal({modalRef, setLeaveModal, dataWorkspace, myWorkspaceId}:{modalRef:React.MutableRefObject<any>, setLeaveModal: (v: boolean) => void, dataWorkspace: DataType[], myWorkspaceId: number}) {
  const myworkspace = dataWorkspace.filter(({workspaceId}) => workspaceId === myWorkspaceId)[0];
  const [inputTitle, setInputTitle] = useState('');
  const [withDrawBtn, setWithdrawBtn] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(leaveWorkspace, {
    onSuccess: () => {
      queryClient.invalidateQueries('workspace');
      setLeaveModal(false);
      logEvent('Leave workspace Success', {from: 'My page'});
    },
    onError: (error:any) => {
      if(error.response.data.code === 'W-01') {
        alert('존재하지 않는 워크스페이스입니다.');
        window.location.reload();
      }
    }
  });
  
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };
  const onClickLeaveWorkspaceHandler = () => {
    mutation.mutate({myWorkspaceId});
  };
  useEffect(()=>{
    if(inputTitle === myworkspace.workspaceTitle) setWithdrawBtn(true);
    else setWithdrawBtn(false);
  }, [inputTitle]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    }
  });

  return (
    <StWrap>
      <StModalContainer ref={modalRef}>
        <StTitle>
          <h3>워크스페이스 탈퇴</h3>
          <Close size="24px" fill="gray" onClick={()=>setLeaveModal(false)} cursor="pointer"/>
        </StTitle>

        <StWorkspaceDataBox>
          <StWorkspaceProfile src={myworkspace.workspaceImage}/>
          <StWorkspaceData>
            <h3>{myworkspace.workspaceTitle}</h3>
            <h5>{myworkspace.workspaceDesc}</h5>
          </StWorkspaceData>
        </StWorkspaceDataBox>

        <StWarnningText>
          <h3>워크스페이스에서 탈퇴하면 모든 기록이 삭제됩니다. 기록은 복구할 수 없고,</h3>
          <h3>관리자에게 다시 초대를 받지 않는 이상 재참여가 불가능합니다.</h3>
          <h3>이에 동의하고 탈퇴를 원하시면 <strong>"{myworkspace.workspaceTitle}"</strong> 을 똑같이 입력해주세요.</h3>
        </StWarnningText>

        <StInputBox>
          <StInput  value={inputTitle} onChange={onChangeHandler} />
          {
            withDrawBtn
              ?
              <StLeaveBtnTrue onClick={onClickLeaveWorkspaceHandler}>워크스페이스 영구적으로 탈퇴하기</StLeaveBtnTrue>
              :
              <StLeaveBtn>워크스페이스 영구적으로 탈퇴하기</StLeaveBtn>
          }
        </StInputBox>
      </StModalContainer>
    </StWrap>
  )
}

export default LeaveWorkspaceModal;

const StWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0,0,0,0.3);
  z-index : 5;
`;
const StModalContainer = styled.div`
  width: 368px;
  z-index: 999;
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 24px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: white;
  border-radius: 6px;
  padding: 52px;
`;

const StTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 24px;
    font-weight: 700;

  }
`;
const StWorkspaceDataBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const StWorkspaceProfile = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;
const StWorkspaceData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  h3 {
    font-size: 16px;
  }
  h5 {
    font-size: 12px;
    font-weight: 400;
    color: #676767;
  }
`;

const StWarnningText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  h3 {
    font-size: 12px;
    font-weight: 400;
    color: #676767;
  }

`;

const StInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;
const StInput = styled.input`
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: lightgray;
  &:focus{
    outline: none;
  }
`;
const StLeaveBtnTrue = styled.button`
  padding: 10px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  color: #FFFFFF;
  background-color: #FF3B31;
  outline: none;
  cursor: pointer;
  &:focus{
    outline: none;
  }
`;
const StLeaveBtn = styled.button`
  padding: 10px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:focus{
    outline: none;
  }
`;