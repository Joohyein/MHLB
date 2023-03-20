import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { deleteUser } from '../../api/workspaceConfig';

function RemoveCheckBtn({ userRole, userId, workspaceId }: { userRole: string, userId: number, workspaceId: number }) {
  const [removeToggle, setRemoveToggle] = useState(false);
  
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteUser, {
    onSuccess: () => {
        queryClient.invalidateQueries('workspaceMember');
    }
  })
  const onClickDeleteUserHandler = (userId: number) => {
    mutation.mutate({userId, workspaceId});
  };

  return (
    <>
        {
            userRole === "ADMIN"
              ?
              null
              :
              removeToggle
                ?
                <StRemoveToggleBox>
                  <h3>정말로 삭제하시겠습니까?</h3>
                  <StRemoveCancelBtn>
                    <StRemoveBtn onClick={() => onClickDeleteUserHandler(userId)}>삭제</StRemoveBtn>
                    <StRemoveBtn onClick={() => setRemoveToggle(false)}>취소</StRemoveBtn>
                  </StRemoveCancelBtn>
                </StRemoveToggleBox>
                :
              <StUserRemove onClick={() => setRemoveToggle(true)}>워크스페이스에서 삭제</StUserRemove>
          }
    </>
  )
}

export default RemoveCheckBtn;

const StRemoveToggleBox = styled.div`
  display: flex;
  h3 {
    font-size: 12px;
    font-weight: 400;
  }
`;
const StRemoveCancelBtn = styled.div`
  
`;
const StRemoveBtn = styled.button`
  
`;
const StUserRemove = styled.button`
  font-size: 12px;
  color: #FF7A72;
  background-color: white;
  border: 1px solid #FF7A72;
  border-radius: 6px;
  padding: 4px 6px;
  cursor: pointer;
`;