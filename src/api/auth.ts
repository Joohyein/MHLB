import instance from "./instance/instance";

const login = async ({email, password} : {email: string, password: string}) => {
  const response = await instance.post("/api/users/login", { email, password });
  return response;
};

const register = async ({email, password, userName, userJob, userDesc} : {email: string, password: string, userName: string, userJob: string, userDesc: string}) => {
  const tmpObj = {userJob, userDesc}
  if (tmpObj.userJob === '') {
    tmpObj.userJob = 'White collar';
  }
  if (userDesc === '') {
    tmpObj.userDesc = 'Hello!';
  }
  const response = await instance.post("/api/users/register", {email, password, userName, userJob : tmpObj.userJob, userDesc : tmpObj.userDesc});
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

const getGoogleCode = async (code : string) => {
  const response = await instance.get(`http://potato-fried.shop:8080/api/users/auth/google/callback?code=${code}`);
  return response;
}

const googleLoginRequest = async () => {
  const redirectUri = encodeURIComponent('http://localhost:3000/google-auth');
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=766535092476-o59t1krg7rku29jflccpiuo9g98o5pvl.apps.googleusercontent.com&redirect_uri=${redirectUri}&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
  
  window.open(authUrl,'Pin me AUTH','width=430,height=500,location=yes,status=no,scrollbars=yes');
 
  const handleMessage = (event : any) => {
    if (event.origin !== window.origin) return;
    return event.data;
  };

  const tmpPrms = await new Promise((resolve, reject) => {
    const tmpFunc = (event : any) => {
      resolve(handleMessage(event));
      window.removeEventListener('message', tmpFunc);
    }
    window.addEventListener('message', tmpFunc);
  });

  return tmpPrms;
};

export { login, register, sendResetPasswordEmail, resetPassword, getGoogleCode, googleLoginRequest };
