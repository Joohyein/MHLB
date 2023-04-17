import styled from "styled-components";

function Footer() {
  return (
    <StContainer>
      <StLogo>Pin me</StLogo>
      <StText>
        <h3>ⓒ Copyright 2023 GIGA-JET PINME DEVELOPER TEAM</h3>
        <h3>Jisang Hwang, Hyein Joo, Dabeen Jeon, Wooram Hong, Jeahyun Kwon</h3>
      </StText>
      <StContact>
        <h3>CONTACT US</h3>
        <h5>gigajet@gmail.com</h5>
      </StContact>
    </StContainer>
  )
}

export default Footer;

const StContainer = styled.div`
    background-color: #303030;
    width: 100%;
    height: 356px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StLogo = styled.div`
  font-size: 64px; 
  color: #ffffff;
  margin-bottom: 24px;
`;

const StText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  h3{
    font-size: 14px;
    color: #ffffff;
    font-weight: 400;
    line-height: 24px;
  }
`;
const StContact = styled.div`
  color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  h3{
    font-size: 14px;
    line-height: 24px;
  }
  h5 {
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
  }
`;
