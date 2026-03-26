"use client"

import UpvoteButton from "./UpvoteButton"
import { Card } from "@/components/ui/card"

export default function QuestionList({ questions }: { questions: any[] }) {
  const sorted = [...questions].sort((a, b) => b.upvotes - a.upvotes)

  return (
    <div className="space-y-3 mt-6">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Recent Questions</h2>
      {sorted.length === 0 ? (
        <p className="text-center text-gray-400 py-8 text-sm italic">No questions yet. Be the first to ask!</p>
      ) : (
        sorted.map((q) => (
          <Card key={q.id} className="p-4 flex justify-between items-center bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-zinc-800 dark:text-zinc-200">{q.text}</p>
            <UpvoteButton questionId={q.id} initialUpvotes={q.upvotes} />
          </Card>
        ))
      )}
    </div>
  )
}
