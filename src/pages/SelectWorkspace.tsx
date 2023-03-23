import { useState } from "react";
import styled from "styled-components";
import Wrapper from "../components/common/Wrapper";
import CreateWorkspaceModal from "../components/selectWorkspace/CreateWorkspaceModal";
import useOutsideClick from "../hooks/useOutsideClick";
import { useQuery } from "react-query";
import { getWorkspaceList } from "../api/selectWorkspace";
import MyWorkspaceList from "../components/selectWorkspace/MyWorkspaceList";
import NavBarWorkspace from "../components/common/NavBarWorkspace";

const SelectWorkspace = () => {
  const { data } = useQuery('workspaceList', getWorkspaceList);

  const [createModal, setCreateModal] = useState(false);
  const modalRef = useOutsideClick(() => setCreateModal(false));

  return (
    <Wrapper>
      <NavBarWorkspace />
      <StContainer>
        <StTopBox>
          <StTitle>나의 워크스페이스</StTitle>
          <StCreateWorkspaceBtn onClick={() => {
            setCreateModal(true)
            document.body.style.overflow = "hidden";
          }}>워크스페이스 생성</StCreateWorkspaceBtn>
        </StTopBox>
        <MyWorkspaceList workspaceList={ data } />
      </StContainer>
      { createModal ? <CreateWorkspaceModal modalRef={modalRef} setCreateModal={(v: boolean) => setCreateModal(v)} /> : null }
    </Wrapper>
  )
}
export default SelectWorkspace;

const StContainer = styled.div`
  width: 80%;
  height: 100%;
  margin: 36px;
`;
const StCreateWorkspaceBtn = styled.button`
  
`;
const StTopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StTitle = styled.h3`
  
`;
