"use client"

import UpvoteButton from "./UpvoteButton"
import { Card } from "@/components/ui/card"

export default function QuestionList({ questions }: { questions: any[] }) {
  const sorted = [...questions].sort((a, b) => b.upvotes - a.upvotes)

  return (
    <div className="space-y-3 mt-6">
      <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400">
        Recent Questions
      </h2>
      {sorted.length === 0 ? (
        <div className="text-center text-zinc-500 py-10 text-sm">
          <p className="italic">No questions yet. Be the first to ask.</p>
        </div>
      ) : (
        sorted.map((q) => (
          <Card
            key={q.id}
            className="p-4 flex justify-between items-center bg-white/70 dark:bg-zinc-900/60 backdrop-blur border-zinc-200/60 dark:border-zinc-800/60 hover:ring-1 hover:ring-blue-500/20 transition-colors"
          >
            <p className="text-sm text-zinc-900 dark:text-zinc-100">{q.text}</p>
            <UpvoteButton questionId={q.id} initialUpvotes={q.upvotes} />
          </Card>
        ))
      )}
    </div>
  )
}
