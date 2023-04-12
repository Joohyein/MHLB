import instance from "./instance/instance";

const duplicateEmailCheck = async ({ email }: { email: string }) => {
  const response = await instance.post("/api/users/duplicate-email", { email });
  return response;
};

const validateEmailCheck = async ({ email }: { email: string }) => {
  const response = await instance.post('/api/users/validate-email', { email });
  return response;
};

const navBarProfileImage = async () => {
  const response = await instance.get('/api/users/user-info');
  return response;
}

export { validateEmailCheck, duplicateEmailCheck, navBarProfileImage };