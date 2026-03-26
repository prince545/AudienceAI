import { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"

export function useSocket(sessionId: string) {
  const socketRef = useRef<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || ""
    const socket = io(socketUrl, {
      transports: ["websocket"],
    })

    socket.on("connect", () => {
      setIsConnected(true)
      if (sessionId) {
        socket.emit("join-session", sessionId)
      }
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
    })

    socketRef.current = socket

    return () => {
      socket.disconnect()
    }
  }, [sessionId])

  return { socket: socketRef.current, isConnected }
}
