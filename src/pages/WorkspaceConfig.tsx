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

const WorkspaceConfig = () => {
  const { isLoading: isLoadingInfo, data: workspaceInfoData } = useQuery(
    'workspaceInfo',
    getWorkspaceInfo
  );
  const { isLoading: isLoadingMember, data: workspaceMember } = useQuery(
    'workspaceMember',
    getWorkspaceMember
  );
  // const imgInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  const imgInputRef = useRef<any>(null);

  const modalRef = useOutsideClick(() => setInviteModal(false));
  const deleteModalRef = useOutsideClick(() => setWorkspaceDeleteModal(false));
  const [inviteModal, setInviteModal] = useState(false);
  const [workspaceDeleteModal, setWorkspaceDeleteModal] = useState(false);

  const [editTitle, setEditTitle] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [imgFile, setImgFile] = useState<any>();
  const [image, setImage] = useState(workspaceInfoData?.workspaceImage);
  const [title, setTitle] = useState(workspaceInfoData?.workspaceTitle);
  const [description, setDescription] = useState(
    workspaceInfoData?.workspaceDesc
  );

  const [search, setSearch] = useState('');
  const [member, setMember] = useState(['']);
  const [memberCopy, setMemberCopy] = useState([]);

  useEffect(() => {
    setTitle(workspaceInfoData?.workspaceTitle);
    setDescription(workspaceInfoData?.workspaceDesc);
    setImage(workspaceInfoData?.workspaceImage);
  }, [workspaceInfoData, isLoadingInfo]);

  useEffect(() => {
    const arr = workspaceMember?.map((item: any) => item);
    setMemberCopy(arr);
  }, [workspaceMember, isLoadingMember]);

  // 버튼 클릭시 input으로 포커스
  const onClickImgUpload = () => {
    imgInputRef.current.click();
  };

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
      if (e.target.files[0].size >= 1024 ** 2 * 5) {
        alert(`5MB 이하 파일만 등록할 수 있습니다. 
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

  const onClickEditTitleHandler = (
    workspaceTitle: string,
    workspaceId: number
  ) => {
    if (!workspaceTitle) {
      alert('워크스페이스 이름을 입력해주세요');
      return;
    }
    setEditTitle(false);
    mutationTitle.mutate({ workspaceTitle, workspaceId });
  };

  const onClickEditDescHandler = (
    workspaceDesc: string,
    workspaceId: number
  ) => {
    if (!workspaceDesc) {
      alert('워크스페이스 설명을 입력해주세요');
      return;
    }
    setEditDesc(false);
    mutationDesc.mutate({ workspaceDesc, workspaceId });
  };

  // onKeyPress
  const onKeyPressTitleHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      onClickEditTitleHandler(title, workspaceInfoData?.workspaceId);
  };
  const onKeyPressDescHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      onClickEditDescHandler(description, workspaceInfoData?.workspaceId);
  };

  // Search Member
  interface UserDataType {
    id: number;
    userName: string;
    userEmail: string;
    userImage: string;
  }

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
        <StManageTitle>
          <ArrowBack size="16" fill="#363636" cursor="pointer" />
          <h3>워크스페이스 관리</h3>
        </StManageTitle>

        <StWorkspaceName>
          <StSub>워크스페이스 프로필 이미지</StSub>
          <StWorkspaceProfile>
            <StImgBox src={image} />
            <StProfileImg />
            <StImgInput
              type="file"
              name="workspaceImage"
              ref={imgInputRef}
              onChange={onImgChange}
              accept="image/png, image/jpg, image/jpeg, image/gif"
            />
            <StImgEditBtn onClick={onClickImgUpload}>Edit</StImgEditBtn>
          </StWorkspaceProfile>
        </StWorkspaceName>

        <StWorkspaceName>
          <StSub>워크스페이스 이름</StSub>
          <StEditBox>
            {editTitle ? (
              <>
                <StEditInput
                  name="workspaceTitle"
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                  onKeyPress={onKeyPressTitleHandler}
                />
                <h5
                  onClick={() =>
                    onClickEditTitleHandler(
                      title,
                      workspaceInfoData?.workspaceId
                    )
                  }
                >
                  Done
                </h5>
              </>
            ) : (
              <>
                <h3>{title}</h3>
                <h5 onClick={() => setEditTitle(true)}>Edit</h5>
              </>
            )}
          </StEditBox>
        </StWorkspaceName>

        <StWorkspaceName>
          <StSub>워크스페이스 설명</StSub>
          <StEditBox>
            {editDesc ? (
              <>
                <StEditInput
                  name="workspaceDesc"
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDescription(e.target.value)
                  }
                  onKeyPress={onKeyPressDescHandler}
                />
                <h5
                  onClick={() =>
                    onClickEditDescHandler(
                      description,
                      workspaceInfoData?.workspaceId
                    )
                  }
                >
                  Done
                </h5>
              </>
            ) : (
              <>
                <h3>{description}</h3>
                <h5 onClick={() => setEditDesc(true)}>Edit</h5>
              </>
            )}
          </StEditBox>
        </StWorkspaceName>
        <StSub>멤버 추가 및 삭제</StSub>

        <StSearchInviteBox>
          <StSearchUserInput
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search People"
          />
          <StAddMemBtn
            onClick={() => {
              setInviteModal(true);
              document.body.style.overflow = 'hidden';
            }}
          >
            멤버 초대
          </StAddMemBtn>
        </StSearchInviteBox>
        <StSearchUserData>
          {workspaceInfoData?.userRole === 'ADMIN'
            ? member?.map((item: any) => {
                return (
                  <StUserData key={String(item.userId)}>
                    <StUserProfileImg src={item.userImage} />
                    <StUserNameEmail>
                      <h3>{item.userName}</h3>
                      <h5>{item.userEmail}</h5>
                    </StUserNameEmail>
                    <StUserJob>
                      <h3>{item.userJob}</h3>
                    </StUserJob>
                    <StUserRole>
                      {item.userRole === 'ADMIN' ? null : (
                        <StUserRoleCheckbox
                          type="checkbox"
                          onChange={() =>
                            onChangeCheckboxHandler(item.userId, item.userRole)
                          }
                        />
                      )}
                      {item.userRole}
                    </StUserRole>
                    <RemoveCheckBtn
                      userRole={item.userRole}
                      userId={item.userId}
                      workspaceId={workspaceInfoData?.workspaceId}
                    />
                  </StUserData>
                );
              })
            : member?.map((item: any) => {
                return (
                  <StUserData key={String(item.userId)}>
                    <StUserProfileImg src={item.userImage} />
                    <StUserNameEmail>
                      <h3>{item.userName}</h3>
                      <h5>{item.userEmail}</h5>
                    </StUserNameEmail>
                    <StUserJob>
                      <h3>{item.userJob}</h3>
                    </StUserJob>
                    <StUserRole>{item.userRole}</StUserRole>
                    <RemoveCheckBtn
                      userRole={item.userRole}
                      userId={item.userId}
                      workspaceId={workspaceInfoData?.workspaceId}
                    />
                  </StUserData>
                );
              })}
        </StSearchUserData>
        {workspaceInfoData?.userRole === 'ADMIN' ? (
          <StDangerZoneContainer>
            <StDangerZoneTitle>Danger Zone</StDangerZoneTitle>
            <StDangerZoneBox>
              <h3>현재 워크스페이스 삭제</h3>
              <StWorkspaceDeleteBtn
                onClick={() => {
                  setWorkspaceDeleteModal(true);
                  document.body.style.overflow = 'hidden';
                }}
              >
                Delete
              </StWorkspaceDeleteBtn>
            </StDangerZoneBox>
          </StDangerZoneContainer>
        ) : null}
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
  margin: 24px;
  width: 90%;
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
  width: 128px;
  height: 128px;
  background-color: gray;
  border-radius: 50%;
  position: relative;
`;
const StImgBox = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
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
  background-color: #e3e3e3;
  cursor: pointer;

  position: absolute;
  top: 0px;
  right: 0px;
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
    color: #007aff;
    font-weight: 400;
    cursor: pointer;
  }
`;
const StSub = styled.div``;
const StEditBox = styled.div`
  display: flex;
  gap: 8px;
`;
const StEditInput = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  &:focus {
    outline: none;
  }
`;

const StAddMemBtn = styled.button``;

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
const StUserProfileImg = styled.img`
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
    color: #b7b7b7;
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
    color: #1b86ff;
  }
`;
const StUserRole = styled.div`
  font-size: 12px;
  color: #707070;
`;
const StUserRoleCheckbox = styled.input``;

const StDangerZoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const StDangerZoneBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StDangerZoneTitle = styled.h3``;
const StWorkspaceDeleteBtn = styled.button``;
