import { createGlobalStyle } from 'styled-components'
import forms from './forms'
import fonts from './fonts'
import colors from './colors'
import modals from './modals'
import loaders from './loaders'
import normalize from './normalize'
import typography from './typography'

const GlobalStyle = createGlobalStyle`
    ${fonts}
    ${normalize}
    ${colors}
    ${typography}
    ${forms}
    ${modals}
    ${loaders}
`

export default GlobalStyle
