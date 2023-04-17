import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import Wrapper from '../components/common/Wrapper';
import ArrowBack from '../components/asset/icons/ArrowBack';
import AddMemberModal from '../components/modal/AddMemberModal';
import useOutsideClick from '../hooks/useOutsideClick';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  editProfileImg,
  editUserRole,
  editWorkspaceDesc,
  editWorkspaceTitle,
  getWorkspaceInfo,
  getWorkspaceMember,
} from '../api/workspaceConfig';
import RemoveCheckBtn from '../components/workspaceConfig/RemoveCheckBtn';
import DeleteWorkspaceModal from '../components/workspaceConfig/DeleteWorkspaceModal';
import { useNavigate, useParams } from 'react-router-dom';
import Plus from '../components/asset/icons/Plus';
import useInput from '../hooks/useInput';
import { GvWorkspaceDescLength, GvWorkspaceNameLength } from '../global/LimitConfig';
import { logEvent } from '../util/amplitude';

const WorkspaceConfig = () => {

  const params = useParams();
  const navigate = useNavigate();

  const { isLoading: isLoadingInfo, data: workspaceInfoData } = useQuery('workspaceInfo',() => getWorkspaceInfo({workspaceId : params.workspaceId}));
  const { isLoading: isLoadingMember, data: workspaceMember } = useQuery('workspaceMember',() => getWorkspaceMember({workspaceId : params.workspaceId}));
  const imgInputRef = useRef<any>(null);
  const titleInputRef:React.MutableRefObject<any> = useRef(null);

  const modalRef = useOutsideClick(() => setInviteModal(false));
  const deleteModalRef = useOutsideClick(() => setWorkspaceDeleteModal(false));
  const [inviteModal, setInviteModal] = useState(false);
  const [workspaceDeleteModal, setWorkspaceDeleteModal] = useState(false);

  const [editTitle, setEditTitle] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [imgFile, setImgFile] = useState<any>();
  const [image, setImage] = useState(workspaceInfoData?.workspaceImage);
  const [title, setTitle] = useInput(workspaceInfoData?.workspaceTitle);
  const [description, setDescription] = useInput(workspaceInfoData?.workspaceDesc);
  const [titleValidation, setTitleValidation] = useState(false);
  const [descValidation, setDescValidation] = useState(false);

  const [search, setSearch] = useState('');
  const [member, setMember] = useState(['']);
  const [memberCopy, setMemberCopy] = useState([]);

  useEffect(() => {
    logEvent('Enter Workspace config page', {from: 'Workspace config page'});
    setTitle(workspaceInfoData?.workspaceTitle);
    setDescription(workspaceInfoData?.workspaceDesc);
    setImage(workspaceInfoData?.workspaceImage);
  }, [workspaceInfoData, isLoadingInfo]);

  useEffect(() => {
    const arr = workspaceMember?.map((item: any) => item);
    setMemberCopy(arr);
  }, [workspaceMember, isLoadingMember]);

  const queryClient = useQueryClient();

  const mutationImg = useMutation(editProfileImg, {
    onSuccess: async () => {
      queryClient.invalidateQueries('workspaceInfo');
    },
    onError: (error) => {
      console.log('error : ', error);
    },
  });

  const mutationTitle = useMutation(editWorkspaceTitle, {
    onSuccess: () => {
      queryClient.invalidateQueries('workspaceInfo');
    },
    onError: (error) => {
      console.log('error : ', error);
    },
  });

  const mutationDesc = useMutation(editWorkspaceDesc, {
    onSuccess: () => {
      queryClient.invalidateQueries('workspaceInfo');
    },
    onError: (error) => {
      console.log('error : ', error);
    },
  });

  const mutationRole = useMutation(editUserRole, {
    onSuccess: () => {
      queryClient.invalidateQueries('workspaceMember');
    },
  });

  const onImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].size >= 1024 ** 2 * 10) {
        alert(`10MB 이하 파일만 등록할 수 있습니다. 
현재 파일 용량: ${Math.round(e.target.files[0].size / 1024 / 1024)}MB`);
        return;
      } else setImgFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (!imgFile) return;
    const workspaceId = workspaceInfoData?.workspaceId;
    const workspaceImage = new FormData();
    workspaceImage.append('workspaceImage', imgFile);
    mutationImg.mutate({ workspaceImage, workspaceId });
  }, [imgFile]);

  const onClickEditCompleteTitleHandler = (workspaceTitle: string, workspaceId: number) => {
    const tmpWorkspaceTitle = workspaceTitle.replaceAll(' ', '');
    if (!workspaceTitle || !tmpWorkspaceTitle) {
      setTitleValidation(true);
      return;
    }
    setEditTitle(false);
    mutationTitle.mutate({ workspaceTitle, workspaceId });
  };

  const onClickEditCompleteDescHandler = (workspaceDesc: string, workspaceId: number) => {
    const tmpWorkspaceDesc = workspaceDesc.replaceAll(' ', '');
    if (!workspaceDesc || !tmpWorkspaceDesc) {
      setDescValidation(true);
      return;
    }
    setEditDesc(false);
    mutationDesc.mutate({ workspaceDesc, workspaceId });
  };

  const onClickEditTitleHandler = () => {
    setEditTitle(true);
  };

  // onKeyPress
  const onKeyPressTitleHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onClickEditCompleteTitleHandler(title, workspaceInfoData?.workspaceId);
  };
  const onKeyPressDescHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onClickEditCompleteDescHandler(description, workspaceInfoData?.workspaceId);
  };

  // Search Member
  interface UserDataType {
    id: number;
    userName: string;
    userEmail: string;
    userImage: string;
  };

  useEffect(() => {
    setMember(
      memberCopy?.filter((item: UserDataType) =>
        item.userName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, memberCopy]);

  // checkbox - userRole change
  const onChangeCheckboxHandler = (userId: number, userRole: string) => {
    if (userRole === 'MANAGER') userRole = 'MEMBER';
    else userRole = 'MANAGER';
    const workspaceId = workspaceInfoData?.workspaceId;
    mutationRole.mutate({ userId, userRole, workspaceId });
  };

  return (
    <Wrapper>
      <StContainer>
        <StWorkspaceProfileDiv>
          <StArrowBackDiv onClick = {() => {navigate(`/workspace/${params.workspaceId}`)}}><ArrowBack size="30" fill="#303030" cursor="pointer" /></StArrowBackDiv>
          <StManageTitle>워크스페이스 관리</StManageTitle>
          <StSubTitleDiv>
            <StSubTitle>워크스페이스 이미지</StSubTitle>
            <StSubTitleEdit onClick = {() => {imgInputRef.current.click()}}>이미지 변경</StSubTitleEdit>
          </StSubTitleDiv>
          <StWorkspaceProfile img={image}>
            <StWorkspaceProfileEdit onClick = {() => {imgInputRef.current.click()}}>
              <StWorkspaceProfileEditText>
                이미지 편집
                <StWorkspaceProfileEditInput
                  type="file"
                  name="workspaceImage"
                  ref={imgInputRef}
                  onChange={onImgChange}
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                />
              </StWorkspaceProfileEditText>
            </StWorkspaceProfileEdit>
          </StWorkspaceProfile>

          <StSubTitleDiv>
            <StSubTitle>워크스페이스 이름</StSubTitle>
            {editTitle ? <StSubTitleEdit onClick={() => onClickEditCompleteTitleHandler(title, workspaceInfoData?.workspaceId)}>편집 완료</StSubTitleEdit> : <StSubTitleEdit onClick={onClickEditTitleHandler}>편집</StSubTitleEdit>}
          </StSubTitleDiv>
          {editTitle
          ? <>
            <StWorkspaceTextInput
              name = "workspaceTitle"
              value = {title}
              onChange = {(e: React.ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value); setTitleValidation(false)}}
              onKeyPress = {onKeyPressTitleHandler}
              ref = {titleInputRef}
              maxLength={GvWorkspaceNameLength}
            />
            <StInputValidationBox>{titleValidation && <StInputValidationText>워크스페이스 이름을 입력해 주세요.</StInputValidationText>}</StInputValidationBox>
            </>
          : <StWorkspaceText>{title}</StWorkspaceText>
          }
          <StSubTitleDiv>
            <StSubTitle>워크스페이스 소개</StSubTitle>
            {editDesc ? <StSubTitleEdit onClick={() => onClickEditCompleteDescHandler(description, workspaceInfoData?.workspaceId)}>편집 완료</StSubTitleEdit> : <StSubTitleEdit onClick={() => {setEditDesc(true)}}>편집</StSubTitleEdit>}
          </StSubTitleDiv>
          {editDesc
          ? <>
            <StWorkspaceTextInput
              name="workspaceDesc"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setDescription(e.target.value); setDescValidation(false)}}
              onKeyPress={onKeyPressDescHandler}
              maxLength={GvWorkspaceDescLength}
            />
            <StInputValidationBox>{descValidation && <StInputValidationText>워크스페이스 소개를 입력해 주세요.</StInputValidationText>}</StInputValidationBox>
            </>
          : <StWorkspaceText>{description}</StWorkspaceText>
          }
        </StWorkspaceProfileDiv>
        <StWorkspaceMemberDiv>
          <StSubTitle>워크스페이스에 멤버 추가 및 삭제</StSubTitle>
          <StMemberManagementDiv>
            <StMemberSearch onChange={(e) => setSearch(e.target.value)} placeholder="Search People"/>
            <StMemberInviteButton onClick={() => {setInviteModal(true); document.body.style.overflow = 'hidden'}}>멤버 추가하기<Plus size = '24' fill = 'white'/></StMemberInviteButton>
          </StMemberManagementDiv>
          <StMemberList>
            {member?.map((item : any) => {
              return (
                <StMemberInfoDiv key={String(item.userId)}>
                  <StMemberProfileImage img = {item.userImage} />
                  <StMemberTextInfoDiv>
                    <StMemberNameAndEmail>
                      <StMemberName>{item.userName}</StMemberName>
                      <StMemberEmail>{item.userEmail}</StMemberEmail>
                    </StMemberNameAndEmail>
                    <StMemberJob>{item.userJob}</StMemberJob>
                  </StMemberTextInfoDiv>
                  {item.userRole === 'ADMIN'
                    ?<StRoleDiv role = 'ADMIN'>
                    <StRole>{item.userRole}</StRole>
                    </StRoleDiv>
                    :<StRoleDiv role = 'other'>
                      {item.userRole === 'MANAGER' ? <StRoleCheckbox type = 'checkbox' checked={true} onChange={() => onChangeCheckboxHandler(item.userId, item.userRole)} />
                        : <StRoleCheckbox type = 'checkbox' checked={false} onChange={() => onChangeCheckboxHandler(item.userId, item.userRole)} />}
                      <StRole>{item.userRole}</StRole>
                    </StRoleDiv>
                  }
                  {item.userRole === 'ADMIN' ? null : <RemoveCheckBtn userRole={item.userRole}userId={item.userId} workspaceId={workspaceInfoData?.workspaceId}/>}
                </StMemberInfoDiv>
              )
            })}
          </StMemberList>
        </StWorkspaceMemberDiv>
        { workspaceInfoData?.userRole === 'ADMIN' &&
          <StWorkspaceDeleteDiv>
          <StSubTitle>데인저존</StSubTitle>
          <StWorkspaceDeleteContentDiv>
            <StWorkspaceDeleteMessageDiv>
                <StWorkspaceDeleteMessage>현재 워크스페이스 영구적으로 삭제하기</StWorkspaceDeleteMessage>
                <StWorkspaceDeleteSubMessage>경고 - 워크스페이스를 삭제하시면 복구할 수 없습니다.</StWorkspaceDeleteSubMessage>
            </StWorkspaceDeleteMessageDiv>
            <StWorkspaceDeleteButton onClick={() => {setWorkspaceDeleteModal(true); document.body.style.overflow = 'hidden'}}>워크스페이스 삭제하기</StWorkspaceDeleteButton>
          </StWorkspaceDeleteContentDiv>
        </StWorkspaceDeleteDiv>}
      </StContainer>
      {inviteModal ? (
        <AddMemberModal
          modalRef={modalRef}
          workspaceId={workspaceInfoData?.workspaceId}
          setInviteModal={(v: boolean) => setInviteModal(v)}
        />
      ) : null}
      {workspaceDeleteModal ? (
        <DeleteWorkspaceModal
          deleteModalRef={deleteModalRef}
          workspaceInfoData={workspaceInfoData}
          setWorkspaceDeleteModal={(v: boolean) => setWorkspaceDeleteModal(v)}
        />
      ) : null}
    </Wrapper>
  );
};

