import { css } from 'styled-components'

const ballGridPulse = require('loaders.css/src/animations/ball-grid-pulse.scss')

export default css`
  ${ballGridPulse};
  .loader-inner {
    overflow: hidden;
    > div {
      background-color: var(--blue);
    }
  }
`
