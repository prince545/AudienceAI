"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PollVotePanel({ poll }: { poll: any }) {
  const [voted, setVoted] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!poll) return null

  async function handleVote(optionId: string) {
    if (voted || loading) return
    setLoading(true)
    await fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ optionId, pollId: poll.id }),
    })
    setVoted(true)
    setLoading(false)
  }

  return (
    <Card className="p-6 bg-white dark:bg-zinc-900 border-none shadow-xl border-t-4 border-t-purple-600 mb-8">
      <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-4">Live Poll</h2>
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 leading-tight">{poll.question}</h3>

      <div className="space-y-3">
        {poll.options.map((opt: any) => (
          <Button
            key={opt.id}
            onClick={() => handleVote(opt.id)}
            disabled={voted || loading}
            variant="outline"
            className={`w-full h-14 justify-start px-6 rounded-2xl text-left font-bold transition-all ${
              voted ? "opacity-50 cursor-default" : "hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            }`}
          >
            {opt.text}
          </Button>
        ))}
      </div>

      {voted && (
        <div className="mt-6 flex items-center justify-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-2xl">
          <Check className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Vote Recorded!</span>
        </div>
      )}
    </Card>
  )
}
