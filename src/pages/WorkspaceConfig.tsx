import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import Wrapper from "../components/common/Wrapper";
import ArrowBack from "../components/asset/icons/ArrowBack";
import AddMemberModal from "../components/modal/AddMemberModal";
import useOutsideClick from "../hooks/useOutsideClick";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { editProfileImg, editWorkspaceDesc, editWorkspaceTitle, getWorkspaceInfo, getWorkspaceMember } from "../api/workspaceConfig";

const WorkspaceConfig = () => {
  const { data : workspaceInfoData } = useQuery('workspaceInfo', getWorkspaceInfo);
  const { data : workspaceMember } = useQuery('workspaceMember', getWorkspaceMember);

  // const imgInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  const imgInputRef = useRef<any>(null);

  const modalRef = useOutsideClick(()=>setInviteModal(false));
  const [inviteModal, setInviteModal] = useState(false);

  const [editImage, setEditImage] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [imgFile, setImgFile] = useState<File>();
  const [image, setImage] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
  const [title, setTitle] = useState(workspaceInfoData?.workspaceTitle);
  const [description, setDescription] = useState(workspaceInfoData?.workspaceDesc);

  const [search, setSearch] = useState('');
  const [member, setMember] = useState(['']);
  const [memberCopy, setMemberCopy] = useState(['']);

  useEffect(() => {
    setTitle(workspaceInfoData?.workspaceTitle);
    setDescription(workspaceInfoData?.workspaceDesc);
  }, [workspaceInfoData]);

  useEffect(() => {
    const arr = workspaceMember?.map((item:any) => item.userName);
    setMember(arr);
    setMemberCopy(arr);
  }, [workspaceMember]);

  const onImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const target = e.currentTarget;
    // const files = (target.files as FileList)[0];
    // if(files) setImage(files);
    if(e.target.files) setImgFile(e.target.files[0]);
  };

  // 버튼 클릭시 input으로 포커스
  const onClickImgUpload = () => {
    imgInputRef.current.click();
  };

  const queryClient = useQueryClient();

  const mutationImg = useMutation(editProfileImg, {
    onSuccess: async (response) => {
      setImage(response);
      // url to file object
      const res = await fetch(response);
      const data = await res.blob();
      const ext = response.split('.').pop();
      const filename = response.split('/').pop();
      const metadata = { type: `image/${ext}` };
      const file = new File([data], filename!, metadata);
      console.log("file : ", file);
      setImgFile(file);
    }
  })
  const mutationTitle = useMutation(editWorkspaceTitle, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('workspaceInfo');
      console.log("Title: ", response);
      setTitle(response.workspaceTitle);
    },
    onError: (error) =>{console.log("error : ", error)}
  });
  const mutationDesc = useMutation(editWorkspaceDesc, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('workspaceInfo');
      console.log("Title: ", response);
      setDescription(response.workspaceDesc);
    },
    onError: (error) =>{console.log("error : ", error)}
  });

  const onImgUploadBtnHandler = () => {
    if(!imgFile) {
      alert('이미지를 첨부한 후 버튼을 눌러주세요');
      return;
    };
    const workspaceImage = new FormData();
    workspaceImage.append('workspaceImage', imgFile);
    mutationImg.mutate({workspaceImage});
  };
  const onClickEditTitleHandler = (workspaceTitle: string) => {
    if(!workspaceTitle) {
      alert('워크스페이스 이름을 입력해주세요');
      return;
    };
    setEditTitle(false);
    mutationTitle.mutate({workspaceTitle});
  };
  const onClickEditDescHandler = (workspaceDesc: string) => {
    if(!workspaceDesc) {
      alert('워크스페이스 설명을 입력해주세요');
      return;
    };
    setEditDesc(false);
    mutationDesc.mutate({workspaceDesc});
  };

  const onClickEditImgHandler = () => {
    setEditImage(true);
  };

  const onKeyPressTitleHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') onClickEditTitleHandler(title);
  };
  const onKeyPressDescHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') onClickEditTitleHandler(description);
  };

  useEffect(() => {
    setMember(memberCopy?.filter((e)=>e.toLowerCase().includes(search.toLowerCase())));
  }, [search, memberCopy]);



  return <Wrapper>
    <StContainer>
      <StManageTitle>
        <ArrowBack size="24" fill="#363636" cursor="pointer"/>
        <h3>워크스페이스 관리</h3>
      </StManageTitle>

      <StWorkspaceName>
        <StTitleBox>워크스페이스 프로필 이미지</StTitleBox>
        <StWorkspaceProfile>
          <StImgBox src={image}/>
          <StProfileImg />
          <StImgInput type="file" ref={imgInputRef} onChange={onImgChange} accept='image/png, image/jpg, image/jpeg, image/gif'/>
          <StImgEditBtn onClick={onClickImgUpload}></StImgEditBtn>
          <StProfileImgEditBtn onClick={onClickEditImgHandler}>Edit button</StProfileImgEditBtn>
          <StUploadBtn onClick={onImgUploadBtnHandler}>업로드 버튼</StUploadBtn>
        </StWorkspaceProfile>
      </StWorkspaceName>

      <StWorkspaceName>
        <StTitleBox>워크스페이스 이름</StTitleBox>
        <StEditBox>
          {
            editTitle
              ?
              <>
                <StEditInput 
                  name="workspaceTitle"
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value)}
                  onKeyPress={onKeyPressTitleHandler}
                />
                <h5 onClick={() => onClickEditTitleHandler(title)}>Done</h5>
              </>
              :
              <>
                <h3>{title}</h3>
                <h5 onClick = {() => setEditTitle(true)}>Edit</h5>
              </>
          }
        </StEditBox>
      </StWorkspaceName>

      <StWorkspaceName>
        <StTitleBox>워크스페이스 설명</StTitleBox>
        <StEditBox>
          {
            editDesc
              ?
              <>
                <StEditInput 
                  name="workspaceDesc"
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setDescription(e.target.value)}
                  onKeyPress={onKeyPressDescHandler}
                />
                <h5 onClick={() => onClickEditDescHandler(description)}>Done</h5>
              </>
              :
              <>
                <h3>{description}</h3>
                <h5 onClick = {() => setEditDesc(true)}>Edit</h5>
              </>
          }
        </StEditBox>
      </StWorkspaceName>
      <StTitleBox>멤버 추가 및 삭제</StTitleBox>
      
      <StSearchInviteBox>
        <StSearchUserInput onChange={(e)=>setSearch(e.target.value)} placeholder="Search People"/>
        <StAddMemBtn onClick={()=>{
            setInviteModal(true)
            document.body.style.overflow = "hidden";
          }}>멤버 초대</StAddMemBtn>
      </StSearchInviteBox>
      <StSearchUserData>
        {
          member?.map((item, index) => {
            return <StUserData key={index}>
              <StUserProfileImg></StUserProfileImg>
              <StUserNameEmail>
                <h3>{item}</h3>
                <h5>email@gmail.com</h5>
              </StUserNameEmail>
              <StUserJob>
                <h3>Product Manager</h3>
                <h5>Edit</h5>
              </StUserJob>
              <StUserRole>
                Admin
              </StUserRole>
              <StUserRemove>워크스페이스에서 삭제</StUserRemove>
            </StUserData>
          })
        }
      </StSearchUserData>
    </StContainer>
    {
      inviteModal
        ?
        <AddMemberModal 
          modalRef={modalRef} 
          setInviteModal={(v:boolean)=>{setInviteModal(v)}}
        />
        :
        null
    }
  </Wrapper>
};

