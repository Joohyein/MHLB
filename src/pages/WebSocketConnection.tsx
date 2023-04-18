import { Stomp } from "@stomp/stompjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { setStompClient } from "../redux/modules/websocket";
import { getCookie } from "../cookie/cookies";
import NavBarWorkspace from "../components/common/NavBarWorkspace";
import useIsLogin from "../hooks/useIsLogin";

const WebSocketConnection = () => {
    
    const dispatch = useDispatch();

    const isLogin = useIsLogin();
    const navigate = useNavigate();

    useEffect(() => {
        if(isLogin === false) return navigate('/');
    }, [isLogin])

    useEffect(() => {
        const socket = new SockJS(`${process.env.REACT_APP_BE_SERVER}/stomp/ws`);
        const stompClient = Stomp.over(socket);

        stompClient.connect({Authorization: getCookie('authorization')}, () => {dispatch(setStompClient(stompClient))});

        return () => {
            if (stompClient.connected) {
                stompClient.disconnect()
            }
        };
    }, [dispatch])

    return (
        <>
            <NavBarWorkspace />
            <Outlet />
        </>
    )
}

export default WebSocketConnection;