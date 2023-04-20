import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { navBarProfileImage } from "../../api/general";
import useLogout from "../../hooks/useLogout";
import useOutsideClick from "../../hooks/useOutsideClick"
import { getCookie, removeCookie, setCookie } from "../../cookie/cookies";
import { useSelector } from "react-redux";
import { logEvent, resetAmplitude } from "../../util/amplitude";

const NavBarWorkspace = () => {

    const navigate = useNavigate();
    const logout = useLogout();

    const dropdownRef = useOutsideClick(() => {setOpenProfile(false)});

    const [userImg, setUserImg] = useState('');

    const [openProfile, setOpenProfile] = useState(false);

    const stompClient = useSelector((state : any) => state.websocket.stompClient);
    const myUserId = getCookie('userId');
    const [inviteBadge, setInviteBadge] = useState(false);
    const [toast, setToast] = useState(false);
    const [toastAnimation, setToastAnimation] = useState('none');

    useEffect(() => {
        if(toastAnimation === 'none') return;
        if(!toast) {
            setToastAnimation('close');
            return;
        };
        setTimeout(() => {
            setToastAnimation('open');
            setTimeout(() => {
                setToast(false);
            },3000);
        }, 0);
        return () => {}
    }, [toast]);

    useEffect(()=>{
        if(Object.keys(stompClient).length) {
            stompClient.subscribe(`/sub/workspace-invite/${myUserId}`, (data : any) => {
                setInviteBadge((JSON.parse(data.body)).invitedWorkspace);
                setToast((JSON.parse(data.body)).invitedWorkspace);
                setToastAnimation('');
            });
        }
        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.unsubscribe(`/sub/workspace-invite/${myUserId}`);
            }
        }
    }, [stompClient]);

    useEffect(() => {
        navBarProfileImage()
        .then((res) => {
            setCookie('userId', res.data.userId);
            setUserImg(res.data.userImage);
            setInviteBadge(res.data.invitedWorkspace);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    const onClickLogo = () => {
        if (window.location.pathname === '/select-workspace') return;
        logEvent('Logo click', {from: 'Nav bar workspace'});
        navigate('/select-workspace');
    };

    const onClickProfileImage = () => {
        setOpenProfile(!openProfile);
    }

    const onClickMyPage = () => {
        logEvent('Mypage button from header', {from: 'Header profile'});
        if (window.location.pathname === '/my-page') return;
        navigate('/my-page');
    }

    const onClickLogout = () => {
        logout();
        removeCookie('userId');
        logEvent('Logout button from header', {from: 'Header profile'});
        resetAmplitude();
        navigate('/');
        window.location.reload();
    }

    return (
        <StNavBar>
            <StLogo onClick = {() => {onClickLogo()}}>
                Pin me
            </StLogo>
            <StRightsideDiv ref = {dropdownRef}>
                <StUserImage img = {userImg} onClick = {() => {onClickProfileImage()}} />
                { inviteBadge && <StInviteBadgeProfile />}
                {openProfile
                    ? <StProfileDropdownDiv>
                        <StProfileDropdownContent onClick = {() => {onClickMyPage()}}>마이페이지
                        { inviteBadge && <StInviteBadge />}
                        </StProfileDropdownContent>
                        <StHrTag />
                        <StProfileDropdownContent onClick = {() => {onClickLogout()}}>로그아웃</StProfileDropdownContent>
                    </StProfileDropdownDiv>
                    : null}
            </StRightsideDiv>
            <StToast toast={toastAnimation} onClick={() => {navigate('/my-page'); setToast(false)}}>
                <StToastBadge></StToastBadge>
                <h3>새로운 초대가 도착했습니다.</h3>
            </StToast>
        </StNavBar>
    )
};

export default NavBarWorkspace;

const StNavBar = styled.div`
    width : 100%;
    height : 64px;
    background-color : white;
    display : flex;
    justify-content : space-between;
    align-items : center;
    box-shadow : 0px 0px 1rem rgba(0, 0, 0, 0.05);
    position : fixed;
    z-index : 5;
`

const StLogo = styled.div`
    margin-left : 2rem;
    font-size : 2rem;
    font-weight : 900;
    color : #007AFF;
    &:hover {
        cursor : pointer;
    }
`

const StUserImage = styled.div`
    position : relative;
    margin-right : 2rem;
    width : 48px;
    height : 48px;
    border-radius : 64px;
    background-color : white;
    background-image : url('${(props : {img : string}) => props.img}');
    background-size : cover;
    background-position : center;
    box-shadow : 0px 0px 1rem rgba(0, 0, 0, 0.1);
    &:hover {
        cursor : pointer;
    }
`

const StRightsideDiv = styled.div`

`

const StProfileDropdownDiv = styled.div`
    position : absolute;
    background-color : white;
    border-radius : 4px;
    width : auto;
    height : auto;
    top : 64px;
    right : 32px;
    box-shadow : 0px 0px 1rem rgba(0, 0, 0, 0.05);
    padding : 16px;
    display : flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap : 16px;
`

const StProfileDropdownContent = styled.div`
    font-size : 1rem;
    font-weight : 400;
    color : #303030;
    transition : 200ms;
    &:hover {
        color : #007AFF;
        cursor : pointer;
    };
    display: flex;
    align-items: center;
    gap: 4px;
`

const StHrTag = styled.hr`
    flex-grow : 1;
    width : 100%;
    height : 1px;
    background : #e1e1e1;
    border : none;
`

const StInviteBadgeProfile = styled.div`
    width: 9px;
  height: 9px;
  background-color: #ff5f5f ;
  border-radius: 50%;
  border: 2px solid #ffffff;
  position: absolute;
  bottom: 10px;
  right: 32px;
`;
const StInviteBadge = styled.div`
  width: 8px;
  height: 8px;
  background-color: #ff5f5f ;
  border-radius: 50%;
`;



const slideIn = keyframes`
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateY(0%);
    }
`;
const slideOut = keyframes`
    from {
        transform: translateX(0%);
    }
    to {
        transform: translateX(300%);
    }
`;

const StToast = styled.div<{toast:string}>`
    display: ${props => props.toast === 'none' ? 'none' : 'flex'};
    justify-content: center;
    align-items: center;
    gap: 8px;
    position: fixed;
    top:72px;
    right:12px;
    width: 256px;
    height: 76px;
    h3 {
        font-size: 16px;
        font-weight: 400;
    }
    background-color: #ffffff;
    border: 1px solid #007aff;
    border-radius: 8px;
    box-shadow : 0px 0px 1rem rgba(0, 0, 0, 0.05);
    cursor: pointer;
    animation: ${props => props.toast === 'open' ? slideIn : slideOut} 0.5s ease-in-out 0s 1 normal forwards;
`;
const StToastBadge = styled.div`
  width: 10px;
  height: 10px;
  background-color: #007aff;
  border-radius: 50%;
`;