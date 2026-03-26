import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

async function main() {
  const connectionString = process.env.DATABASE_URL
  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } })
  const adapter = new PrismaPg(pool as any)
  const prisma = new PrismaClient({ adapter })

  const session = await prisma.session.findFirst({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, code: true }
  })

  console.log("--- LATEST SESSION ---")
  console.log("ID:", session?.id)
  console.log("Title:", session?.title)
  console.log("Code:", JSON.stringify(session?.code))
  console.log("Type:", typeof session?.code)
  
  if (typeof session?.code === "string") {
    console.log("Code Hex:", Buffer.from(session.code).toString('hex'))
  }

  await prisma.$disconnect()
  await pool.end()
}

main().catch(console.error)
