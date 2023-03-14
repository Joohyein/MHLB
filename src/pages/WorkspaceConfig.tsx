import styled from "styled-components";
import { useEffect, useState } from "react";
import Wrapper from "../components/common/Wrapper";
import ArrowBack from "../components/asset/icons/ArrowBack";
import AddMemberModal from "../components/modal/AddMemberModal";
import useOutsideClick from "../hooks/useOutsideClick";

const WorkspaceConfig = () => {
  const modalRef = useOutsideClick(()=>setInviteModal(false));
  const [inviteModal, setInviteModal] = useState(false);

  const [search, setSearch] = useState('');
  const [member, setMember] = useState(['']);
  const [memberCopy, setMemberCopy] = useState(['']);

  useEffect(() => {
    const arr: string[] = ['권재현', '권다빈', '전다빈', '전지상', '전재현', '주혜인', '주다빈', '주지상', '황지상', '황다빈', '황우람', '홍우람', '홍지상', '홍재현'];
    setMember(arr);
    setMemberCopy(arr);
  }, []);

  useEffect(() => {
    setMember(memberCopy.filter((e)=>e.toLowerCase().includes(search.toLowerCase())));
  }, [search, memberCopy]);

  return <Wrapper>
    <StContainer>
      <StManageTitle>
        <ArrowBack size="24" fill="#363636" cursor="pointer"/>
        <h3>워크스페이스 관리</h3>
      </StManageTitle>
      <StWorkspaceName>
        <StTitleBox>워크스페이스 프로필 이미지</StTitleBox>
        <StWorkspaceProfile></StWorkspaceProfile>
      </StWorkspaceName>
      <StWorkspaceName>
        <StTitleBox>워크스페이스 이름</StTitleBox>
        <StEditBox>
          <h3>폭스바겐</h3>
          <h5>Edit</h5>
        </StEditBox>
      </StWorkspaceName>
      <StWorkspaceName>
        <StTitleBox>워크스페이스 설명</StTitleBox>
        <StEditBox>
          <h3>워크스페이스의 설명을 입력해주세요</h3>
          <h5>Edit</h5>
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
          member.map((item) => {
            return <StUserData>
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