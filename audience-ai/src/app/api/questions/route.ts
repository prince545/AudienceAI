import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

// POST /api/questions — audience submits a question
export async function POST(req: Request) {
  const { text, sessionId } = await req.json()

  if (!text || !sessionId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  if (text.length > 300) {
    return NextResponse.json({ error: "Question too long" }, { status: 400 })
  }

  // Verify session exists and is active
  const session = await prisma.session.findUnique({
    where: { id: sessionId, isActive: true },
  })

  if (!session) {
    return NextResponse.json({ error: "Session not found or closed" }, { status: 404 })
  }

  const question = await prisma.question.create({
    data: { text, sessionId },
  })

  // Emit to all sockets in this session room
  const io = (global as any).io
  if (io) {
    io.to(sessionId).emit("new-question", question)
  }

  return NextResponse.json(question, { status: 201 })
}
