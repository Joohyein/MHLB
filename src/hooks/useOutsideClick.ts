import { useEffect, useRef } from "react";

const useOutsideClick = (handler: any) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
        document.body.style.overflow = "unset";

      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);

  return ref;
};

export default useOutsideClick;
