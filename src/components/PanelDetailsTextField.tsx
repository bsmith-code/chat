import { Dispatch, SetStateAction, useState } from 'react'
import { useController, UseFormReturn } from 'react-hook-form'
import isPropValid from '@emotion/is-prop-valid'

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  outlinedInputClasses,
  styled,
  TextField,
  Typography
} from '@mui/material'

import { IRoomForm } from 'types/room'

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
          },
          ':hover': {
            [`.${outlinedInputClasses.notchedOutline}`]: {
              borderColor: theme.palette.action.focus
            }
          }
        }
      : {
          borderColor: theme.palette.primary.main
        })
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
  focusedField: string
  onFocusedField: (fieldName: 'name' | 'description') => void
  form: UseFormReturn<IRoomForm>
}
export const PanelDetailsTextField = ({
  name,
  form,
  label,
  focusedField,
  onFocusedField
}: IProps) => {
  const { field, fieldState } = useController({ control: form.control, name })
  const isFocused = focusedField === name

  console.log(isFocused)
  return (
    <Box mb={4}>
      <Typography fontSize={14} variant="subtitle2">
        {label}
      </Typography>
      <Box display="flex" justifyContent="space-between" position="relative">
        <StyledTextField
          {...field}
          isFocused={isFocused}
          autoComplete="off"
          value={field.value || `(None)`}
          onFocus={() => onFocusedField(name)}
        />
        {isFocused && (
          <StyledButtonGroup variant="contained" color="info">
            <Button color="primary">
              <ClearOutlinedIcon sx={{ fill: '#fff' }} />
            </Button>
            <Button color="primary">
              <CheckOutlinedIcon sx={{ fill: '#fff' }} />
            </Button>
          </StyledButtonGroup>
        )}
      </Box>
    </Box>
  )
}
