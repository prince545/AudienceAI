import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

export const runtime = 'nodejs';

// PATCH /api/sessions/[id] - Update session status
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { userId } = await auth()
  const body = await req.json()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Verify ownership
  const session = await prisma.session.findUnique({
    where: { id },
  })

  if (!session || session.userId !== userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const updated = await prisma.session.update({
    where: { id },
    data: {
      isActive: body.isActive !== undefined ? body.isActive : session.isActive,
      endedAt: body.endedAt ? new Date(body.endedAt) : session.endedAt,
    },
  })

  return NextResponse.json(updated)
}

// Re-export GET from the existing implementation if any, or combine
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params
    const { userId } = await auth()
  
    const session = await prisma.session.findUnique({
      where: { id },
      include: { 
        _count: { select: { questions: true } },
        polls: {
          include: { options: true }
        }
      }
    })
  
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }
  
    if (session.userId !== userId) {
        // Limited view for non-owners (wait, analytics should only be for owners)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  
    return NextResponse.json(session)
}
