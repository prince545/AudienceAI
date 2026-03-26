"use client"

import { useEffect, useState, use } from "react"
import { useSocket } from "@/hooks/useSocket"
import { Share2, Radio, Sparkles } from "lucide-react"
import SubmitQuestion from "@/components/audience/SubmitQuestion"
import PollVotePanel from "@/components/audience/PollVotePanel"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Logo from "@/components/shared/Logo"
import { ThemeToggle } from "@/components/shared/ThemeToggle"

export default function AudienceView({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params)
  const [session, setSession] = useState<any>(null)
  const [questions, setQuestions] = useState<any[]>([])
  const [activePoll, setActivePoll] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/sessions/join/${code}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setSession(data)
        setQuestions(data.questions || [])
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
    socket.on("poll-vote", ({ optionId, newVotes }: { optionId: string; newVotes: number }) => {
      setActivePoll((prev: any) => {
        if (!prev) return prev
        return {
          ...prev,
          options: prev.options.map((o: any) => (o.id === optionId ? { ...o, votes: newVotes } : o)),
        }
      })
    })
    return () => { 
        socket.off("new-question")
        socket.off("upvote-update") 
        socket.off("new-poll")
        socket.off("poll-vote")
    }
  }, [socket])

  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <Card className="p-8 text-center max-w-sm border-red-100 dark:border-red-900/30 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
        <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Session Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400">{error}</p>
      </Card>
    </div>
  )

  if (!session) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-800 border-t-blue-500 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Connecting to session...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/30 relative overflow-x-hidden">
      {/* Premium Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-500/10 to-transparent dark:from-blue-500/5" />
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
      </div>

      <header className="fixed top-0 inset-x-0 z-50 bg-white/70 dark:bg-[#030712]/70 backdrop-blur-xl border-b border-white/20 dark:border-white/5">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
            <Logo className="scale-75 origin-left" />
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              <Button variant="ghost" size="icon" onClick={shareLink} className="rounded-full h-9 w-9 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                  <Share2 className="w-4 h-4" />
              </Button>
            </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-24 pb-20 relative z-10 w-full">
        {/* Session Header */}
        <div className="mb-8 pt-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4 ring-1 ring-emerald-500/20">
             <Radio className="w-3.5 h-3.5 animate-pulse" />
             Live Audience View
           </div>
           <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">{session.title}</h1>
           <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Ask questions, vote on polls, and engage with the presenter.</p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {activePoll && <PollVotePanel poll={activePoll} />}
          <SubmitQuestion sessionId={session.id} />
          
          <div className="pt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl text-[12px] font-bold border border-blue-100 dark:border-blue-800/50">
                <Sparkles className="w-4 h-4" />
                Your questions are sent directly to the presenter
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
