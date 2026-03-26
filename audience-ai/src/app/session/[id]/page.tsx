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
import { 
  StopCircle, 
  MessageSquare, 
  PieChart, 
  LayoutDashboard,
  ChevronRight,
  Sparkles,
  Search,
  Radio
} from "lucide-react"
import Logo from "@/components/shared/Logo"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"

export default function PresenterView({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [questions, setQuestions] = useState<any[]>([])
  const [sessionData, setSessionData] = useState<any>(null)
  const [activePoll, setActivePoll] = useState<any>(null)
  const [showAI, setShowAI] = useState(false)
  const [activeTab, setActiveTab] = useState<"questions" | "polls">("questions")
  const { socket, isConnected } = useSocket(id)
  const [search, setSearch] = useState("")

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
    fetch(`/api/sessions/${id}`)
      .then((r) => r.json())
      .then((data) => {
          setSessionData(data)
          const active = data.polls?.find((p: any) => p.status === "ACTIVE" || p.isActive)
          if (active) setActivePoll(active)
      })
      .catch(console.error)

    fetch(`/api/sessions/${id}/questions`)
      .then((r) => r.json())
      .then(setQuestions)
      .catch(console.error)
  }, [id])

  useEffect(() => {
    if (!socket) return

    socket.on("new-question", (question) => {
      setQuestions((prev) => [question, ...prev])
    })

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

  const filtered = questions.filter(q => q.text.toLowerCase().includes(search.toLowerCase()))
  const sorted = [...filtered].sort((a, b) => b.upvotes - a.upvotes)

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#030712] font-sans selection:bg-blue-500/30 overflow-hidden text-slate-900 dark:text-slate-100">
      {/* Background glow for dark mode main area */}
      <div className="fixed inset-0 pointer-events-none z-0 hidden dark:block">
         <div className="absolute top-0 right-1/3 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Sidebar - Control Panel */}
      <aside className="w-[340px] border-r border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-[#0f111a]/80 backdrop-blur-xl flex flex-col hidden xl:flex shrink-0 z-20 shadow-xl shadow-slate-200/20 dark:shadow-black/20">
        <div className="h-24 px-8 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between shrink-0">
          <Logo />
          <ThemeToggle />
        </div>
        
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* QR Code Card */}
          <div className="bg-white dark:bg-[#030712] p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
             <div className="w-full mb-4 flex justify-between items-center px-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Join Code</span>
                <span className="text-sm font-black bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md tracking-widest">{sessionData?.code || "..."}</span>
             </div>
             <QRDisplay code={sessionData?.code || ""} />
             <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-4 text-center max-w-[200px]">Scan to participate in the live Q&A</p>
          </div>
          
          <div className="space-y-3">
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2 mb-4">Command Center</h4>
             
             <Button 
                onClick={() => setShowAI(!showAI)} 
                variant="outline" 
                className="w-full justify-start h-14 px-5 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-[#030712] hover:border-blue-300 dark:hover:border-blue-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 group transition duration-300 shadow-sm"
             >
                <Sparkles className="w-5 h-5 mr-3 text-blue-500 group-hover:animate-pulse" />
                <span className="font-semibold text-[13px] tracking-wide text-slate-700 dark:text-slate-300">AI Intelligence</span>
                <ChevronRight className="ml-auto w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
             </Button>

             <Button 
                onClick={() => router.push(`/dashboard`)} 
                variant="outline" 
                className="w-full justify-start h-14 px-5 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#030712]/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition duration-300 shadow-sm"
             >
                <LayoutDashboard className="w-5 h-5 mr-3 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                <span className="font-semibold text-[13px] tracking-wide text-slate-600 dark:text-slate-400">Exit to Dashboard</span>
             </Button>
          </div>

          <div className="mt-auto pt-6">
            <div className="p-6 bg-red-50/50 dark:bg-red-950/20 rounded-[2rem] border border-red-100 dark:border-red-900/30">
                <Button onClick={endSession} variant="destructive" className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-red-500/10 group bg-red-600 hover:bg-red-700">
                    <StopCircle className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                    End Live Session
                </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col max-h-screen overflow-hidden relative z-10 w-full">
        <header className="h-24 px-6 md:px-10 shrink-0 border-b border-white/20 dark:border-white/5 bg-white/60 dark:bg-[#0f111a]/60 backdrop-blur-xl flex items-center justify-between z-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:shadow-none">
          <div className="flex items-center gap-1.5 bg-slate-100/80 dark:bg-[#030712] p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
             <motion.button 
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab("questions")}
                className={`px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${activeTab === "questions" ? "bg-white text-blue-600 dark:bg-slate-800 dark:text-blue-400 shadow-sm" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
             >
                <MessageSquare className="w-4 h-4" />
                Live Q&A
                {questions.length > 0 && <span className={`ml-1.5 px-2 py-0.5 rounded-full text-[9px] font-black ${activeTab === "questions" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" : "bg-slate-200 text-slate-600 dark:bg-slate-800"}`}>{questions.length}</span>}
             </motion.button>
             <motion.button 
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab("polls")}
                className={`px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${activeTab === "polls" ? "bg-white text-emerald-600 dark:bg-slate-800 dark:text-emerald-400 shadow-sm" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
             >
                <PieChart className="w-4 h-4" />
                Live Polls
             </motion.button>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
             <div className="relative group hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input 
                   placeholder="Filter responses..." 
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   className="pl-11 h-12 w-64 md:w-80 bg-white/50 dark:bg-[#030712]/50 border-slate-200 dark:border-slate-800 rounded-2xl text-[13px] font-medium transition-all focus:bg-white dark:focus:bg-[#030712] focus:ring-1 focus:ring-blue-500/50"
                />
             </div>
             
             <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#030712] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="relative flex h-2 w-2">
                  {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isConnected ? "bg-emerald-500" : "bg-red-500"}`}></span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  {isConnected ? "Connected" : "Reconnecting"}
                </span>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-10 relative">
           <AnimatePresence mode="wait">
              {activeTab === "questions" ? (
                <motion.div 
                    key="questions-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-4xl mx-auto space-y-5 pb-10"
                >
                    {sorted.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 text-center">
                            <div className="p-8 bg-white dark:bg-[#030712] rounded-full border border-slate-200 dark:border-slate-800 mb-8 shadow-sm">
                                <Radio className="w-12 h-12 text-slate-300 dark:text-slate-700" />
                            </div>
                            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">Awaiting questions</h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-medium">Participants scan the QR code to interact. Once questions drop, they appear magically right here.</p>
                        </div>
                    ) : (
                        sorted.map((q) => (
                            <QuestionCard key={q.id} question={q} />
                        ))
                    )}
                </motion.div>
              ) : (
                <motion.div 
                    key="polls-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-3xl mx-auto pb-10"
                >
                    {activePoll ? (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <PollLiveView poll={activePoll} />
                            <div className="flex justify-center mt-8">
                                <Button 
                                    variant="outline" 
                                    className="border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#030712]/50 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 rounded-2xl h-12 px-8 uppercase text-[10px] font-bold tracking-widest shadow-sm transition-all"
                                    onClick={() => setActivePoll(null)}
                                >
                                    End Poll & Create Another
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <PollCreator sessionId={id} onCreated={(poll: any) => setActivePoll(poll)} />
                    )}
                </motion.div>
              )}
           </AnimatePresence>
        </div>

        {/* Floating AI Panel */}
        <AnimatePresence>
            {showAI && (
                <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowAI(false)}
                  className="absolute inset-0 bg-slate-900/20 dark:bg-black/40 backdrop-blur-sm z-40"
                />
                <motion.div 
                    initial={{ x: "100%", opacity: 0.5 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0.5 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="absolute top-0 right-0 w-full sm:w-[500px] h-full bg-white/90 dark:bg-[#0f111a]/95 backdrop-blur-3xl border-l border-white/20 dark:border-slate-800/80 shadow-[rgba(0,0,0,0.1)_0px_20px_40px_-5px] z-50 overflow-y-auto"
                >
                    <AISummaryPanel sessionId={id} onClose={() => setShowAI(false)} />
                </motion.div>
                </>
            )}
        </AnimatePresence>
      </main>
    </div>
  )
}
