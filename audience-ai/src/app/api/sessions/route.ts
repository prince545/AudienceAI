import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { nanoid } from "nanoid"

export const runtime = 'nodejs';

// GET /api/sessions — list presenter's sessions
export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const sessions = await prisma.session.findMany({
    where: { userId: userId },
    include: { _count: { select: { questions: true } } },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(sessions)
}

// POST /api/sessions — create new session
export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { title } = await req.json()
  if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 })

  const code = String(nanoid(6).toUpperCase()) // e.g. "X7K2PQ"

  const newSession = await prisma.session.create({
    data: {
      title,
      code,
      userId: userId,
    },
  })

  return NextResponse.json(newSession, { status: 201 })
}
