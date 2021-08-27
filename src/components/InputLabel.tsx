interface IProps {
  label: string
}

const InputLabel = ({ label }: IProps): JSX.Element => {
  return <label>{label}</label>
}

export default InputLabel
