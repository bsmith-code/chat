import io from 'socket.io-client'

// Example conf. You can move this to your config file.
const host = 'api.brianmatthewsmith.test'
const socketPath = ''
let socket

const socketAPI = () => {
  const connect = async () => {
    try {
      socket = await io.connect(host, { path: socketPath })

      return socket
    } catch (error) {
      throw error
    }
  }

  const disconnect = async () => {
    try {
      await socket.disconnect()
      socket = null

      return socket
    } catch (error) {
      throw error
    }
  }

  const emit = async (event, data) => {
    try {
      if (!socket) throw new Error('No socket connection.')

      await socket.emit(event, data)
    } catch (error) {
      throw error
    }
  }

  const on = (event, callback) => {
    try {
      if (!socket) throw new Error('No socket connection.')

      socket.on(event, callback)
    } catch (error) {
      throw error
    }
  }

  return {
    on,
    emit,
    connect,
    disconnect
  }
}

export default socketAPI