export default WorkspaceConfig;

const StContainer = styled.div`
  margin: 24px;
  width:90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const StManageTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const StWorkspaceProfile = styled.div`
  width: 64px;
  height: 64px;
  background-color: gray;
  border-radius: 50%;
  position: relative;
`;
const StImgBox = styled.img`
  width: 100%;
  height: 100%;
`;
const StProfileImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
`;
const StImgInput = styled.input`
  display: none;
`;
const StImgEditBtn = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #7f3b2f;
  cursor: pointer;

  position: absolute;
  top: 0px;
  right: 0px;
`;
const StProfileImgEditBtn = styled.div`
  background-color: green;
`;
const StUploadBtn = styled.div`
  background-color: pink;
`;

const StWorkspaceName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  h3 {
    font-size: 12px;
    font-weight: 400;
  }
  h5 {
    font-size: 12px;
    color: #007AFF;
    font-weight: 400;
    cursor: pointer;
  }
`;
const StTitleBox = styled.div`
  
`;
const StEditBox = styled.div`
  display: flex;
  gap: 8px;
`;
const StEditInput = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  &:focus {
    outline : none;
  }
`;

const StAddMemBtn = styled.button`

`;

const StSearchInviteBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StSearchUserInput = styled.input`
  width: 72%;
`;

const StSearchUserData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const StUserData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StUserProfileImg = styled.div`
  width: 32px;
  height: 32px;
  box-shadow: 0 0 5px 0 gray;
  border-radius: 50%;
`;

const StUserNameEmail = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 14px;
  }
  h5 {
    font-size: 12px;
    color: #B7B7B7;
    font-weight: 400;
  }
`;

const StUserJob = styled.div`
  display: flex;
  gap: 12px;
  h3 {
    font-size: 12px;
    color: #707070;
  }
  h5 {
    font-size: 12px;
    color: #1B86FF;
  }
`;
const StUserRole = styled.div`
    font-size: 12px;
    color: #707070;
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