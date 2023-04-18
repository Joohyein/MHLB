import { logEvent } from "../../../src/util/amplitude";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavBarLanding = () => {

    const navigate = useNavigate();

    const onClickLogo = () => {
        if (window.location.pathname === '/') return;
        navigate('/')
    };

    return (
        <StNavBar>
            <StLogo onClick = {() => {onClickLogo()}}>
                Pin me
            </StLogo>
            <StLinkDiv>
                <StLinkButton statusProp = {false} onClick = {() => {navigate('/login'); logEvent('Login button click', {from: 'Landing page'})}}>로그인</StLinkButton>
                <StLinkButton statusProp = {true} onClick = {() => {navigate('/register'); logEvent('Register button click', {from: 'Landing page'})}}>회원가입</StLinkButton>
            </StLinkDiv>
        </StNavBar>
    )
};

export default NavBarLanding;

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

const StLinkDiv = styled.div`
    margin-right : 2rem;
    display : flex;
    gap : 1rem;
`

const StLinkButton = styled.button`
    border : none;
    background-color : ${(props : {statusProp : boolean}) => props.statusProp ? '#007AFF' : 'transparent'};
    color : ${(props : {statusProp : boolean}) => props.statusProp ? 'white' : '#007AFF'};
    outline : ${(props : {statusProp : boolean}) => props.statusProp ? null : '1px solid #007AFF'};
    outline-offset : -1px;
    border-radius : 0.25rem;
    padding : 0.5rem 1rem;
    font-size : 1rem;
    font-weight : 900;
    line-height : 1.5rem;
    transition : 200ms;
    &:hover {
        background-color : ${(props : {statusProp : boolean}) => props.statusProp ? '#4da2ff' : '#deeeff'}
    }
    &:active {
        scale : 1.05;
    }
`