import { Cookies } from "react-cookie";

const useLogout = () => {
  const cookies = new Cookies();
  const useLogout = () => {
    cookies.remove("authorization",  {path: "/"});
  };
  return useLogout;
};

export default useLogout;