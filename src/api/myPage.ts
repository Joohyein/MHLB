import instance from "./instance/instance";

const getUserData = async() => {
    const response = await instance.get('/api/mypage');
    return response.data;
  };

const editUserName = async({userName}: {userName: string}) => {
    const response = await instance.patch('/api/mypage/name', {userName});
    return response.data;
};

const editUserJob = async({userJob}: {userJob: string}) => {
  const response = await instance.patch('/api/mypage/job', {userJob});
  return response.data;
}

const editUserDesc = async({userDesc}: {userDesc: string}) => {
  const response = await instance.patch('/api/mypage/desc', {userDesc});
  console.log(response)
  return response.data;
}

const getWorkspaces = async() => {
  const response = await instance.get('/api/mypage/workspace');
  return response.data;
};

export { getUserData, editUserName, editUserJob, editUserDesc, getWorkspaces };