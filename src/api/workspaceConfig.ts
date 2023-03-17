import instance from "./instance/instance";

const getWorkspaceInfo = async () => {
    const response = await instance.get(`/api/managing?id=1`);
    return response.data;
};

const editWorkspaceTitle = async ({workspaceTitle}:{workspaceTitle:string}) => {
    const response = await instance.patch(`/api/managing/1/title`, {workspaceTitle});
    return response.data;
};

const editWorkspaceDesc = async ({workspaceDesc}:{workspaceDesc:string}) => {
    const response = await instance.patch(`/api/managing/1/description`, {workspaceDesc});
    return response.data;
};

const getWorkspaceMember = async () => {
    const response = await instance.get(`/api/managing/1/people`);
    return response.data;
};

const editProfileImg = async ({workspaceImage} : {workspaceImage: FormData}) => {
    const response = await instance.post(`/api/managing/1/image`, {workspaceImage}, 
        {
            headers: {"Context-Type": "multipart/form-data"},
        }
    );
    return response.data;
};

export {getWorkspaceInfo, editWorkspaceTitle, editWorkspaceDesc, getWorkspaceMember, editProfileImg};