"use client"

import { motion } from "framer-motion"
import { BarChart3, Users } from "lucide-react"
import { useMemo } from "react"

export default function PollLiveView({ poll }: { poll: any }) {
  if (!poll) return null

  const totalVotes = useMemo(() => {
    return (poll?.options || []).reduce((acc: number, opt: any) => acc + (opt.votes || 0), 0)
  }, [poll])

  const maxVotes = useMemo(() => {
     return Math.max(...(poll?.options || []).map((o: any) => o.votes || 0), 1)
  }, [poll, totalVotes])

  return (
    <div className="bg-white dark:bg-[#0f111a] rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
      {/* Decorative gradient blob inside card */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] -mr-40 -mt-40 rounded-full pointer-events-none transition-opacity duration-1000 opacity-60 group-hover:opacity-100" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20">
                <BarChart3 className="w-5 h-5" />
             </div>
             <div>
                <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                  Live Poll Results
                </div>
                <div className="text-[11px] font-bold text-slate-500 mt-1 flex items-center gap-1.5 uppercase tracking-wider">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Real-time Data
                </div>
             </div>
          </div>
          <div className="text-right">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white justify-end mb-1">
                 <Users className="w-4 h-4 text-slate-400" />
                 <span className="text-2xl md:text-3xl font-black leading-none tracking-tighter tabular-nums">{totalVotes}</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Votes</span>
          </div>
        </div>
        
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-12 leading-tight tracking-tight max-w-2xl">
          {poll.question}
        </h3>

        <div className="space-y-4">
          {poll.options.map((opt: any, index: number) => {
            const percentage = totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0
            const relativeWidth = maxVotes > 0 ? (opt.votes / maxVotes) * 100 : 0
            const isLeader = opt.votes > 0 && opt.votes === maxVotes

            return (
              <motion.div
                key={opt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={`w-full relative h-16 flex items-center px-6 transition-all duration-300 overflow-hidden rounded-2xl border ${isLeader ? 'border-blue-500/50 bg-white dark:bg-[#030712] ring-1 ring-blue-500/20' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#030712]/50'}`}>
                  {/* Progress Bar Fill */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${relativeWidth}%` }}
                    transition={{ duration: 1, ease: "easeOut", type: "spring", stiffness: 50 }}
                    className={`absolute inset-y-0 left-0 transition-colors duration-500 ${
                      isLeader 
                        ? "bg-blue-100 dark:bg-blue-900/40" 
                        : "bg-slate-100 dark:bg-slate-800/80"
                    }`}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-between w-full gap-4">
                    <span className={`truncate text-base font-bold ${isLeader ? "text-blue-700 dark:text-blue-300" : "text-slate-700 dark:text-slate-300"}`}>
                      {opt.text}
                    </span>
                    
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-xs font-bold text-slate-400 tabular-nums bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded-md border border-slate-200/50 dark:border-slate-700/50">
                        {opt.votes || 0} votes
                      </span>
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-lg font-black tabular-nums w-12 text-right ${isLeader ? "text-blue-700 dark:text-blue-400" : "text-slate-500"}`}
                      >
                        {Math.round(percentage)}%
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
