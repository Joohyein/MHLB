import instance from "./instance/instance";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = instance.post("/api/users/login", { email, password });
  return response;
};

export { login };
