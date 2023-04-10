import Wrapper from "../components/common/Wrapper";
import styled from "styled-components";
import ArrowBack from "../components/asset/icons/ArrowBack";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUserData, editUserName, editUserJob, editUserDesc, getWorkspaces, editProfileImg } from "../api/myPage";
import MyWorkspace from "../components/mypage/MyWorkspace";
import useOutsideClick from "../hooks/useOutsideClick";
import LeaveWorkspaceModal from "../components/mypage/LeaveWorkspaceModal";
import InvitedWorkspace from "../components/mypage/InvitedWorkspace";
import NavBarWorkspace from "../components/common/NavBarWorkspace";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const { data : dataUser } = useQuery('user', getUserData);
  const { data : dataWorkspace } = useQuery('workspace', getWorkspaces);

  const imgInputRef = useRef<any>(null);

  const navigate = useNavigate();

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

  const onImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      if(e.target.files[0].size >= 1024 ** 2 * 5){
        alert(`5MB 이하 파일만 등록할 수 있습니다. 
현재 파일 용량: ${Math.round(e.target.files[0].size/1024/1024)}MB` );
        return;
      }
      else setImgFile(e.target.files[0]);
    }
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
  };

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
  };
  const onKeyPressDescHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') onClickEditDescHandler(desc);
  };

  return (
    <Wrapper>
      <NavBarWorkspace />
      <StContainer>
        <StMypageProfileDiv>
          <StArrowBackDiv onClick = {() => {navigate(-1)}}><ArrowBack size="30" fill="#303030" cursor="pointer" /></StArrowBackDiv>
          <StManageTitle>마이페이지</StManageTitle>
          <StSubTitleDiv>
            <StSubTitle>프로필 이미지</StSubTitle>
            <StSubTitleEdit onClick = {() => {imgInputRef.current.click()}}>이미지 변경</StSubTitleEdit>
          </StSubTitleDiv>
          <StMypageProfile img={image}>
            <StMypageProfileEdit onClick = {() => {imgInputRef.current.click()}}>
              <StMypageProfileEditText>
                이미지 편집
                <StMypageProfileEditInput
                  type="file"
                  name="profileImage"
                  ref={imgInputRef}
                  onChange={onImgChange}
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                />
              </StMypageProfileEditText>
            </StMypageProfileEdit>
          </StMypageProfile>
          <StSubTitleDiv>
            <StSubTitle>내 이름</StSubTitle>
            {editName ? <StSubTitleEdit onClick={() => onClickEditNameHandler(name)}>편집 완료</StSubTitleEdit> : <StSubTitleEdit onClick={() => {setEditName(true)}}>편집</StSubTitleEdit>}
          </StSubTitleDiv>
          {editName
          ? <StMypageTextInput
            name = "userName"
            value = {name}
            onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            onKeyPress = {onKeyPressNameHandler}
            />
          : <StMypageText>{name}</StMypageText>
          }
          <StSubTitleDiv>
            <StSubTitle>직업</StSubTitle>
            {editJob ? <StSubTitleEdit onClick={() => onClickEditJobHandler(job)}>편집 완료</StSubTitleEdit> : <StSubTitleEdit onClick={() => {setEditJob(true)}}>편집</StSubTitleEdit>}
          </StSubTitleDiv>
          {editJob
          ? <StMypageTextInput
            name="userJob"
            value={job}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJob(e.target.value)}
            onKeyPress={onKeyPressJobHandler}
            />
          : <StMypageText>{job}</StMypageText>
          }
          <StSubTitleDiv>
            <StSubTitle>상태 메세지</StSubTitle>
            {editDesc ? <StSubTitleEdit onClick={() => onClickEditDescHandler(desc)}>편집 완료</StSubTitleEdit> : <StSubTitleEdit onClick={() => {setEditDesc(true)}}>편집</StSubTitleEdit>}
          </StSubTitleDiv>
          {editDesc
          ? <StMypageTextInput
            name="userDesc"
            value={desc}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDesc(e.target.value)}
            onKeyPress={onKeyPressDescHandler}
            />
          : <StMypageText>{desc}</StMypageText>
          }
        </StMypageProfileDiv>
        <StMypageWorkspaceDiv>
          <StSubTitleMgT>워크스페이스에 멤버 추가 및 삭제</StSubTitleMgT>
          { dataWorkspace?.inviteList.length ? <InvitedWorkspace invitedWorkspaceData={dataWorkspace?.inviteList} /> : null }
          <MyWorkspace setLeaveModal={(v: boolean) => setLeaveModal(v)} dataWorkspace={dataWorkspace?.workspaceList} setWorkspaceId={(v:number) => setWorkspaceId(v)} />
        </StMypageWorkspaceDiv>
      </StContainer>
      { leaveModal ? <LeaveWorkspaceModal modalRef={modalRef} setLeaveModal={(v: boolean) => setLeaveModal(v)} dataWorkspace = {dataWorkspace?.workspaceList} myWorkspaceId = {workspaceId} /> : null}
    </Wrapper>
  )
};

