import { createServer } from "http"
import { parse } from "url"
import next from "next"
import { Server } from "socket.io"

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  })

  const io = new Server(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  })

  // Store io globally so API routes can emit events
  ;(global as any).io = io

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id)

    // Presenter and audience both join a room by sessionId
    socket.on("join-session", (sessionId: string) => {
      socket.join(sessionId)
      console.log(`Socket ${socket.id} joined session ${sessionId}`)
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id)
    })
  })

  const PORT = Number(process.env.PORT) || 3000
  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`> Ready on http://0.0.0.0:${PORT}`)
  })
}).catch((err) => {
    console.error("FATAL ERROR during server preparation:", err)
    process.exit(1)
})
