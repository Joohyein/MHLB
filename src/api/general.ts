import instance from "./instance/instance";

const duplicateEmailCheck = async ({ email }: { email: string }) => {
  const response = instance.post("/api/users/duplicate-email", { email });
  return response;
};

const validateEmailCheck = async ({ email }: { email: string }) => {
  const response = instance.post("/api/users/validate-email", { email });
  return response;
};

export { validateEmailCheck, duplicateEmailCheck };