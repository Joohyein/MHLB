import instance from "./instance/instance";

const createWorkspace = async () => {
    await instance.post('/api/workspaces', 
    {
        
    },
    {
        headers: {"Content-Type": "multipart/form-data"}
    });
};

export { createWorkspace };