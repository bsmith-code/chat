import { createGlobalStyle } from 'styled-components'
import normalize from './normalize'
import colors from './colors'
import forms from './forms'
import typography from './typography'
import loaders from './loaders'

const GlobalStyle = createGlobalStyle`
    ${normalize}
    ${colors}
    ${typography}
    ${forms}
    ${loaders}
`

export default GlobalStyle
