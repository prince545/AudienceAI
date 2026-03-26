import { clusterQuestions } from "@/lib/groq"
import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { sessionId } = await req.json()

    const questions = await prisma.question.findMany({
      where: { sessionId, isHidden: false },
      orderBy: { upvotes: "desc" },
      take: 30, // only cluster top 30 questions to keep cost low
    })

    if (questions.length < 2) {
      return NextResponse.json({ error: "Not enough questions to cluster" }, { status: 400 })
    }

    const result = await clusterQuestions(questions.map((q: any) => q.text))
    return NextResponse.json(result)
  } catch (err: any) {
    console.error("AI Cluster Error:", err)
    return NextResponse.json({ error: "Failed to cluster questions", details: err.message }, { status: 500 })
  }
}
