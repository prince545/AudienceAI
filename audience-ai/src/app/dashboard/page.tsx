"use client"

import { useState, useEffect } from "react"
import { useUser, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Play, 
  Trash2, 
  MessageSquare, 
  BarChart2, 
  Calendar, 
  Search,
  Sparkles
} from "lucide-react"
import Logo from "@/components/shared/Logo"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/shared/ThemeToggle"

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [creating, setCreating] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (isLoaded && user) {
      fetchSessions()
    }
  }, [isLoaded, user])

  async function fetchSessions() {
    try {
      const resp = await fetch("/api/sessions")
      const data = await resp.json()
      if (Array.isArray(data)) {
        setSessions(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function createSession() {
    if (!title.trim()) return
    setCreating(true)
    try {
      const resp = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      })
      const newSession = await resp.json()
      setSessions([newSession, ...sessions])
      setTitle("")
      toast.success("Session created successfully!")
    } catch (err) {
      toast.error("Failed to create session.")
    } finally {
      setCreating(false)
    }
  }

  async function deleteSession(id: string) {
    if (!confirm("Are you sure? This cannot be undone.")) return
    try {
      await fetch(`/api/sessions/${id}`, { method: "DELETE" })
      setSessions(sessions.filter((s) => s.id !== id))
      toast.info("Session deleted.")
    } catch (err) {
      toast.error("Failed to delete session.")
    }
  }

  const filtered = sessions.filter(s => s.title.toLowerCase().includes(search.toLowerCase()))

  if (!isLoaded || loading) return (
     <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-[#030712] selection:bg-blue-500/30">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-800 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Dashboard</p>
        </div>
     </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/30 relative overflow-x-hidden pb-20">
      {/* Background glow for dark mode */}
      <div className="fixed inset-0 pointer-events-none z-0 hidden dark:block">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
      </div>

      <header className="px-6 lg:px-12 h-20 flex items-center border-b border-white/20 dark:border-white/5 bg-white/70 dark:bg-[#030712]/70 sticky top-0 z-40 backdrop-blur-xl">
        <Logo />
        <div className="ml-auto flex items-center gap-5">
             <ThemeToggle />
             <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
             <UserButton />
             <Button variant="ghost" onClick={() => router.push("/")} className="text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Exit</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
                  Welcome Back, <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">{user?.firstName || "Presenter"}</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-xl">
                  Manage your interactive sessions, monitor live engagement, and analyze post-event data.
                </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }} className="w-full md:w-auto">
                <div className="relative group w-full md:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input 
                        placeholder="Search your sessions..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-11 h-12 bg-white dark:bg-[#0f111a] border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/50 text-sm font-medium transition-all"
                    />
                </div>
            </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Create Session Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="p-8 border-none shadow-xl shadow-blue-500/10 dark:shadow-none bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-[2rem] relative overflow-hidden group min-h-[380px] flex flex-col justify-between hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-1">
                <div className="relative z-10">
                    <div className="p-3 bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl w-fit mb-6 shadow-sm shadow-black/10">
                        <Plus className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-extrabold tracking-tight mb-2">New Session</h2>
                    <p className="text-blue-100/90 text-sm font-medium mb-8 leading-relaxed max-w-[200px]">
                      Ready to engage your audience? Create a secure room in seconds.
                    </p>
                </div>
                <div className="relative z-10 space-y-4">
                    <Input 
                        placeholder="e.g. Q4 All-Hands Meeting" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-black/20 dark:bg-black/40 border-white/10 text-white placeholder:text-white/40 h-14 rounded-2xl backdrop-blur-md focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                    />
                    <Button 
                        onClick={createSession} 
                        disabled={creating || !title.trim()}
                        className="w-full bg-white text-blue-600 hover:bg-slate-50 h-14 rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-black/10 transition-transform active:scale-95 disabled:opacity-80 disabled:hover:bg-white"
                    >
                        {creating ? "Launching..." : "Launch Session"}
                    </Button>
                </div>
                {/* Background flourish inside card */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[80px] -mr-32 -mt-32 rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 blur-[60px] -mr-20 -mb-20 rounded-full pointer-events-none" />
            </Card>
          </motion.div>

          {/* Sessions List */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6 content-start">
            <AnimatePresence mode="popLayout">
                {filtered.map((s, idx) => (
                    <motion.div 
                        key={s.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ delay: idx * 0.05, duration: 0.4 }}
                    >
                        <Card className="p-6 md:p-8 h-full flex flex-col border border-slate-200 dark:border-slate-800/60 shadow-sm bg-white dark:bg-[#0f111a] hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 hover:border-blue-500/30 transition-all duration-300 rounded-[2rem] group relative pointer-events-auto">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className={`w-2 h-2 rounded-full ${s.isActive ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-300 dark:bg-slate-700"}`} />
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{s.isActive ? "Live Now" : "Archived"}</p>
                                    </div>
                                    <h3 className="text-xl font-bold tracking-tight leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">{s.title}</h3>
                                </div>
                                <div className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
                                    {s.code}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="flex flex-col gap-1 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                                    <MessageSquare className="w-4 h-4 text-blue-500 mb-1" />
                                    <span className="text-xl font-bold text-slate-900 dark:text-white leading-none">{s._count?.questions || 0}</span>
                                    <span className="text-[10px] font-bold text-slate-400">QUESTIONS</span>
                                </div>
                                <div className="flex flex-col gap-1 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                                    <Calendar className="w-4 h-4 text-emerald-500 mb-1" />
                                    <span className="text-sm font-bold text-slate-900 dark:text-white leading-none truncate mt-[3px]">
                                        {new Date(s.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 mt-[2px]">DATE</span>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-auto">
                                <Button 
                                    onClick={() => router.push(`/session/${s.id}`)}
                                    className="flex-[2] bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-50 hover:text-white dark:hover:text-blue-600 rounded-xl h-12 font-bold text-xs uppercase tracking-wider transition-all shadow-md group/btn"
                                >
                                    <Play className="w-3.5 h-3.5 mr-2 group-hover/btn:scale-110 transition-transform" />
                                    {s.isActive ? "Join" : "Open"}
                                </Button>
                                <Button 
                                    onClick={() => router.push(`/session/${s.id}/analytics`)}
                                    variant="outline"
                                    className="flex-1 border-slate-200 dark:border-slate-800 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl h-12"
                                >
                                    <BarChart2 className="w-4 h-4 text-slate-500" />
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => deleteSession(s.id)}
                                    className="flex-1 border-slate-200 dark:border-slate-800 bg-transparent text-slate-400 hover:text-red-600 hover:border-red-200 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl h-12 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </AnimatePresence>
            
            {filtered.length === 0 && !loading && (
                <div className="col-span-full flex flex-col items-center justify-center p-16 text-center bg-slate-50/50 dark:bg-[#0f111a]/50 rounded-[2.5rem] border border-dashed border-slate-300 dark:border-slate-800 min-h-[380px]">
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-full shadow-sm border border-slate-100 dark:border-slate-800 mb-6">
                        <Sparkles className="w-8 h-8 text-blue-400" />
                    </div>
                    <p className="text-slate-900 dark:text-white font-bold text-lg mb-2">No sessions found</p>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm max-w-xs">{search ? `No results matching "${search}".` : "You haven't created any sessions yet."}</p>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
