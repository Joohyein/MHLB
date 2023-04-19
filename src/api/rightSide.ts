import instance from "./instance/instance";

const getChatList = async (workspaceId:number) => {
  const response = await instance.get(`/api/inbox?id=${345}`);
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


export { getPrevMessages, getUuid, getChatList };