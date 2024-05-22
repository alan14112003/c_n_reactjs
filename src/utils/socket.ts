import { io } from 'socket.io-client'

const URL = 'https://1a69-115-76-54-12.ngrok-free.app'

export const socket = io(URL, {
  transports: ['websocket', 'polling'],
})
