import Link from "next/link"
import { Sparkles } from "lucide-react"

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      <div className="p-1.5 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
        <Sparkles className="h-5 w-5 text-white" />
      </div>
      <span className="text-xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic">
        Audience<span className="text-blue-600">AI</span>
      </span>
    </Link>
  )
}
