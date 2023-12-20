import { useEffect, useRef, useState } from 'react'
import { shallowEqual } from 'react-redux'

import { selectCommands } from 'store/client'

import { Box } from '@mui/material'

import { useAppSelector } from 'hooks/useRedux'

import { commandMap } from 'utils'

export const PanelMessagesCommands = () => {
  const commands = useAppSelector(selectCommands, shallowEqual)
  const commandRef = useRef<HTMLDivElement | null>(null)

  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setBackgroundPosition({
        x: backgroundPosition.x + 10,
        y: backgroundPosition.y + 10
      })
    }, 50)

    if (commandRef.current) {
      commandRef.current.style.backgroundPosition = `${backgroundPosition.x}px ${backgroundPosition.y}px`
    }

    if (!commands.length) {
      clearInterval(animationInterval)
    }

    return () => clearInterval(animationInterval)
  }, [commands, backgroundPosition])

  useEffect(() => {
    if (!commandRef.current) return

    const updatedCommand = commands.at(-1) ?? ''

    if (updatedCommand) {
      commandRef.current.style.backgroundImage = `url("assets/${commandMap[updatedCommand]}")`
    } else {
      commandRef.current.style.backgroundImage = 'none'
    }
  }, [commands])

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom="120px"
      ref={commandRef}
      sx={{ pointerEvents: 'none', transition: 'all 0.2s ease' }}
    />
  )
}