export default WorkspaceConfig;

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

const StWorkspaceProfileDiv = styled.div`
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

const StSubTitleEdit = styled.div`
  font-size : 16px;
  font-weight : 700;
  color : #007aff;
  &:hover {
    cursor : pointer;
  }
`

const StWorkspaceProfile = styled.div`
  width : 256px;
  height : 256px;
  border-radius : 256px;
  background-color : #303030;
  background-image : url('${(props : {img : string}) => props.img}');
  background-size : cover;
  background-position : center;
`

const StWorkspaceProfileEdit = styled.div`
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

const StWorkspaceProfileEditText = styled.div`
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

const StWorkspaceProfileEditInput = styled.input`
  display : none;
`

const StWorkspaceText = styled.div`
  font-size : 1rem;
  font-weight : 400;
  line-height : 1.5rem;
  color : #303030;
`

const StWorkspaceTextInput = styled.input`
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

const StWorkspaceMemberDiv = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : flex-start;
  align-items : flex-start;
  width : 100%;
  height : 100%;
  margin-bottom : 64px;
`

const StMemberManagementDiv = styled.div`
  margin-top : 32px;
  margin-bottom : 16px;
  width : 100%;
  display : flex;
  align-items : center;
  justify-content : space-between;
  gap : 8px;
`

const StMemberSearch = styled.input`
  border : none;
  background-color : white;
  width : 100%;
  height : 48px;
  border-radius : 32px;
  box-shadow : 0px 0px 16px 4px rgba(0, 0, 0, 0.05);
  padding-left : 24px;
  box-sizing : border-box;
  transition : 200ms;
  &::placeholder {
    color : #7F7F7F
  }
  &:focus {
    outline : 2px solid #007aff;
    outline-offset : -2px;
    color : #007aff;
  }
