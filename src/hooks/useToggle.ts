import { useState } from "react";

const useToggle = () => {
  const [value, setValue] = useState(false);

  const handler = () => {
    setValue(!value);
  };
  return [value, handler];
};

export default useToggle;
