import { useEffect } from "react";
import { getGoogleCode } from "../api/auth";

const GoogleAuth = () => {
    useEffect(() => {
        handleGoogleCallback();
    }, [])
    const handleGoogleCallback = async () => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        if(code === null) return;
        getGoogleCode(code)
        .then((res) => {
        if(res.status === 200) {
            window.opener.postMessage({authorization : res.headers.authorization}, '*');
            window.close();
        }
        })
        .catch((error) => console.log(error));
    };
    return <div>Loading google social auth...</div>
}

export default GoogleAuth;