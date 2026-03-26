"use client"

import { useEffect, useState, use } from "react"
import { useSocket } from "@/hooks/useSocket"
import QuestionCard from "@/components/presenter/QuestionCard"
import AISummaryPanel from "@/components/presenter/AISummaryPanel"
import QRDisplay from "@/components/shared/QRDisplay"
import PollCreator from "@/components/presenter/PollCreator"
import PollLiveView from "@/components/presenter/PollLiveView"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Trash2, BarChart2, StopCircle } from "lucide-react"
import Logo from "@/components/shared/Logo"

export default function PresenterView({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [questions, setQuestions] = useState<any[]>([])
  const [sessionData, setSessionData] = useState<any>(null)
  const [activePoll, setActivePoll] = useState<any>(null)
  const [showAI, setShowAI] = useState(false)
  const { socket, isConnected } = useSocket(id)

  async function endSession() {
    if (!confirm("Are you sure you want to end this live session?")) return
    
    await fetch(`/api/sessions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: false, endedAt: new Date() }),
    })
    
    router.push(`/session/${id}/analytics`)
  }

  useEffect(() => {
    // Load session info
    fetch(`/api/sessions/${id}`)
      .then((r) => r.json())
      .then((data) => {
          setSessionData(data)
          // Find the active poll
          const active = data.polls?.find((p: any) => p.isActive)
          if (active) setActivePoll(active)
      })
      .catch(console.error)

    // Load existing questions
    fetch(`/api/sessions/${id}/questions`)
      .then((r) => r.json())
      .then(setQuestions)
      .catch(console.error)
  }, [id])

  useEffect(() => {
    if (!socket) return

    // New question submitted by audience
    socket.on("new-question", (question) => {
      setQuestions((prev) => [question, ...prev])
    })

    // Someone upvoted — update count in place
    socket.on("upvote-update", ({ questionId, upvotes }) => {
      setQuestions((prev) =>
        prev.map((q) => (q.id === questionId ? { ...q, upvotes } : q))
      )
    })

    socket.on("poll-vote", ({ optionId, newVotes }) => {
      setActivePoll((prev: any) => {
        if (!prev) return prev
        return {
          ...prev,
          options: prev.options.map((o: any) =>
            o.id === optionId ? { ...o, votes: newVotes } : o
          ),
        }
      })
    })

    return () => {
      socket.off("new-question")
      socket.off("upvote-update")
      socket.off("poll-vote")
    }
  }, [socket])

  const sorted = [...questions].sort((a, b) => b.upvotes - a.upvotes)

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6 border-b border-zinc-100 dark:border-zinc-900 pb-4">
          <div className="flex items-center gap-8">
            <Logo />
            <h1 className="text-2xl font-bold">Live Questions</h1>
          </div>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                  <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    {isConnected ? "Live" : "Disconnected"}
                  </span>
               </div>
               <Button onClick={() => router.push(`/session/${id}/analytics`)} variant="ghost" size="sm" className="hidden sm:flex text-zinc-500 hover:text-zinc-900">
                  <BarChart2 className="w-4 h-4 mr-2" />
                  Stats
               </Button>
               <Button onClick={endSession} variant="destructive" size="sm" className="shadow-lg shadow-red-500/20">
                  <StopCircle className="w-4 h-4 mr-2" />
                  End
               </Button>
            </div>
        </div>

        <div className="grid gap-6 max-w-4xl">
          {activePoll ? (
            <PollLiveView poll={activePoll} />
          ) : (
            <PollCreator sessionId={id} onCreated={setActivePoll} />
          )}

          {sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
               <p className="text-lg italic text-zinc-500">Waiting for audience questions...</p>
               <p className="text-sm">Share the QR code to begin.</p>
            </div>
          ) : (
            sorted.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))
          )}
        </div>
      </div>

      <div className="w-96 border-l border-zinc-100 dark:border-zinc-900 p-6 bg-white dark:bg-zinc-950 overflow-y-auto hidden lg:block">
        <QRDisplay code={sessionData?.code || ""} />
        <Button onClick={() => setShowAI(!showAI)} variant="outline" className="w-full mt-6">
            {showAI ? "Hide AI Summary" : "View AI Insights"}
        </Button>
        {showAI && <div className="mt-6"><AISummaryPanel sessionId={id} onClose={() => setShowAI(false)} /></div>}
      </div>
    </div>
  )
}
