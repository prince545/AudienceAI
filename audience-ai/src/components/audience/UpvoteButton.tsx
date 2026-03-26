"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThumbsUp } from "lucide-react"

export default function UpvoteButton({ questionId, initialUpvotes }: { questionId: string, initialUpvotes: number }) {
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [loading, setLoading] = useState(false)
  const [voted, setVoted] = useState(false)

  async function handleUpvote() {
    if (loading || voted) return
    setLoading(true)
    try {
      const resp = await fetch(`/api/questions/${questionId}/upvote`, { method: "POST" })
      const data = await resp.json()
      setUpvotes(data.upvotes)
      setVoted(true)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant={voted ? "default" : "outline"}
      size="sm"
      onClick={handleUpvote}
      disabled={loading}
      className={`flex items-center gap-2 rounded-xl px-2 ${
        voted
          ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
          : "bg-white/70 dark:bg-zinc-900/60 border-zinc-200/70 dark:border-zinc-800/70 hover:border-blue-500/60 hover:bg-blue-50/60 dark:hover:bg-blue-900/20"
      }`}
    >
      <ThumbsUp size={14} />
      <span>{upvotes}</span>
    </Button>
  )
}
