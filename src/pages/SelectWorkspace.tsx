import { useQuery } from "react-query";
import { getWorkspaceList } from "../api/selectWorkspace";
import Wrapper from "../components/common/Wrapper";
import MyWorkspaceList from "../components/selectWorkspace/MyWorkspaceList";

const SelectWorkspace = () => {
  const { data } = useQuery('workspaceList', getWorkspaceList);

  return <Wrapper>
    <MyWorkspaceList workspaceList={data} />
  </Wrapper>
};

export default SelectWorkspace;

