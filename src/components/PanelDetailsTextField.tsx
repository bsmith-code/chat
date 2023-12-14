import { useController } from 'react-hook-form'
import isPropValid from '@emotion/is-prop-valid'

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import {
  Box,
  Button,
  ButtonGroup,
  outlinedInputClasses,
  styled,
  TextField,
  Typography
} from '@mui/material'

import { usePanelDetailsContext } from 'context/PanelDetailsContext'

const StyledTextField = styled(TextField, { shouldForwardProp: isPropValid })<{
  isFocused: boolean
}>(({ theme, isFocused }) => ({
  width: '100%',
  position: 'relative',
  marginLeft: `-${theme.spacing(1)}`,
  input: {
    padding: theme.spacing(1)
  },
  [`.${outlinedInputClasses.root}`]: {
    ...(!isFocused
      ? {
          [`.${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'transparent'
          }
        }
      : {
          borderColor: theme.palette.primary.main
        }),

    ':hover': {
      [`.${outlinedInputClasses.notchedOutline}`]: {
        borderColor: theme.palette.action.focus
      }
    }
  }
}))

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  right: 0,
  marginRight: theme.spacing(1)
}))

interface IProps {
  name: 'name' | 'description'
  label: string
}
export const PanelDetailsTextField = ({ name, label }: IProps) => {
  const { form, focusedField, handleSubmit, setFocusedField } =
    usePanelDetailsContext()
  const { field } = useController({ control: form.control, name })

  const isFocused = focusedField === name
  const value = isFocused ? field.value : field.value || '(None)'

  return (
    <Box mb={4}>
      <Typography fontSize={14} variant="subtitle2">
        {label}
      </Typography>
      <Box display="flex" justifyContent="space-between" position="relative">
        <StyledTextField
          {...field}
          value={value}
          autoComplete="off"
          isFocused={isFocused}
          onFocus={() => setFocusedField(name)}
        />
        {isFocused && (
          <StyledButtonGroup variant="contained" color="info">
            <Button color="primary" onClick={() => setFocusedField('')}>
              <ClearOutlinedIcon sx={{ fill: '#fff' }} />
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              <CheckOutlinedIcon sx={{ fill: '#fff' }} />
            </Button>
          </StyledButtonGroup>
        )}
      </Box>
    </Box>
  )
}
