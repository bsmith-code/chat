import { useState } from 'react'
import { useController, UseFormReturn } from 'react-hook-form'
import { shallowEqual } from 'react-redux'

import { selectUser, useGetUsersQuery } from 'store/server'

import {
  Autocomplete,
  Chip,
  FormHelperText,
  ListItemButton,
  TextField
} from '@mui/material'

import { useAppSelector } from 'hooks/useRedux'

import { getUserFullName } from 'utils'

import { IRoomForm, IUser } from 'types/room'

interface IProps {
  form: UseFormReturn<IRoomForm>
}
export const InputMembers = ({ form }: IProps) => {
  const {
    field,
    fieldState: { error }
  } = useController({ control: form.control, name: 'members' })

  const currentUser = useAppSelector(selectUser, shallowEqual)

  const { users } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data = [] }) => ({
      users: data?.filter(
        ({ id }) =>
          id !== currentUser.id && !field.value.find(user => id === user.id)
      )
    })
  })

  const [value, setValue] = useState<IUser[]>([])

  return (
    <>
      <Autocomplete
        multiple
        onChange={(_, updatedValue) => {
          setValue(updatedValue)
          field.onChange([...field.value, ...updatedValue])
        }}
        value={value}
        options={users}
        getOptionLabel={user => getUserFullName(user)}
        renderTags={(renderValue, getTagProps) =>
          renderValue.map((user, index) => (
            <Chip label={getUserFullName(user)} {...getTagProps({ index })} />
          ))
        }
        renderOption={(props, option) => (
          <ListItemButton
            {...props}
            component="li"
            key={`user-${option.id}`}
            data-testid={`user-${option.id}`}
          >
            {getUserFullName(option)}
          </ListItemButton>
        )}
        renderInput={params => <TextField {...params} label="Members" />}
      />
      {!!error && <FormHelperText error>{error?.message}</FormHelperText>}
    </>
  )
}
