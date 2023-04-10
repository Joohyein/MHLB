import { useState } from "react";

const useInput = (defaultValue : any = '') : any => {
  const [value, setValue] = useState(defaultValue);
  const handler = (e : any) => {
    setValue(e);
  };
  const clear = () => {
    setValue("");
  };
  return [value, handler, clear];
};

export default useInput;
