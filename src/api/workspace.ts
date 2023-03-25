import instance from "./instance/instance";

const getWorkspaceList = async () => {
  const response = await instance.get("/api/workspaces/order");
  return response;
};

const reorderWorkspaceList = async ({orders} : {orders : {workspaceId : number, ordernum : number}[]}) => {
    const response = await instance.patch("/api/workspaces/order", {orders});
    return response;
}

const getMainWorkspaceInfo = async ({workspaceId} : {workspaceId : string}) => {
  const response = await instance.get(`/api/workspaces/?id=${workspaceId}`);
  return response;
}

export { getWorkspaceList, reorderWorkspaceList, getMainWorkspaceInfo };
