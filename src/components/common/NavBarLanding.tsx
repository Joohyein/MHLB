import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavBarLanding = () => {

    const navigate = useNavigate();

    return (
        <StNavBar>
            <StLogo onClick = {() => {navigate('/')}}>
                Logo
            </StLogo>
            <StLinkDiv>
                <StLinkButton statusProp = {false} onClick = {() => {navigate('/login')}}>로그인</StLinkButton>
                <StLinkButton statusProp = {true} onClick = {() => {navigate('/register')}}>회원가입</StLinkButton>
            </StLinkDiv>
        </StNavBar>
    )
};

export default NavBarLanding;

const StNavBar = styled.div`
    width : 100%;
    height : 4rem;
    background-color : white;
    display : flex;
    justify-content : space-between;
    align-items : center;
    box-shadow : 0px 0px 1rem rgba(0, 0, 0, .15);
`

const StLogo = styled.div`
    margin-left : 2rem;
    font-size : 1.5rem;
    font-weight : 900;
    color : #ed702d;
`

const StLinkDiv = styled.div`
    margin-right : 2rem;
    display : flex;
    gap : 1rem;
`

const StLinkButton = styled.button`
    border : none;
    background-color : ${(props : {statusProp : boolean}) => props.statusProp ? '#ed702d' : 'transparent'};
    color : ${(props : {statusProp : boolean}) => props.statusProp ? 'white' : '#ed702d'};
    outline : ${(props : {statusProp : boolean}) => props.statusProp ? null : '1px solid #ed702d'};
    outline-offset : -1px;
    border-radius : 0.25rem;
    padding : 0.5rem 1rem;
    font-size : 1rem;
    font-weight : 700;
    line-height : 1.5rem;
    transition : 200ms;
    &:hover {
        background-color : ${(props : {statusProp : boolean}) => props.statusProp ? '#ff9f6b' : '#ffdecc'}
    }
    &:active {
        scale : 1.05;
    }
`