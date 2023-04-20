import { useState } from "react";
import styled from "styled-components";

const LeftSideIcon = ({onClick, img, ref, children, obj} : any) => {

    const [isMouseOver, setIsMouseOver] = useState(false);

    return (
        <StIcon onClick = {onClick} img = {img} ref={ref} onMouseOver = {() => {setIsMouseOver(true)}} onMouseOut = {() => {setIsMouseOver(false)}}>
            {children}
            {isMouseOver
            ?<StTooltip>
                <StTooltipMessage>{obj.workspaceTitle}</StTooltipMessage>
            </StTooltip>
            : null
            }
        </StIcon>
    )
}

export default LeftSideIcon;

const StIcon = styled.div`
    width : 48px;
    height : 48px;
    border-radius : 64px;
    background-image : url('${(props : {img : string}) => props.img}');
    background-size : cover;
    background-position : center;
    cursor : pointer;
    margin-top : 16px;
    flex-shrink : 0;
    position : relative;
`

const StTooltip = styled.div`
    background : rgba(0, 0, 0, 0.8);
    border-radius : 4px;
    position : absolute;
    padding : 8px;
    box-sizing: content-box;
    left : 56px;
`

const StTooltipMessage = styled.div`
    font-size : 0.75rem;
    font-weight : 700;
    line-height : 1rem;
    color : white;
`
