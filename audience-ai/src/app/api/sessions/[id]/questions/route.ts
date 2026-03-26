import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: sessionId } = await params

  const questions = await prisma.question.findMany({
    where: { sessionId, isHidden: false },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(questions)
}
