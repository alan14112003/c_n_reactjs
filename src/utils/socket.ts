import { io } from 'socket.io-client'

const URL = 'http://222.255.117.238:8082'

export const socket = io(URL, {
  transports: ['websocket', 'polling'],
})
