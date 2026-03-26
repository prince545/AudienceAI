import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params
  
  // Clean up the code (remove whitespace, enforce uppercase format)
  const cleanCode = code.trim().toUpperCase()

  const session = await prisma.session.findUnique({
    where: { code: cleanCode, isActive: true },
    include: {
      questions: {
        where: { isHidden: false },
        orderBy: { createdAt: "desc" },
      },
    },
  })

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 })
  }

  return NextResponse.json(session)
}
