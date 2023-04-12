import instance from "./instance/instance";

const inviteMember = async ({workspaceId, email}:{workspaceId: number, email: string}) => {
    await instance.post(`/api/managing/${workspaceId}/invite`, {email});
};

const getInviteMembers = async (workspaceId: number) => {
    const response = await instance.get(`/api/managing/${workspaceId}/invite`);
    return response.data;
};

const cancelInvite = async ({workspaceId, inviteId}: {workspaceId: number, inviteId: number}) => {
    await instance.delete(`/api/managing/${workspaceId}/invite/${inviteId}`);
};

export { inviteMember, getInviteMembers, cancelInvite };