import instance from "./instance/instance";

const createWorkspace = async (formData: FormData) => {
    await instance.post('/api/workspaces', 
    formData,
    { headers: { "Content-Type": "multipart/form-data" } });
};

const getWorkspaceList = async () => {
    const response = await instance.get('/api/workspaces');
    return response.data;
};

export { getWorkspaceList, createWorkspace };