export default MyPage;

const StContainer = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : flex-start;
  align-items : flex-start;
  width : 1040px;
  height: 100%;
  box-sizing : border-box;
  padding-top : 64px;
  transition : 200ms;
  @media screen and (max-width : 1200px) and (min-width : 968px) {
    width : 776px;
  }
  @media screen and (max-width : 968px) {
      width : 512px;
  }
`;

const StMypageProfileDiv = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : flex-start;
  align-items : flex-start;
  width : 100%;
  height : 100%;
  margin-bottom : 64px;
`

const StArrowBackDiv = styled.div`
  margin-top : 64px;
  width : 36px;
  height : 36px;
  display : flex;
  align-items : center;
`

const StManageTitle = styled.div`
  font-size : 32px;
  font-weight : 900;
  margin-top : 32px;
  color : #303030;
`;

const StSubTitleDiv = styled.div`
  margin-top : 32px;
  display : flex;
  align-items: flex-end;
  gap : 8px;
  margin-bottom : 16px;
`

const StSubTitle = styled.div`
  font-size : 24px;
  font-weight : 700;
  color : #303030;
`

const StSubTitleMgT = styled.div`
  font-size : 24px;
  font-weight : 700;
  color : #303030;
  margin-bottom : 32px;
`

const StSubTitleEdit = styled.div`
  font-size : 16px;
  font-weight : 700;
  color : #007aff;
  &:hover {
    cursor : pointer;
  }
`

const StMypageProfile = styled.div`
  width : 256px;
  height : 256px;
  border-radius : 256px;
  background-color : white;
  background-image : url('${(props : {img : string}) => props.img}');
  background-size : cover;
  background-position : center;
  box-shadow : 0px 0px 1rem rgba(0, 0, 0, 0.1);
`

const StMypageProfileEdit = styled.div`
  width : 256px;
  height : 256px;
  border-radius : 256px;
  position : absolute;
  background : linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
  opacity : 0%;
  transition : 200ms;
  color : transparent;
  display : flex;
  justify-content : center;
  align-items: flex-end;
  &:hover {
    opacity : 100%;
    cursor : pointer;
  }
`

const StMypageProfileEditText = styled.div`
  font-size : 1rem;
  font-weight : 700;
  color : white;
  transition : 200ms;
  opacity : 100%;
  margin-bottom : 1rem;
  &:hover {
    opacity : 100%;
    cursor : pointer;
  }
`

const StMypageProfileEditInput = styled.input`
  display : none;
`

const StMypageText = styled.div`
  font-size : 1rem;
  font-weight : 400;
  line-height : 1.5rem;
  color : #303030;
`

const StMypageTextInput = styled.input`
  font-size : 1rem;
  font-weight : 400;
  line-height : 1.5rem;
  color : #303030;
  border : none;
  color : #007aff;
  width : 100%;
  &:focus {
    outline : none;
  }
`

const StMypageWorkspaceDiv = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : flex-start;
  align-items : flex-start;
  width : 100%;
  height : 100%;
  margin-bottom : 64px;
`