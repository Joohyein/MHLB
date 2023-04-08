import instance from "./instance/instance";

const getPeopleList = async (workspaceId:number | undefined) => {
  if(workspaceId){
    const response = await instance.get(`/api/workspaces/${workspaceId}/people`);
    return response.data;
  }
};

const getChatList = async (workspaceId:number) => {
  const response = await instance.get(`/api/inbox?id=${workspaceId}`);
  return response.data;
};

const getPrevMessages = async (workspaceId:number, userId:number, index:number) => {
  const response = await instance.get(`/api/inbox/${workspaceId}/${userId}?page=${index}`, );
  return response.data;
};

const getUuid = async (workspaceId:number, userId:number) => {
  const response = await instance.post(`/api/inbox/${workspaceId}`, {userId});
  return response.data.uuid;
};


export { getPeopleList, getPrevMessages, getUuid, getChatList };