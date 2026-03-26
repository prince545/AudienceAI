import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

export const runtime = 'nodejs';

// POST /api/polls - Create a new poll
export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { sessionId, question, options } = await req.json()

  if (!sessionId || !question || !options || options.length < 2) {
    return NextResponse.json({ error: "Invalid poll data" }, { status: 400 })
  }

  // Deactivate other polls in this session (optional: only one active poll at a time)
  await prisma.poll.updateMany({
    where: { sessionId, isActive: true },
    data: { isActive: false }
  })

  const poll = await prisma.poll.create({
    data: {
      question,
      sessionId,
      options: {
        create: options.map((opt: string) => ({ text: opt }))
      }
    },
    include: { options: true }
  })

  // Emit to session room via Socket.io
  const io = (global as any).io
  if (io) {
    io.to(sessionId).emit("new-poll", poll)
  }

  return NextResponse.json(poll)
}

// GET /api/sessions/[id]/polls is handled in a separate route or here
