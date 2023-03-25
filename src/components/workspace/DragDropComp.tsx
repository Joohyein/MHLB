import styled from "styled-components";

const DragDropComp = () => {
    return (
        <StSectionDiv>
            <StSectionSize1Box>
                <StSectionSize1>
                    <StSectionTitle>근무 ✏️</StSectionTitle>
                    <StSectionDesc>현재 근무 중인 멤버</StSectionDesc>
                    <StSectionHr />
                </StSectionSize1>
                <StSectionSize1>
                    <StSectionTitle>회의 🚦</StSectionTitle>
                    <StSectionDesc>현재 회의 중인 멤버</StSectionDesc>
                    <StSectionHr />
                </StSectionSize1>
                <StSectionSize1>
                    <StSectionTitle>식사 🍽️</StSectionTitle>
                    <StSectionDesc>현재 식사 중인 멤버</StSectionDesc>
                    <StSectionHr />
                </StSectionSize1>
                <StSectionSize1>
                    <StSectionTitle>자리비움 🛝</StSectionTitle>
                    <StSectionDesc>현재 자리비움 중인 멤버</StSectionDesc>
                    <StSectionHr />
                </StSectionSize1>
                <StSectionSize1>
                    <StSectionTitle>출장 🚗</StSectionTitle>
                    <StSectionDesc>현재 출장 중인 멤버</StSectionDesc>
                    <StSectionHr />
                </StSectionSize1>
                <StSectionSize1>
                    <StSectionTitle>휴가 🏝️</StSectionTitle>
                    <StSectionDesc>현재 휴가 중인 멤버</StSectionDesc>
                    <StSectionHr />
                </StSectionSize1>
            </StSectionSize1Box>
                <StSectionSize2>
                    <StSectionTitle>업무 종료 🚀</StSectionTitle>
                    <StSectionDesc>업무를 종료한 멤버</StSectionDesc>
                    <StSectionHr />
                </StSectionSize2>
        </StSectionDiv>
    )
}

export default DragDropComp;

const StSectionDiv = styled.div`
    display : flex;
    justify-content : space-between;
    width : 100%;
    gap : 16px;
`

const StSectionSize1Box = styled.div`
    display : flex;
    flex-direction : flex-start;
    flex-wrap : wrap;
    gap : 16px;
`

const StSectionSize1 = styled.div`
    width : 248px;
    height : 259px;
    box-shadow : 0px 0px 1rem rgba(0, 0, 0, 0.05);
    border-radius : 8px;
    background-color : white;
    flex-shrink : 0;
    padding : 16px;
    box-sizing : border-box;
    display : flex;
    flex-direction : column;
`

const StSectionSize2 = styled.div`
    width : 248px;
    height : 534px;
    box-shadow : 0px 0px 1rem rgba(0, 0, 0, 0.05);
    border-radius : 8px;
    background-color : white;
    flex-shrink : 0;
    padding : 16px;
    box-sizing : border-box;
    display : flex;
    flex-direction : column;
`

const StSectionTitle = styled.div`
    font-size : 1.5rem;
    font-weight : 900;
    margin-bottom : 4px;
`

const StSectionDesc = styled.div`
    font-size : 0.75rem;
    font-weight : 300;
    margin-bottom : 16px;
`

const StSectionHr = styled.hr`
    background : #e1e1e1;
    border : none;
    height : 1px;
    width : 100%;
`