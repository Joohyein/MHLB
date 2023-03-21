import Wrapper from "../components/common/Wrapper";
import styled from "styled-components";
import ArrowBack from "../components/asset/icons/ArrowBack";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUserData, editUserName, editUserJob, editUserDesc, getWorkspaces, editProfileImg } from "../api/myPage";
import MyWorkspace from "../components/mypage/MyWorkspace";
import useOutsideClick from "../hooks/useOutsideClick";
import LeaveWorkspaceModal from "../components/workspaceConfig/LeaveWorkspaceModal";

const MyPage = () => {
  const { data : dataUser } = useQuery('user', getUserData);
  const { data : dataWorkspace } = useQuery('workspace', getWorkspaces);

  const imgInputRef = useRef<any>(null);

  const [image, setImage] = useState(dataUser?.userImage);
  const [imgFile, setImgFile] = useState<any>();
  const [editName, setEditName] = useState(false);
  const [name, setName] = useState(dataUser?.userName);
  const [editJob, setEditJob] = useState(false);
  const [job, setJob] = useState(dataUser?.userJob);
  const [editDesc, setEditDesc] = useState(false);
  const [desc, setDesc] = useState(dataUser?.userDesc);

  const [workspaceId, setWorkspaceId] = useState<any>();

  const [leaveModal, setLeaveModal] = useState(false);
  const modalRef = useOutsideClick(() => setLeaveModal(false));

  useEffect(() => {
    setImage(dataUser?.userImage);
    setName(dataUser?.userName);
    setJob(dataUser?.userJob);
    setDesc(dataUser?.userDesc);
  }, [dataUser]);

  const onImgchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) setImgFile(e.target.files[0]);
  };
  // 버튼 클릭시 이미지 업로드창 띄우기
  const onClickImgUpload = () => {
    imgInputRef.current.click();
  };
  
  const queryClient = useQueryClient();

  // Mutation 
  const mutationImg = useMutation(editProfileImg, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    }
  });
  const mutationName = useMutation(editUserName, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
    onError: (error) =>{console.log("error : ", error)}
  });
  const mutationJob = useMutation(editUserJob, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
    onError: (error) => {console.log(error)}
  })
  const mutationDesc = useMutation(editUserDesc, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('user');
      setDesc(response.userDesc);
    },
    onError: (error) => {console.log(error)}
  })

  // onClickHandler
  const onClickEditNameHandler = (userName: string) => {
    if(!userName) {
      alert('이름을 입력해주세요');
      return;
    };
    setEditName(false);
    mutationName.mutate({userName});
  };
  const onClickEditJobHandler = (userJob: string) => {
    if(!userJob) {
      alert('직업을 입력해주세요');
      return;
    };
    setEditJob(false);
    mutationJob.mutate({userJob});
  }
  const onClickEditDescHandler = (userDesc: string) => {
    if(!userDesc) {
      alert('상태 메시지를 입력해주세요');
      return;
    };
    setEditDesc(false);
    mutationDesc.mutate({userDesc});
  }

  useEffect(()=>{
    if(!imgFile) return;
    const userImage = new FormData();
    userImage.append('userImage', imgFile);
    mutationImg.mutate(userImage);
  }, [imgFile]);


  const onKeyPressNameHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') onClickEditNameHandler(name);
  };
  const onKeyPressJobHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') onClickEditJobHandler(job);
  }
  const onKeyPressDescHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') onClickEditDescHandler(desc);
  }

  return (
    <Wrapper>
      <StContainer>
        <ArrowBack size="24" fill="#363636" cursor="pointer"/>
        <StTitle>마이 페이지</StTitle>
        <StProfileImg>
          <StSub>프로필 이미지</StSub>
          <StImgInput type="file" name="userImg" ref={imgInputRef} onChange={onImgchange} accept='image/png, image/jpg, image/jpeg, image/gif'/>
          <StImg src={image} />
          <StEditBtn onClick={onClickImgUpload}>Edit</StEditBtn>
        </StProfileImg>

        <StEditContainer>
          <StSub>내 이름</StSub>
          <StEditBox>
            {
              editName
                ?
                <>
                  <StEditInput 
                    name="userName"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)}
                    onKeyPress={onKeyPressNameHandler}
                  />
                  <h5 onClick={() => onClickEditNameHandler(name)}>Done</h5>
                </>
                :
                <>
                  <h3>{name}</h3>
                  <h5 onClick = {() => setEditName(true)}>Edit</h5>
                </>
            }
          </StEditBox>
        </StEditContainer>

        <StEditContainer>
          <StSub>직업</StSub>
          <StEditBox>
            {
              editJob
                ?
                <>
                  <StEditInput 
                    name = "userJob"
                    value = {job}
                    onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setJob(e.target.value)}
                    onKeyPress = {onKeyPressJobHandler}
                  />
                  <h5 onClick = {() => onClickEditJobHandler(job)}>Done</h5>
                </>
                :
                <>
                  <h3>{job}</h3>
                  <h5 onClick = {() => setEditJob(true)}>Edit</h5>
                </>
            }
          </StEditBox>
        </StEditContainer>

        <StEditContainer>
          <StSub>상태 메시지</StSub>
          <StEditBox>
            {
              editDesc
                ?
                <>
                  <StEditInput 
                    name = "userDesc"
                    value = {desc}
                    onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setDesc(e.target.value)}
                    onKeyPress = {onKeyPressDescHandler}
                  />
                  <h5 onClick = {() => onClickEditDescHandler(desc)}>Done</h5>
                </>
                :
                <>
                  <h3>{desc}</h3>
                  <h5 onClick = {() => setEditDesc(true)}>Edit</h5>
                </>
            }
          </StEditBox>
        </StEditContainer>

        <StMyWorkspaceContainer>
          <StSub>내 워크스페이스</StSub>

          <StInvited>
            <StInvitedWorkspaceData>
              <StWorkspaceImg src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'/>
              <StWorkspaceNameSub>
                <h3>테슬라</h3>
                <h5>워크스페이스에 대한 설명이 이곳에 들어갑니다~~~</h5>
              </StWorkspaceNameSub>
            </StInvitedWorkspaceData>
            <StBtnBox>
              <StAcceptBtn>수락</StAcceptBtn>
              <StRejectBtn>거절</StRejectBtn>
            </StBtnBox>
          </StInvited>

          <MyWorkspace 
            setLeaveModal={(v: boolean) => setLeaveModal(v)} 
            dataWorkspace={dataWorkspace} 
            setWorkspaceId={(v:number) => setWorkspaceId(v)}
          />

        </StMyWorkspaceContainer>
      </StContainer>
      {
          leaveModal
          ?
          <LeaveWorkspaceModal 
              modalRef={modalRef}
              setLeaveModal={(v: boolean) => setLeaveModal(v)}
              dataWorkspace = {dataWorkspace}
              myWorkspaceId = {workspaceId}
          />
          :
          null
      }
    </Wrapper>
  )
};

