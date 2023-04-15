import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Close from '../asset/icons/Close';
import { deleteWorkspace } from '../../api/workspaceConfig';

interface workspaceInfoType {
    workspaceId : number,
    workspaceImage: string,
    workspaceTitle: string,
    workspaceDesc: string,
    userRole: string
};

function DeleteWorkspaceModal({deleteModalRef, workspaceInfoData, setWorkspaceDeleteModal}: {deleteModalRef: React.MutableRefObject<any>, workspaceInfoData: workspaceInfoType, setWorkspaceDeleteModal: (v:boolean)=>void}) {
    const navigate = useNavigate();

    const [inputTitle, setInputTitle] = useState('');
    const [deleteBtn, setDeleteBtn] = useState(false);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.target.value);
    };

    useEffect(()=>{
        if(inputTitle === workspaceInfoData.workspaceTitle) setDeleteBtn(true);
        else setDeleteBtn(false);
    }, [inputTitle]);

    const onClickDeleteWorkspaceHandler = (workspaceId: number) => {
        deleteWorkspace({workspaceId})
        .then(() => {
            navigate('/select-workspace');
        })
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        }
    });

    return (
    <StWrap>
        <StModalContainer ref={deleteModalRef}>
            <StLeaveBtn><Close size="36" fill="#303030" onClick={() => setWorkspaceDeleteModal(false)} cursor="pointer" /></StLeaveBtn>
            <StModalTitle>워크스페이스 삭제</StModalTitle>
            
            <StSub>
                <h3>삭제를 진행하신다면 모든 정보를 잃습니다.</h3>
                <h3>그리고 복구할 수 없습니다.</h3>
                <h3>그래도 워크스페이스를 영구적으로 삭제하고 싶으시다면</h3>
            </StSub>
            <StSubCheck>
                <h3>다음 빈칸에 워크스페이스의 이름을 똑같이 입력한 뒤 삭제를 눌러주세요. 이는 당신이 워크스페이스 삭제에 대한 모든 것을 이해하고 동의한다는 것을 의미합니다.</h3>
            </StSubCheck>
            <StWorkspaceNameBox>
                <h3>워크스페이스 이름</h3>
                <h5>"{workspaceInfoData.workspaceTitle}"</h5>
            </StWorkspaceNameBox>
            <StInput value={inputTitle} onChange={onChangeHandler} />
            {
                deleteBtn
                    ?
                    <StDeleteBtnTrue onClick={() => onClickDeleteWorkspaceHandler(workspaceInfoData.workspaceId)}>삭제하기</StDeleteBtnTrue>
                    :
                    <StDeleteBtn>삭제하기</StDeleteBtn>
            }
        </StModalContainer>
    </StWrap>
  )
}

export default DeleteWorkspaceModal;

const StWrap = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.1);
    z-index : 5;
    display : flex;
    justify-content : center;
    flex-direction : column;
    align-items: center;
`;

const StLeaveBtn = styled.div`
  position : absolute;
  top : 32px;
  right : 32px;
`

const StModalContainer = styled.div`
    display : flex;
    flex-direction : column;
    width : 512px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index : 6;
    position : fixed;
    background-color : white;
    border : none;
    border-radius : 8px;
    padding : 64px;
    box-sizing: border-box;
`;

const StModalTitle = styled.div`
    font-size : 2rem;
    font-weight : 900;
    margin-bottom: 24px;
`;

const StSub = styled.div`
    font-size: 12px;
    h3 {
        font-weight: 400;
        line-height: 24px;
    }
`;
const StSubCheck = styled.div`
    font-size: 12px;
    line-height: 24px;
    h3 {
        color: #FE1F1D;
        font-weight: 400;
    }
`;
const StWorkspaceNameBox = styled.div`
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    line-height: 24px;
    h3 {
        font-weight: 400;
    }
    h5 {
        font-size: 12px;
        font-weight: 800;
    }
`;
const StInput = styled.input`
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: lightgray;
  margin-bottom: 12px;
  &:focus{
    outline: none;
  }
`;
const StDeleteBtn = styled.button`
  padding: 10px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const StDeleteBtnTrue = styled.button`
  padding: 10px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  color: #FFFFFF;
  background-color: #FF3B31;
  cursor: pointer;
`;