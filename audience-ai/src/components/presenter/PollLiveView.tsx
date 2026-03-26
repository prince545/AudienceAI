"use client"

import { Card } from "@/components/ui/card"

export default function PollLiveView({ poll }: { poll: any }) {
  if (!poll) return null

  const totalVotes = poll.options.reduce((acc: number, opt: any) => acc + (opt.votes || 0), 0)

  return (
    <Card className="p-8 bg-zinc-900 text-white border-none shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-purple-400 mb-2">Active Poll</h2>
            <h3 className="text-2xl font-black italic mb-8 uppercase tracking-tight">{poll.question}</h3>

            <div className="space-y-6">
                {poll.options.map((opt: any) => {
                    const percentage = totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0
                    return (
                        <div key={opt.id} className="space-y-2">
                            <div className="flex justify-between text-sm font-bold">
                                <span>{opt.text}</span>
                                <span className="text-purple-400">{Math.round(percentage)}% ({opt.votes || 0})</span>
                            </div>
                            <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
            
            <div className="mt-8 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{totalVotes} Total Votes Cast</p>
            </div>
        </div>
        
        {/* Abstract background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] -mr-32 -mt-32" />
    </Card>
  )
}
