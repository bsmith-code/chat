import { css } from 'styled-components'

export default css`
  input,
  textarea,
  select[multiple='multiple'] {
    border-radius: 0;
    box-shadow: none;
    box-sizing: border-box;
    margin: 0;
    border: none;
    width: 100%;
    padding: 8px 0;
    border-bottom: 1px solid #d7d7d7;
    transition: all 0.3s ease;
    &:focus {
      box-shadow: none;
      outline: none;
      border-color: var(--blue);
    }
    &:disabled {
      cursor: not-allowed;
      &:hover {
        border: none;
      }
    }
  }

  textarea {
    min-height: 150px;
  }

  fieldset {
    border: none;
    margin: 0 0 25px 0;
    padding: 0;
  }

  input,
  label,
  select {
    display: block;
  }

  label {
    margin: 0;
    font-size: rem(14px);
    abbr {
      display: none;
    }
  }

  // Inputs
  input:-internal-autofill-previewed,
  input:-internal-autofill-selected,
  textarea:-internal-autofill-previewed,
  textarea:-internal-autofill-selected,
  select:-internal-autofill-previewed,
  select:-internal-autofill-selected,
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    background: #fff;
  }

  input[type='text'] {
    -webkit-appearance: none;
  }

  input[type='email'] {
    -webkit-appearance: none;
  }

  input[type='password'] {
    -webkit-appearance: none;
  }

  input[type='tel'] {
    -webkit-appearance: none;
  }

  input[type='file'] {
    -webkit-appearance: none;
  }

  input[type='search'] {
    -webkit-appearance: none;
  }

  textarea {
    resize: vertical;
  }

  select {
    margin-bottom: 0;
    max-width: 100%;
    width: auto;
  }

  form {
    input[type='radio'] {
      display: inline;
      margin-right: 0;
      + label {
        display: inline-block;
      }
    }
  }

  button {
    -webkit-appearance: none;
    border: none;
    cursor: pointer;
    &:focus,
    &:active {
      outline: 0;
    }
  }
`
