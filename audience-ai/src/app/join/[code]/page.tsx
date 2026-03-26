"use client"

import { useEffect, useState, use } from "react"
import { useSocket } from "@/hooks/useSocket"
import { Share2, ArrowLeft } from "lucide-react"
import SubmitQuestion from "@/components/audience/SubmitQuestion"
import QuestionList from "@/components/audience/QuestionList"
import PollVotePanel from "@/components/audience/PollVotePanel"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Logo from "@/components/shared/Logo"

export default function AudienceView({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params)
  const [session, setSession] = useState<any>(null)
  const [questions, setQuestions] = useState<any[]>([])
  const [activePoll, setActivePoll] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Resolve join code to session
    fetch(`/api/sessions/join/${code}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setSession(data)
        setQuestions(data.questions || [])
        // Get active poll
        const active = data.polls?.find((p: any) => p.isActive)
        if (active) setActivePoll(active)
      })
      .catch(err => {
        setError("Invalid session code or session closed.")
        console.error(err)
      })
  }, [code])

  function shareLink() {
    if (navigator.share) {
      navigator.share({
        title: session.title,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied!")
    }
  }

  const { socket } = useSocket(session?.id || "")

  useEffect(() => {
    if (!socket) return
    socket.on("new-question", (q) => setQuestions((prev) => [q, ...prev]))
    socket.on("upvote-update", ({ questionId, upvotes }) => {
      setQuestions((prev) => prev.map((q) => (q.id === questionId ? { ...q, upvotes } : q)))
    })
    socket.on("new-poll", (poll) => {
      setActivePoll(poll)
    })
    return () => { 
        socket.off("new-question")
        socket.off("upvote-update") 
        socket.off("new-poll")
    }
  }, [socket])

  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950">
      <Card className="p-8 text-center max-w-sm">
        <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-zinc-500">{error}</p>
      </Card>
    </div>
  )

  if (!session) return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-4" />
        <p className="text-zinc-500 text-sm">Loading session...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
            <Logo className="scale-75 origin-left" />
            <Button variant="ghost" size="icon" onClick={shareLink} className="rounded-full h-8 w-8 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <Share2 className="w-4 h-4 text-zinc-500" />
            </Button>
        </div>
      </header>

      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 p-6 pt-2">
        <div className="max-w-md mx-auto">
           <h1 className="text-xl font-bold text-zinc-900 dark:text-white line-clamp-1">{session.title}</h1>
           <p className="text-xs font-medium text-zinc-500 mt-1 uppercase tracking-wider flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             Live Q&A Session
           </p>
        </div>
      </div>

      <main className="max-w-md mx-auto p-4 py-8">
        {activePoll && <PollVotePanel poll={activePoll} />}
        <SubmitQuestion sessionId={session.id} />
        <QuestionList questions={questions} />
      </main>
    </div>
  )
}
