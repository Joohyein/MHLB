import instance from "./instance/instance";

const inviteMember = async (workspaceId: number, email: string) => {
    await instance.post(`/api/workspaces/${workspaceId}/invite`, {email});
};

const getInviteMembers = async (workspaceId: number) => {
    const response = await instance.get(`/api/workspaces/${workspaceId}/invite`);
    return response.data;
};

const cancelInvite = async ({workspaceId, inviteId}: {workspaceId: number, inviteId: number}) => {
    await instance.delete(`/api/workspaces/${workspaceId}/invite/${inviteId}`);
}

export { inviteMember, getInviteMembers, cancelInvite };