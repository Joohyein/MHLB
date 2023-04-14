import { Stomp } from "@stomp/stompjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import SockJS from "sockjs-client";
import { setStompClient } from "../redux/modules/websocket";
import { getCookie } from "../cookie/cookies";
import NavBarWorkspace from "../components/common/NavBarWorkspace";

const WebSocketConnection = () => {
    const dispatch = useDispatch();

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