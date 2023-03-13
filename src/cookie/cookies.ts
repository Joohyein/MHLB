import { Cookies } from "react-cookie";
const cookies = new Cookies();

export const setCookie = (key: string, value: string) => {
  return cookies.set(key, value);
};

export const getCookie = (value: string) => {
  return cookies.get(value);
};

export const removeCookie = (value: string) => {
  return cookies.remove(value);
};
