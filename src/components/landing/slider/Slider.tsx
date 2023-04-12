import styled from "styled-components";
import ChatSlide from "./ChatSlide";
import ConfigSlide from "./ConfigSlide";
import DragAndDropSlide from "./DragAndDropSlide";
import CreateWorkspaceSlide from "./CreateWorkspaceSlide";
import { useEffect, useRef, useState } from "react";
import ArrowBack from "../../asset/icons/ArrowBack";
import ArrowNext from "../../asset/icons/ArrowNext";

function Slider() {
  const slideRef = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const onClickNextBtn = () => {
    if(currentSlide >= 3) setCurrentSlide(0);
    else setCurrentSlide(currentSlide + 1);
  };

  const onClickPrevBtn = () => {
    if(currentSlide === 0) setCurrentSlide(3);
    else setCurrentSlide(currentSlide - 1);
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 300ms ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <StMain>
      <StContainer>
        <ArrowBack size='32px' fill='#303030' onClick={onClickPrevBtn} cursor="pointer" />
        <StSliderContainer>
          <StSliderBox ref={slideRef}>
            <DragAndDropSlide />
            <CreateWorkspaceSlide />
            <ConfigSlide />
            <ChatSlide />
          </StSliderBox>
        </StSliderContainer>
        <ArrowNext size='32px' fill='#303030' onClick={onClickNextBtn} cursor="pointer" />
      </StContainer>
      <StPageDotBox>
        <StPageDotFirst bgColor={currentSlide} />
        <StPageDotSecond bgColor={currentSlide} />
        <StPageDotThird bgColor={currentSlide} />
        <StPageDotFourth bgColor={currentSlide} />
      </StPageDotBox>
    </StMain>
    
  )
}

export default Slider;

const StMain = styled.div`
  width: 1040px;
  height: 586px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-bottom: 64px;
`;
const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StSliderContainer = styled.div`
  width: 100%;
  margin: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: 200ms;
  /* @media screen and (max-width : 1040px) and (min-width : 688px) {
    width : 688px;
  }
  @media screen and (max-width : 688px) {
    width : 336px;
  } */
`;

const StSliderBox = styled.div`
  width: 100%;
  display: flex;
`;

const StPageDotBox = styled.div`
  display: flex;
  gap: 8px;
`;
const StPageDotFirst = styled.div<{bgColor:number}>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.bgColor === 0 ? '#303030' : '#dadada'};
`;
const StPageDotSecond = styled.div<{bgColor:number}>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.bgColor === 1 ? '#303030' : '#dadada'};
`;
const StPageDotThird = styled.div<{bgColor:number}>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.bgColor === 2 ? '#303030' : '#dadada'};
`;
const StPageDotFourth = styled.div<{bgColor:number}>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.bgColor === 3 ? '#303030' : '#dadada'};
`;