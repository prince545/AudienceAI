"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle2 } from "lucide-react"

export default function SubmitQuestion({ sessionId }: { sessionId: string }) {
  const [text, setText] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  async function handleSubmit() {
    if (!text.trim() || loading) return
    setLoading(true)
    try {
        await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, sessionId }),
        })
        setSubmitted(true)
        setText("")
        setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
        console.error("Failed to submit question", error)
    } finally {
        setLoading(false)
    }
  }

  return (
    <div className={`transition-all duration-300 rounded-3xl p-5 md:p-6 bg-white dark:bg-[#0f111a] border ${isFocused ? 'border-blue-500/40 shadow-xl shadow-blue-500/10' : 'border-slate-200 dark:border-slate-800 shadow-sm'}`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Ask the Presenter</h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
            Questions are anonymous. Keep it concise.
          </p>
        </div>
        <div className={`text-xs font-bold tabular-nums px-2 py-1 rounded-full ${text.length > 280 ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
          {text.length} / 300
        </div>
      </div>

      <div className="relative">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="What's on your mind?"
          maxLength={300}
          rows={3}
          className="w-full resize-none bg-slate-50 dark:bg-[#030712] border-0 rounded-2xl p-4 text-base placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0 transition-shadow"
        />
        
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute bottom-3 right-3 bg-emerald-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm shadow-lg shadow-emerald-500/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              Sent!
            </motion.div>
          ) : (
            <div className="absolute bottom-3 right-3">
              <Button
                onClick={handleSubmit}
                disabled={!text.trim() || loading}
                size="icon"
                className={`w-10 h-10 rounded-xl transition-all duration-300 ${!text.trim() ? 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5'}`}
              >
                <Send className="w-4 h-4 ml-0.5" />
              </Button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
