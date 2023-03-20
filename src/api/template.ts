import instance from "./instance/instance";

const temp = async () => {
  const response = await instance.get("/");
  return response;
};

export { temp };
