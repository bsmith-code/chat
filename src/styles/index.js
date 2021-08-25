import { createGlobalStyle } from 'styled-components'
import { darken } from 'polished'
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
    button {
      background: #e5e5e5;
      line-height: 1;
      &:hover {
        background: ${darken(0.1, '#e5e5e5')}
      }
    }
`

export default GlobalStyle
