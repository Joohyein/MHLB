import instance from "./instance/instance";

const createWorkspace = async (formData: FormData) => {
    await instance.post('/api/workspaces', 
    formData,
    { headers: { "Content-Type": "multipart/form-data" } });
};

export { createWorkspace };