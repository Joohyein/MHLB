import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createWorkspace } from '../../api/selectWorkspace';
import Close from '../asset/icons/Close';

function CreateWorkspaceModal({modalRef, setCreateModal}: {modalRef: React.MutableRefObject<any>, setCreateModal: (v: boolean) => void}) {
  const imgInputRef = useRef<any>(null);
  const navigate = useNavigate();

  const [image, setImage] = useState<any>('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
  const [imgFile, setImgFile] = useState<any>();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const onImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) setImgFile(e.target.files[0]);
    else setImage('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
    // 업로드한 이미지 표시
    const fileReader = new FileReader();
    if(e.target.files) fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = () => {
      setImage(fileReader.result)
    };
  };

  const onClickCreateHandler = (e: any) => {
    if(!name){
      alert('워크스페이스 이름을 입력해주세요');
      return;
    };
    if(!desc){
      alert('워크스페이스 설명을 입력해주세요');
      return;
    };

    const body = {
      workspaceTitle: name,
      workspaceDesc: desc
    };
    const image = imgFile;
    const formData = new FormData();
    formData.append("image", image);
    const data = new Blob([JSON.stringify(body)], { type: "application/json" });
    formData.append('data', data);

    createWorkspace(formData)
    .then(() => {
      console.log('success');
      navigate('/workspace');
    })
    .catch((error) => console.log("error :", error))

    setCreateModal(false);
  };

  const onClickImgUpload = () => {
    imgInputRef.current.click();
  };

  return (
    <StWrap>
      <StModalContainer ref={modalRef}>
        <StTitleBox>
          <h3>워크스페이스 생성</h3>
          <Close size="16px" fill="#363636" onClick={() => setCreateModal(false)} cursor='pointer' />
        </StTitleBox>
        <StImgUploadBox>
          <h3>워크스페이스 이미지</h3>
          <StImage src={image} onClick={onClickImgUpload} />
          <StImageInput type="file" name="creageWorkspaceImg" ref={imgInputRef} onChange={onImgChange} accept='image/png, image/jpg, image/jpeg, image/gif' />
        </StImgUploadBox>
        <StNameBox>
          <h3>워크스페이스 이름</h3>
          <StNameInput type="text" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
        </StNameBox>
        <StDescBox>
          <h3>워크스페이스 설명</h3>
          <StDescInput value={desc} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setDesc(e.target.value)}></StDescInput>
        </StDescBox>
        <StCreateBtn onClick={onClickCreateHandler}>워크스페이스 생성</StCreateBtn>
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
  width: 386px;
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
const StImgUploadBox = styled.div`
  h3{
    font-size: 14px;
    color: #288AFF;
  }
`;
const StImage = styled.img`
  width: 86px;
  height: 86px;
  border-radius: 50%;
`;
const StImageInput = styled.input`
  display: none;
`;
const StNameBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  h3 {
    font-size: 16px;
    font-weight: 500;
  }
`;
const StNameInput = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid lightgray;
  &:focus {
    outline: none;
  }
`;
const StDescBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  h3 {
    font-size: 16px;
    font-weight: 500;
  }
`;
const StDescInput = styled.textarea`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid lightgray;
  height: 128px;
  &:focus {
    outline: none;
  }
`;

const StCreateBtn = styled.button`
  
`;