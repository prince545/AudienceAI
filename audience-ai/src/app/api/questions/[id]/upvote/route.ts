import { prisma } from "@/lib/db"
import { incrementUpvote } from "@/lib/redis"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: questionId } = await params

  // Increment in Redis for speed
  const newCount = await incrementUpvote(questionId)

  // Sync to Postgres every 10 upvotes (batching to reduce DB writes)
  if (newCount % 10 === 0) {
    await prisma.question.update({
      where: { id: questionId },
      data: { upvotes: newCount },
    })
  }

  // Get sessionId to emit socket event
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    select: { sessionId: true },
  })

  const io = (global as any).io
  if (io && question) {
    io.to(question.sessionId).emit("upvote-update", {
      questionId,
      upvotes: newCount,
    })
  }

  return NextResponse.json({ upvotes: newCount })
}
