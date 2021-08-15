import { css } from 'styled-components'

export default css`
  .modal {
    $this: &;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(21, 21, 21, 0.8);
    z-index: 9999;
    &__container {
      width: 100%;
      max-width: 1020px;
      background: var(--light-gray);
      border: 1px solid #707070;
      padding: 32px 37px;
      position: relative;
    }
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 32px 0;
    }
    &__title {
      color: var(--dark-gray);
      font-size: rem(26px);
      font-family: var(--font-medium);
      margin: 0;
      line-height: 1;
    }
    &__close {
      display: flex;
      align-items: center;
      svg {
        margin: 0 0 0 10px;
      }
    }
    &__main {
      background: var(--white);
      border-radius: 8px;
      padding: 56px 74px;
      box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
      min-height: 300px;
      max-height: calc(100vh - 200px);
      position: relative;
    }
  }
`
