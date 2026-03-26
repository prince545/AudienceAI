import { MessageSquare, ArrowBigUp } from "lucide-react"

export default function QuestionCard({ question }: { question: any }) {
  return (
    <div className="relative bg-white dark:bg-[#0f111a] rounded-[1.5rem] p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/50 hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all duration-300 group">
      
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-blue-500" />
              <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">Anonymous Question</span>
          </div>
          
          <p className="text-base md:text-[17px] font-semibold text-slate-900 dark:text-white leading-relaxed mb-4">
            {question.text}
          </p>
          
          <span className="text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
            Received {new Date(question.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-[#030712] rounded-2xl border border-slate-200/60 dark:border-slate-800 shrink-0 min-w-[70px] group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-blue-200 dark:group-hover:border-blue-800/50 transition-colors">
          <ArrowBigUp className="w-5 h-5 text-slate-400 group-hover:text-blue-500 mb-1" />
          <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums group-hover:text-blue-700 dark:group-hover:text-blue-400">
            {question.upvotes || 0}
          </span>
        </div>
      </div>
    </div>
  )
}
