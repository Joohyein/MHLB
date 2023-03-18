import instance from "./instance/instance";

const login = async ({email, password} : {email: string, password: string}) => {
  const response = instance.post("/api/users/login", { email, password });
  return response;
};

const register = async ({email, password, userName, userImage, userJob, userDesc} : {email: string, password: string, userName: string, userImage: any, userJob: string, userDesc: string}) => {
  const response = instance.post("/api/users/register", {email, password, userName, userImage, userJob, userDesc});
  return response;
};

const sendResetPasswordEmail = ({email} : {email : string}) => {
  const response = instance.post("/api/users/check/email", {email});
  return response;
}

export { login, register, sendResetPasswordEmail };
