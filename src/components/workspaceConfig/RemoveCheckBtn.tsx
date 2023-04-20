import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { deleteUser } from '../../api/workspaceConfig';
import { logEvent } from '../../util/amplitude';
import { useNavigate } from 'react-router-dom';

function RemoveCheckBtn({ userRole, userId, workspaceId }: { userRole: string, userId: number, workspaceId: number }) {
  const [removeToggle, setRemoveToggle] = useState(false);

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation(deleteUser, {
    onSuccess: () => {
        queryClient.invalidateQueries('workspaceMember');
    },
    onError: (error: any) => {
      if(error.response.data.code === 'W-01') {
        alert('워크스페이스가 삭제되었거나 현재 존재하지 않는 워크스페이스입니다.');
        navigate('/select-workspace');
      } else if(error.response.data.code === 'U-02' || error.response.data.code === 'W-02'){
        alert('해당 멤버가 탈퇴했거나 현재 존재하지 않는 사용자입니다.');
        window.location.reload();
      } else if(error.response.data.code === 'E-11') {
        alert('해당 워크스페이스에 대한 접근 권한이 없습니다.');
        navigate('/select-workspace');
      } else if(error.response.data.code === 'SC-11') {
        alert(`해당 워크스페이스 관리자 페이지에 대한 접근 권한이 없습니다.
워크스페이스 관리자에게 문의하세요.`);
        navigate('/select-workspace');
      }
    }
  })
  const onClickDeleteUserHandler = (userId: number) => {
    mutation.mutate({userId, workspaceId});
    logEvent('Delete member button', {from: 'Workspace config page'});
  };

  return (
    <StRemoveToggleBox>
      {removeToggle
      ?<StMemberKickCheckButtonDiv>
        <StMessage>정말로 삭제하시겠습니까?</StMessage>
        <StKickCheckBtn onClick={() => onClickDeleteUserHandler(userId)}>삭제</StKickCheckBtn>
        <StCancelBtn onClick={() => setRemoveToggle(false)}>취소</StCancelBtn>
      </StMemberKickCheckButtonDiv>
      :<StMemberKickButton onClick={() => setRemoveToggle(true)}>삭제</StMemberKickButton>
      }
    </StRemoveToggleBox>
  )
}

export default RemoveCheckBtn;

const StRemoveToggleBox = styled.div`

`;

const StMemberKickCheckButtonDiv = styled.div`
  display : flex;
  flex-direction : row;
  align-items : center;
  gap : 16px;
`;

const StMessage = styled.div`
  font-size : 0.75rem;
  font-weight : 400;
  color : #7f7f7f;
`

const StKickCheckBtn = styled.button`
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
`;

const StCancelBtn = styled.button`
  right : 0;
  background : white;
  padding : 8px 16px;
  border-radius : 4px;
  border : none;
  outline : 1px solid #ff3b30;
  height : 35px;
  color : #ff3b30;
  font-size : 16px;
  font-weight : 700;
  transition : 200ms;
  &:hover {
    background : #ffcac7;
    cursor : pointer;
  }
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
` 