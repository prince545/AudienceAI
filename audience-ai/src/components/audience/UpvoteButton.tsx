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
      className={`flex items-center gap-2 ${voted ? "bg-purple-600 border-purple-600" : ""}`}
    >
      <ThumbsUp size={14} />
      <span>{upvotes}</span>
    </Button>
  )
}
