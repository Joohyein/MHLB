import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { navBarProfileImage } from "../../api/general";
import useLogout from "../../hooks/useLogout";
import useOutsideClick from "../../hooks/useOutsideClick"

const NavBarWorkspace = () => {

    const navigate = useNavigate();
    const logout = useLogout();

    const dropdownRef = useOutsideClick(() => {setOpenProfile(false)});

    const [userImg, setUserImg] = useState('');

    const [openProfile, setOpenProfile] = useState(false);

    useEffect(() => {
        navBarProfileImage()
        .then((res) => {
            setUserImg(res.data.userImage);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    const onClickProfileImage = () => {
        setOpenProfile(!openProfile);
    }

    const onClickMyPage = () => {
        navigate('/my-page');
    }

    const onClickLogout = () => {
        logout();
        navigate('/');
        window.location.reload();
    }

    return (
        <StNavBar>
            <StLogo onClick = {() => {navigate('/select-workspace')}}>
                Pin me
            </StLogo>
            <StRightsideDiv ref = {dropdownRef}>
                <StUserImage img = {userImg} onClick = {() => {onClickProfileImage()}} />
                {openProfile
                    ? <StProfileDropdownDiv>
                        <StProfileDropdownContent onClick = {() => {onClickMyPage()}}>마이페이지</StProfileDropdownContent>
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
    height : 4rem;
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
`

const StUserImage = styled.div`
    position : relative;
    margin-right : 2rem;
    width : 48px;
    height : 48px;
    border-radius : 64px;
    background-color : #c9c9c9;
    background-image : url('${(props : {img : string}) => props.img}');
    background-size : cover;
    background-position : center;
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
    }
`

const StHrTag = styled.hr`
    flex-grow : 1;
    width : 100%;
    height : 1px;
    background : #e1e1e1;
    border : none;
`