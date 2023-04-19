import { motion } from "framer-motion";
import styled from "styled-components";

const IsLoading = () => {
    return <StLoadingDiv><StMotionLoading initial={{ scale : 0 }} animate={{ scale : 1 }} transition={{ duration : 0.5, repeat: Infinity }} /></StLoadingDiv>;
};

export default IsLoading;

const StLoadingDiv = styled.div`
    margin-top : 1rem;
    width : 100%;
    height : 256px;
    display : flex;
    justify-content : center;
    align-items: center;
`

const StMotionLoading = styled(motion.div)`
    width : 64px;
    height : 64px;
    border : 1px solid #757575;
    border-radius: 64px;
`