"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Send, Rocket } from "lucide-react"

export default function PollCreator({ sessionId, onCreated }: { sessionId: string; onCreated: (poll: any) => void }) {
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState(["", ""])
  const [loading, setLoading] = useState(false)

  const addOption = () => setOptions([...options, ""])
  const removeOption = (i: number) => setOptions(options.filter((_, idx) => idx !== i))
  const updateOption = (val: string, i: number) => {
    const next = [...options]
    next[i] = val
    setOptions(next)
  }

  async function handleSubmit() {
    if (!question || options.some(o => !o)) return
    setLoading(true)
    const resp = await fetch("/api/polls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, question, options }),
    })
    const poll = await resp.json()
    onCreated(poll)
    setQuestion("")
    setOptions(["", ""])
    setLoading(false)
  }

  return (
    <div className="p-8 md:p-10 bg-white dark:bg-[#0f111a] rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
      {/* Decorative gradient corner */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 dark:bg-blue-600/10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100" />
      
      <div className="relative z-10">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
                 <Rocket className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                  New Live Poll
                </h2>
                <p className="text-xs font-semibold text-slate-500 mt-1">Engage your audience instantly</p>
              </div>
            </div>
            <div className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-lg">
              Presenter Mode
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 block ml-1">The Question</label>
                <Input 
                placeholder="What would you like to ask?" 
                value={question} 
                onChange={(e) => setQuestion(e.target.value)}
                className="h-14 text-lg md:text-xl font-bold rounded-2xl bg-slate-50 dark:bg-[#030712] border-slate-200 dark:border-slate-800 focus-visible:ring-1 focus-visible:ring-blue-500 px-5 placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-inner"
                />
            </div>
            
            <div className="pt-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 block ml-1">Options</label>
                <div className="space-y-3">
                    {options.map((opt, i) => (
                        <div key={i} className="flex gap-3 items-center group/opt">
                            <span className="text-xs font-black text-slate-300 dark:text-slate-700 w-4 text-right tabular-nums">{i + 1}.</span>
                            <Input 
                                placeholder={`Option ${i+1}`} 
                                value={opt} 
                                onChange={(e) => updateOption(e.target.value, i)}
                                className="h-12 rounded-xl bg-white dark:bg-[#0f111a] border-slate-200 dark:border-slate-800 focus-visible:ring-1 focus-visible:ring-blue-500 font-medium px-4 shadow-sm"
                            />
                            {options.length > 2 ? (
                                <Button variant="ghost" size="icon" onClick={() => removeOption(i)} className="text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl shrink-0 h-12 w-12 opacity-0 group-hover/opt:opacity-100 transition-opacity">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            ) : (
                                <div className="w-12 shrink-0 border-l border-transparent" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-center pt-8 mt-4 border-t border-slate-100 dark:border-slate-800">
                <Button variant="ghost" onClick={addOption} className="text-[13px] font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white rounded-xl h-12 px-5">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Option
                </Button>
                <Button 
                    onClick={handleSubmit} 
                    disabled={loading || !question || options.some(o => !o)} 
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 rounded-xl h-12 px-6 font-bold uppercase tracking-widest text-[11px] transition-transform active:scale-95"
                >
                    <Send className="w-4 h-4 mr-2" />
                    {loading ? "Launching..." : "Launch Poll"}
                </Button>
            </div>
          </div>
      </div>
    </div>
  )
}
