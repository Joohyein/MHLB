import instance from "./instance/instance";

const duplicateEmailCheck = async ({ email }: { email: string }) => {
  const response = instance.post("/api/users/duplicate-email", { email });
  return response;
};

export { duplicateEmailCheck };
