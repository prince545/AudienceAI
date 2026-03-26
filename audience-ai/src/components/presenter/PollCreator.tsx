"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, Send } from "lucide-react"

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
    <Card className="p-6 bg-white dark:bg-zinc-900 border-none shadow-xl border-t-4 border-t-purple-600 mb-8">
      <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-6">Create Live Poll</h2>
      <div className="space-y-4">
        <Input 
          placeholder="What would you like to ask?" 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)}
          className="bg-zinc-50 dark:bg-zinc-800 border-none h-12 text-lg font-bold"
        />
        
        <div className="space-y-2">
            {options.map((opt, i) => (
                <div key={i} className="flex gap-2">
                    <Input 
                        placeholder={`Option ${i+1}`} 
                        value={opt} 
                        onChange={(e) => updateOption(e.target.value, i)}
                        className="bg-zinc-50 dark:bg-zinc-800 border-none"
                    />
                    {options.length > 2 && (
                        <Button variant="ghost" size="icon" onClick={() => removeOption(i)} className="text-zinc-400 hover:text-red-600">
                             <Trash2 className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            ))}
        </div>

        <div className="flex justify-between items-center pt-2">
            <Button variant="ghost" size="sm" onClick={addOption} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                <Plus className="w-4 h-4 mr-1" />
                Add Option
            </Button>
            <Button onClick={handleSubmit} disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20">
                <Send className="w-4 h-4 mr-2" />
                Launch Poll
            </Button>
        </div>
      </div>
    </Card>
  )
}
