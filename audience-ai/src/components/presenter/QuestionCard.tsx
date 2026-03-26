import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function QuestionCard({ question }: { question: any }) {
  return (
    <Card className="p-4 flex justify-between items-start gap-4">
      <div className="flex-1">
        <p className="text-sm md:text-base font-medium">{question.text}</p>
        <span className="text-xs text-zinc-500 mt-2 block">
          {new Date(question.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Badge variant="secondary" className="px-2 py-1">
          {question.upvotes}
        </Badge>
        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">Upvotes</span>
      </div>
    </Card>
  )
}
