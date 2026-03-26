"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X, Brain, MessageCircle, Lightbulb, TrendingUp } from "lucide-react"

export default function AISummaryPanel({
  sessionId,
  onClose,
}: {
  sessionId: string
  onClose: () => void
}) {
  const [clusters, setClusters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/ai/cluster", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          console.error("AI Error:", data.error, data.details)
          setClusters([])
        } else {
          setClusters(data.clusters || [])
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error("Fetch Error:", err)
        setLoading(false)
      })
  }, [sessionId])

  return (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-transparent">
        <div className="p-8 pb-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-start shrink-0">
            <div>
               <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 ring-1 ring-indigo-500/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Intelligence
               </div>
               <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-1">Theme Analysis</h2>
               <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Powered by Llama 3.3</p>
            </div>
            
            <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full bg-white dark:bg-[#030712] border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-sm transition-colors"
            >
                <X className="w-4 h-4" />
            </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center h-full gap-5 pb-20"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 rounded-full animate-pulse" />
                            <Brain className="w-12 h-12 text-blue-500 animate-pulse relative z-10" />
                        </div>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Analyzing audience intent...</p>
                    </motion.div>
                ) : clusters.length === 0 ? (
                    <motion.div 
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center h-full text-center p-8 bg-white dark:bg-[#0f111a] rounded-[2rem] border border-dashed border-slate-300 dark:border-slate-800 shadow-sm"
                    >
                        <TrendingUp className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-6" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Not enough data</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed max-w-sm">Collect more questions in your session to automatically unlock AI-powered clustering and themes.</p>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="clusters"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        {clusters.map((cluster, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.4 }}
                                className="bg-white dark:bg-[#0f111a] rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow group relative overflow-hidden"
                            >
                                {/* Subtle grain overlay or gradient */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 dark:bg-indigo-500/10 blur-[50px] pointer-events-none rounded-full" />
                                
                                <div className="relative z-10">
                                    <div className="flex items-start gap-3 mb-6">
                                        <div className="mt-1 p-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl shrink-0">
                                            <Lightbulb className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-extrabold text-lg md:text-xl text-slate-900 dark:text-white tracking-tight leading-tight">{cluster.theme}</h3>
                                            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-1.5">{cluster.questions.length} related questions</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3 mb-8 pl-1">
                                        {cluster.questions.map((q: string, j: number) => (
                                            <div key={j} className="flex gap-4 text-[15px] font-medium text-slate-600 dark:text-slate-300 leading-relaxed border-l-2 border-slate-100 dark:border-slate-800 pl-4 py-1.5">
                                                <MessageCircle className="w-4 h-4 mt-[3px] text-slate-300 dark:text-slate-600 shrink-0" />
                                                <span className="max-w-[90%]">{q}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl p-5 md:p-6 border border-indigo-100/50 dark:border-indigo-900/40">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                            <span className="text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">AI Response Strategy</span>
                                        </div>
                                        <p className="text-[15px] font-semibold text-slate-800 dark:text-indigo-100 leading-relaxed italic">
                                            "{cluster.smartAnswer}"
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </div>
  )
}
