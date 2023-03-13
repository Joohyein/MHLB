import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");
  const handler = (e: any) => {
    setValue(e.target.value);
  };
  const clear = () => {
    setValue("");
  };
  return [value, handler, clear];
};

export default useInput;
