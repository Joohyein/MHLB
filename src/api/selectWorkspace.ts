import instance from "./instance/instance";

const getWorkspaceList = async () => {
    const response = await instance.get('/api/workspaces');
    return response.data;
};

export { getWorkspaceList };