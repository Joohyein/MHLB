import { useEffect, useState } from "react";
import styled from "styled-components";
import Close from "../asset/icons/Close";
import OpenMenu from "../asset/icons/OpenMenu";
import RightSideBox from "./RightSideBox";
import { useLocation } from "react-router-dom";

const RightSideBar = ({userListData, setMouseHoverSection, chatListProps, setChatListProps} : {userListData : any, setMouseHoverSection : any, chatListProps : any, setChatListProps : any}) => {

    const [menuOpen, setMenuOpen] = useState(false);

    const location = useLocation();

    const onMenuOpenToggleHandler = () => {
        setMenuOpen(!menuOpen);
    }

    useEffect(() => {
        if (location.state === null) return;
        setMenuOpen(true);
    }, [])

    return (
        <StRightSideContainer open = {menuOpen}>
            <StOpener onClick = {() => {onMenuOpenToggleHandler()}}>
                {menuOpen ? <Close size = {'36'} fill = {'#303030'} onClick = {() => {}} cursor = {'pointer'} /> : <OpenMenu size = {'36'} fill = {'#303030'}/>}
            </StOpener>
            {/* RightSideBox implement not yet */}
            <RightSideBox userListData = {userListData} setMouseHoverSection = {setMouseHoverSection} chatListProps = {chatListProps} setChatListProps = {setChatListProps}/>
        </StRightSideContainer>
    );
};

export default RightSideBar;

const StRightSideContainer = styled.div`
    width : 256px;
    height : 100%;
    background-color : white;
    box-shadow : 0px 0px 1rem rgba(0, 0, 0, 0.05);
    display : flex;
    flex-direction : column;
    justify-content : space-between;
    align-items : center;
    flex-shrink : 0;
    position : fixed;
    padding-top : 64px;
    top : 0;
    right : ${(props : {open : boolean}) => props.open ? '0' : '-256px'};
    box-sizing : border-box;
    transition : 400ms ease-in-out;
`

const StOpener = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    width : 48px;
    height : 48px;
    border-radius : 64px;
    background-color : white;
    box-shadow : 0px 0px 1rem rgba(0, 0, 0, 0.1);
    position : absolute;
    top : 80px;
    right : 272px;
    cursor : pointer;
`