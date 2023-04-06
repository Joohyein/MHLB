import instance from "./instance/instance";

const login = async ({email, password} : {email: string, password: string}) => {
  const response = await instance.post("/api/users/login", { email, password });
  return response;
};

const register = async ({email, password, userName, userImage, userJob, userDesc} : {email: string, password: string, userName: string, userImage: any, userJob: string, userDesc: string}) => {
  const tmpObj = {userJob, userDesc}
  if (tmpObj.userJob === '') {
    tmpObj.userJob = 'White collar';
  }
  if (userDesc === '') {
    tmpObj.userDesc = 'Hello!';
  }
  const response = await instance.post("/api/users/register", {email, password, userName, userImage, userJob : tmpObj.userJob, userDesc : tmpObj.userDesc});
  return response;
};

const sendResetPasswordEmail = async ({email} : {email : string}) => {
  const response = await instance.post("/api/users/check/email", {email});
  return response;
}

const resetPassword = async (uuid : any, {password} : {password : string}) => {
  const response = await instance.post(`/api/users/reset/password/${uuid}`, {password});
  return response;
}

export { login, register, sendResetPasswordEmail, resetPassword };