`

const StMemberInviteButton = styled.button`
  margin-left : 16px;
  border : none;
  border-radius : 4px;
  padding : 8px 16px;
  background : #007aff;
  color : white;
  font-size : 16px;
  font-weight : 700;
  display: flex;
  align-items: center;
  transition : 200ms;
  flex-shrink : 0;
  &:hover {
    cursor : pointer;
    background : #3395ff;
  }
  &:active {
    scale : 1.05;
  }
`

const StMemberList = styled.div`
  width : 100%;
  height : 100%;
  display : flex;
  flex-direction : column;
`

const StMemberInfoDiv = styled.div`
  width : 100%;
  height : 80px;
  display : flex;
  flex-direction : row;
  justify-content : flex-start;
  align-items : center;
  border-bottom : 1px solid #f1f1f1;
`

const StMemberProfileImage = styled.div`
  width : 48px;
  height : 48px;
  border-radius : 48px;
  background : gray;
  background-image : url('${(props : {img : string}) => props.img}');
  background-size : cover;
  background-position : center;
  margin-right : 16px;
`

const StMemberTextInfoDiv = styled.div`
  display : flex;
  justify-content : flex-start;
  flex-direction : column;
  gap : 4px;
  margin-right : auto;
`

const StMemberNameAndEmail = styled.div`
  display : flex;
  align-items : flex-end;
  gap : 8px;
