import { createGlobalStyle } from 'styled-components'
import Pretendard from './PretendardVariable.woff2'

export default createGlobalStyle`
  @font-face {
    font-family: "Pretendard";
    src : url(${Pretendard}) format("woff2")
  }
`