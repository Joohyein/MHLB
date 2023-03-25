import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { WorkspaceListIconType } from "./LeftSideBar";

const WorkspaceIcon = ({ workspaceInfo } : { workspaceInfo : WorkspaceListIconType }) => {

    return (
        <StIcon img = {workspaceInfo.workspaceImage}>
            
        </StIcon>
    );
};

export default WorkspaceIcon;

const StIcon = styled.div`
    width : 48px;
    height : 48px;
    border-radius : 64px;
    background-image : url('${(props : {img : string}) => props.img}');
    background-size : cover;
    background-position : center;
    cursor : pointer;
`