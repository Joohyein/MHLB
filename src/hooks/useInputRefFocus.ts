import { useEffect, useRef, useState } from "react";

const useInputRefFocus = () : [React.RefObject<any>, boolean] => {
    const [inputRefFocus, setInputRefFocus] = useState<boolean>(false);
    const inputRef = useRef<any>(null);

    useEffect(() => {
        function inputFocusIn () {
            setInputRefFocus(true);
        }

        function inputFocusOut () {
            setInputRefFocus(false);
        }

        inputRef.current?.addEventListener('focus', inputFocusIn);
        inputRef.current?.addEventListener('blur', inputFocusOut);
        return () => {
            inputRef.current?.removeEventListener('focus', inputFocusIn);
            inputRef.current?.removeEventListener('blur', inputFocusOut);
        };
    }, []);

    return [inputRef, inputRefFocus];
}

export default useInputRefFocus;