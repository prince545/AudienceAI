import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const connectionString = process.env.DATABASE_URL
console.log("Database connection attempt to:", connectionString?.split("@")[1] || "MISSING")

const pool = new Pool({ 
  connectionString,
  ssl: {
    rejectUnauthorized: false 
  }
})

const adapter = new PrismaPg(pool as any)

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter, log: ["query"] })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
