import { createGlobalStyle } from 'styled-components'
import normalize from './normalize'
import colors from './colors'
import forms from './forms'
import modals from './modals'
import typography from './typography'
import loaders from './loaders'

const GlobalStyle = createGlobalStyle`
    ${normalize}
    ${colors}
    ${typography}
    ${forms}
    ${modals}
    ${loaders}
`

export default GlobalStyle
