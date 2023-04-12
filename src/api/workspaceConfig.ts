import instance from "./instance/instance";

const getWorkspaceInfo = async ({workspaceId} : {workspaceId : string | undefined}) => {
    const response = await instance.get(`/api/managing?id=${workspaceId}`);
    return response.data;
};

const editProfileImg = async ({workspaceImage, workspaceId}:{workspaceImage: FormData, workspaceId: number}) => {
    const response = await instance.post(`/api/managing/${workspaceId}/image`, workspaceImage, 
        {headers: {"Content-Type": "multipart/form-data"}},
    );
    return response.data;
};

const editWorkspaceTitle = async ({workspaceTitle, workspaceId}:{workspaceTitle:string, workspaceId: number}) => {
    await instance.patch(`/api/managing/${workspaceId}/title`, {workspaceTitle});
};

const editWorkspaceDesc = async ({workspaceDesc, workspaceId}:{workspaceDesc:string, workspaceId: number}) => {
    await instance.patch(`/api/managing/${workspaceId}/description`, {workspaceDesc});
};

const getWorkspaceMember = async ({workspaceId} : {workspaceId : string | undefined}) => {
    const response = await instance.get(`/api/managing/${workspaceId}/people`);
    return response.data;
};

const editUserRole = async ({userId , userRole, workspaceId}:{userId: number, userRole: string, workspaceId: number}) => {
    await instance.patch(`/api/managing/${workspaceId}/people/${userId}/role`, {userRole});
};

const deleteUser = async ({userId, workspaceId}: {userId: number, workspaceId: number}) => {
    await instance.patch(`/api/managing/${workspaceId}/people/${userId}`);
};

const deleteWorkspace = async ({workspaceId}:{workspaceId:number}) => {
    await instance.patch(`/api/managing/${workspaceId}`);
}

export {getWorkspaceInfo, editWorkspaceTitle, editWorkspaceDesc, getWorkspaceMember, editProfileImg, editUserRole, deleteUser, deleteWorkspace};