export default MyPage;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
  width: 80%;
  height: 100%;
  margin: 32px;
`;
const StTitle = styled.h3`
  font-size: 32px;
`;

const StSub = styled.h3`
  font-size: 18px;
  font-weight: 500;
`;
const StImgInput = styled.input`
  display: none;
`;
const StProfileImg  = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
`;
const StImg = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 50%;
`;
const StEditBtn = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: gray;
  position: absolute;
  bottom: 0;
  left: 96px;
  cursor: pointer;
`;

const StEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const StEditBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  h3 {
    font-size: 14px;
    font-weight: 400;
  }
  h5 {
    font-size: 14px;
    color: #007AFF;
    font-weight: 400;
    cursor: pointer;
  }
`;
const StEditInput = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  &:focus {
    outline : none;
  }
`;

// 내 워크스페이스
const StMyWorkspaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const StWorkspaceImg = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;
const StInvited = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;
const StInvitedWorkspaceData = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;
const StWorkspaceNameSub = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  h3 {
    font-size: 16px;
    font-weight: 400;
  }
  h5 {
    font-size: 14px;
    font-weight: 400;
    color: gray;
  }
`;
const StBtnBox = styled.div`
  display: flex;
  gap: 8px;
`;
const StAcceptBtn = styled.button`
  
`;
const StRejectBtn = styled.button`
  
`;

