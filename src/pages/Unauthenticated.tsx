import { Outlet, useNavigate } from "react-router-dom"
import NavBarLanding from "../components/common/NavBarLanding";
import useIsLogin from "../hooks/useIsLogin";
import { useEffect } from "react";

const Unauthenticated = () => {

    const isLogin = useIsLogin();
    const navigate = useNavigate();

    useEffect(() => {
        if(isLogin === true) return navigate('/select-workspace');
    }, [isLogin])

    return (
        <>
            <NavBarLanding/>
            <Outlet/>
        </>
    )
};

export default Unauthenticated;