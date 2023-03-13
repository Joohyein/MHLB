import instance from "./instance/instance";

const temp = async () => {
  const response = instance.get("/");
  return response;
};

export { temp };
