import { useState } from "react";
import styled from "styled-components";
import Wrapper from "../components/common/Wrapper";
import CreateWorkspaceModal from "../components/selectWorkspace/CreateWorkspaceModal";
import useOutsideClick from "../hooks/useOutsideClick";

const SelectWorkspace = () => {
  const [createModal, setCreateModal] = useState(false);
  const modalRef = useOutsideClick(() => setCreateModal(false));

  return <Wrapper>
    <StCreateWorkspaceBtn onClick={() => {
      setCreateModal(true)
      document.body.style.overflow = "hidden";
    }}>워크스페이스 생성</StCreateWorkspaceBtn>
    {
      createModal
        ?
        <CreateWorkspaceModal modalRef={modalRef} setCreateModal={(v: boolean) => setCreateModal(v)} />
        :
        null
    }
  </Wrapper>
}
export default SelectWorkspace;

const StCreateWorkspaceBtn = styled.button`
  
`;