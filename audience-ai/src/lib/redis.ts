import { Redis } from "@upstash/redis"

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Store upvote counts in Redis for fast reads
// Key pattern: upvotes:{questionId} -> number
export async function getUpvoteCount(questionId: string): Promise<number> {
  const count = await redis.get<number>(`upvotes:${questionId}`)
  return count ?? 0
}

export async function incrementUpvote(questionId: string): Promise<number> {
  return await redis.incr(`upvotes:${questionId}`)
}

// Store active session participant count
// Key pattern: session:participants:{sessionId} -> number
export async function incrementParticipants(sessionId: string) {
  await redis.incr(`session:participants:${sessionId}`)
  await redis.expire(`session:participants:${sessionId}`, 86400) // 24hr TTL
}

export async function getParticipantCount(sessionId: string): Promise<number> {
  const count = await redis.get<number>(`session:participants:${sessionId}`)
  return count ?? 0
}
