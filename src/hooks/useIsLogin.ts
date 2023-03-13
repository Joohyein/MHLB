import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

const useIsLogin = (initialStatus: boolean = false) => {
  const [isLogin, setIsLogin] = useState(initialStatus);
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("authorization")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return isLogin;
};

export default useIsLogin;
