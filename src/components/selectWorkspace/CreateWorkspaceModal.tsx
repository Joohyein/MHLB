import styled from 'styled-components';
import Close from '../asset/icons/Close';

function CreateWorkspaceModal({modalRef, setCreateModal}: {modalRef: React.MutableRefObject<any>, setCreateModal: (v: boolean) => void}) {
    const onClickCreateWorkspaceHandler = () => {

    };
  
  return (
    <StWrap>
        <StModalContainer ref={modalRef}>
            <StTitleBox>
                <h3>워크스페이스 생성</h3>
                <Close size="16px" fill="#363636" onClick={() => setCreateModal(false)} cursor='pointer' />
            </StTitleBox>
        </StModalContainer>
    </StWrap>
  );
}

export default CreateWorkspaceModal;

const StWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0,0,0,0.3);
`;
const StModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 524px;
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

const StTitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    h3{
        font-size: 18px;
        font-weight: 400;
    }
`;