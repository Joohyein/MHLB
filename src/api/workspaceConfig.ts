import instance from "./instance/instance";

const getWorkspaceInfo = async () => {
    const response = await instance.get(`/api/managing?id=1`);
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

const getWorkspaceMember = async () => {
    const response = await instance.get(`/api/managing/1/people`);
    return response.data;
};

const editUserRole = async ({userId , userRole, workspaceId}:{userId: number, userRole: string, workspaceId: number}) => {
    await instance.patch(`/api/managing/${workspaceId}/people/${userId}`, {userRole});
};

const deleteUser = async ({userId, workspaceId}: {userId: number, workspaceId: number}) => {
    await instance.delete(`/api/managing/${workspaceId}/people/${userId}`);
};

const deleteWorkspace = async ({workspaceId}:{workspaceId:number}) => {
    await instance.delete(`/api/managing/${workspaceId}/delete`);
}

export {getWorkspaceInfo, editWorkspaceTitle, editWorkspaceDesc, getWorkspaceMember, editProfileImg, editUserRole, deleteUser, deleteWorkspace};