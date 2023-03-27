import instance from "./instance/instance";

const getPeopleList = async (workspaceId:number | undefined) => {
  if(workspaceId){
    const response = await instance.get(`/api/workspaces/${workspaceId}/people`);
    return response.data;
  }
  
};

export { getPeopleList };