import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
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

    useEffect(()=>{
        if(Object.keys(stompClient).length) {
            stompClient.subscribe(`/sub/workspace-invite/${myUserId}`, (data : any) => {
                console.log(data.body);
                setInviteBadge((JSON.parse(data.body)).invitedWorkspace);
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
            <StLogo onClick = {() => {logEvent('Logo click', {from: 'Nav bar workspace'}); navigate('/select-workspace')}}>
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