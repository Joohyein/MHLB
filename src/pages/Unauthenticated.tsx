import { Outlet } from "react-router-dom"
import NavBarLanding from "../components/common/NavBarLanding";

const Unauthenticated = () => {
    return (
        <>
            <NavBarLanding/>
            <Outlet/>
        </>
    )
};

export default Unauthenticated;