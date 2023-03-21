import styled from "styled-components";

interface workspaceListType {
    workspaceDesc: string,
    workspaceId: number,
    workspaceImage: string,
    workspaceTitle: string
};

function MyWorkspaceList({workspaceList}: {workspaceList: workspaceListType[]}) {
  console.log("workspaceList : ", workspaceList)
  return (
    <StContainer>
      {
        workspaceList.map((item: workspaceListType) => {
          return <StWorkspaceBox>
            <StTitleBox>
              <StImage src={item.workspaceImage}/>
              <StTitle>{item.workspaceTitle}</StTitle>
            </StTitleBox>
            <StDesc>{item.workspaceDesc}</StDesc>
          </StWorkspaceBox>
        })
      }
    </StContainer>
  )
};

export default MyWorkspaceList;

const StContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 24px;
    margin: 32px;

`;
const StWorkspaceBox = styled.div`
    width: 24%;
    background-color: lightgray;
    padding: 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;
const StTitleBox = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;
const StImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
`;
const StTitle = styled.h3`
    
`;
const StDesc = styled.h3`
  font-size: 16px;
  font-weight: 400;
`;