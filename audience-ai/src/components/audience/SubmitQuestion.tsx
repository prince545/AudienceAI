"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function SubmitQuestion({ sessionId }: { sessionId: string }) {
  const [text, setText] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

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
    <div className="mb-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask your question..."
        maxLength={300}
        rows={3}
        className="w-full border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-zinc-900"
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-400">{text.length}/300</span>
        <Button
          onClick={handleSubmit}
          disabled={!text.trim() || loading}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          {loading ? "Sending..." : submitted ? "Sent!" : "Ask"}
        </Button>
      </div>
    </div>
  )
}
