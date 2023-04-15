import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Close from '../asset/icons/Close';
import { deleteWorkspace } from '../../api/workspaceConfig';
import { logEvent } from '../../util/amplitude';

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
            logEvent('Delete Workspace button', {from: 'Workspace config page'});
            navigate('/select-workspace');
        })
    };

    return (
    <StWrap>
        <StModalContainer ref={deleteModalRef}>
            <StLeaveBtn><Close size="36" fill="#303030" onClick={() => setWorkspaceDeleteModal(false)} cursor="pointer" /></StLeaveBtn>
            <StModalTitle>워크스페이스 삭제</StModalTitle>
            
            <StSub>
                <h3>삭제를 진행하신다면 모든 정보를 잃습니다.</h3>
                <h3>그리고 복구할 수 없습니다.</h3>
                <br></br>
                <h3>그래도 삭제를 진행하고 싶다면</h3>
            </StSub>
            <StSubCheck>
                <h3>다음 빈칸에 워크스페이스의 이름을 똑같이 입력한 뒤 삭제를 눌러주세요.</h3>
                <h3>이는 당신이 워크스페이스 삭제에 대한 모든 것을 이해하고 동의한다는 것을 의미합니다.</h3>
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
    height: 100vh;
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
    width : 464px;
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
`;

const StWorkspaceInfoDiv = styled.div`
    width : 100%;
    display : flex;
    margin-top : 32px;
    margin-bottom : 32px;
`

const StWorkspaceImage = styled.div`
    width : 48px;
    height : 48px;
    background-image : url('${(props : {img : string | undefined}) => props.img}');
    background-size : cover;
    background-position : center;
    border-radius : 48px;
`

const StWorkspaceTextBox = styled.div`
    margin-left : 16px;
    display : flex;
    justify-content: center;
    flex-direction: column;
    gap : 4px;
`

const StWorkspaceTextTitle = styled.div`
    font-size : 1rem;
    font-weight : 900;
`

const StWorkspaceTextDesc = styled.div`
    font-size : 0.75rem;
    font-weight : 300;
`

const StSub = styled.div`
    font-size: 12px;

    h3 {
        font-weight: 400;
    }
`;
const StSubCheck = styled.div`
    font-size: 12px;
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
    h3 {
        font-weight: 400;
    }
    h5 {
        font-size: 12px;
        font-weight: 800;
    }
`;
const StInput = styled.input`
  border: none;
  background-color: lightgray;
  padding: 8px;
  &:focus {
    outline : none;
  }
`;
const StDeleteBtn = styled.button`
`;
const StDeleteBtnTrue = styled.button`
    color: #FE1F1D;
    cursor: pointer;
`;