`

const StMemberName = styled.div`
  font-size : 16px;
  font-weight : 700;
  color : #303030;
`

const StMemberEmail = styled.div`
  font-size : 0.75rem;
  font-weight : 400;
  color : #7f7f7f;
`

const StMemberJob = styled.div`
  font-size : 0.75rem;
  font-weight : 400;
  color : #7f7f7f;
`

const StRoleDiv = styled.div`
  display : flex;
  justify-content : flex-end;
  gap : 8px;
  margin-right : ${(props : any) => props.role === 'ADMIN' ? '94px' : '32px' };
`

const StRoleCheckbox = styled.input`
  
`

const StRole = styled.div`
  font-size : 16px;
  font-weight : 700;
  color : #7f7f7f;
`

const StWorkspaceDeleteDiv = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : flex-start;
  align-items : flex-start;
  width : 100%;
  height : 100%;
  margin-bottom : 64px;
`

const StWorkspaceDeleteContentDiv = styled.div`
  margin-top : 33px;
  display : flex;
  flex-direction : row;
  justify-content : space-between;
  align-items : center;
  width : 100%;
`

const StWorkspaceDeleteMessageDiv = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : flex-start;
  align-items : flex-start;
  width : 100%;
  height : 100%;
  gap : 4px;
`

const StWorkspaceDeleteMessage = styled.div`
  font-size : 1rem;
  font-weight : 400;
  color : #303030;
`

const StWorkspaceDeleteSubMessage = styled.div`
  font-size : 0.75rem;
  font-weight : 400;
  color : #7f7f7f;
`

const StWorkspaceDeleteButton = styled.button`
  background : #ff3b30;
  padding : 8px 16px;
  border-radius : 4px;
  border : none;
  height : 35px;
  color : white;
  font-size : 16px;
  font-weight : 700;
  transition : 200ms;
  flex-shrink : 0;
  &:hover {
    background : #ff645c;
    cursor : pointer;
  }
`

const StInputValidationBox = styled.div`
  position: relative;
  width: 100%; 
`;
const StInputValidationText = styled.h3`
  position: absolute;
  top: 0;
  font-size : 0.75rem;
  font-weight : 400;
  color : #ff3b30;
`;