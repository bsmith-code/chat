import { MouseEvent, useState } from 'react'

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const isOpen = Boolean(anchorEl)

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return { anchorEl, isOpen, handleOpenMenu, handleCloseMenu }
}
