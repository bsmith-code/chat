import { useController, UseFormReturn } from 'react-hook-form'
import { shallowEqual } from 'react-redux'

import { selectUser, useGetUsersQuery } from 'store/server'

import { Autocomplete, Chip, ListItemButton, TextField } from '@mui/material'

import { useAppSelector } from 'hooks/useRedux'

import { getUserFullName } from 'utils'

import { IRoomForm } from 'types/room'

interface IProps {
  form: UseFormReturn<IRoomForm>
}
export const InputMembers = ({ form }: IProps) => {
  const { field } = useController({ control: form.control, name: 'members' })

  const currentUser = useAppSelector(selectUser, shallowEqual)

  const { users } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data = [] }) => ({
      users: data?.filter(
        ({ id }) =>
          id !== currentUser.id && !field.value.find(user => id === user.id)
      )
    })
  })

  const preparedValue = field.value.filter(({ id }) => id !== currentUser.id)

  return (
    <Autocomplete
      multiple
      onChange={(_, value) => {
        field.onChange(value)
      }}
      value={preparedValue}
      options={users}
      getOptionLabel={user => getUserFullName(user)}
      renderTags={(value, getTagProps) =>
        value.map((user, index) => (
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
  )
}
