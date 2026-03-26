import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export const runtime = 'nodejs';

// POST /api/vote - Record a vote
export async function POST(req: Request) {
  const { optionId, pollId } = await req.json()

  if (!optionId || !pollId) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 })
  }

  const updatedOption = await prisma.option.update({
    where: { id: optionId },
    data: { votes: { increment: 1 } },
    include: { poll: true }
  })

  // Emit the update to all users in the session room
  const io = (global as any).io
  if (io) {
    io.to(updatedOption.poll.sessionId).emit("poll-vote", {
      pollId,
      optionId,
      newVotes: updatedOption.votes
    })
  }

  return NextResponse.json(updatedOption)
}
