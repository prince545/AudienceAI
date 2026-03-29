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
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-x-hidden pb-32 noise">
      {/* Background glow for premium look */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
         <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent/5 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
      </div>

      <header className="px-6 lg:px-12 h-20 flex items-center border-b border-white/5 bg-background/60 sticky top-0 z-40 backdrop-blur-xl">
        <Logo />
        <div className="ml-auto flex items-center gap-6">
             <ThemeToggle />
             <div className="h-6 w-px bg-white/10" />
             <UserButton />
             <Button variant="ghost" onClick={() => router.push("/")} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-all">Exit</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">
                  Welcome Back, <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{user?.firstName || "Presenter"}</span>
                </h1>
                <p className="text-muted-foreground font-medium text-xl max-w-2xl leading-relaxed">
                  Manage your interactive sessions, monitor live engagement, and analyze post-event data with precision.
                </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full md:w-auto">
                <div className="relative group w-full md:w-80">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                        placeholder="Filter sessions..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl shadow-xl focus:ring-2 focus:ring-primary/50 text-sm font-bold transition-all placeholder:text-muted-foreground/50"
                    />
                </div>
            </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 items-start">
          {/* Create Session Card - Premium Feature Action */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Card className="p-10 border-none bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground rounded-[2.5rem] relative overflow-hidden group min-h-[420px] flex flex-col justify-between shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-700 hover:-translate-y-1">
                <div className="relative z-10">
                    <div className="p-4 bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl w-fit mb-8 shadow-2xl">
                        <Plus className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-black tracking-tight mb-4">New Session</h2>
                    <p className="text-white/80 text-base font-medium mb-10 leading-relaxed max-w-[240px]">
                      Ready to engage your audience? Launch a high-performance room in seconds.
                    </p>
                </div>
                <div className="relative z-10 space-y-5">
                    <Input 
                        placeholder="e.g. Annual Tech Symposium" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-black/20 border-white/10 text-white placeholder:text-white/30 h-16 rounded-2xl backdrop-blur-md focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all font-bold"
                    />
                    <Button 
                        onClick={createSession} 
                        disabled={creating || !title.trim()}
                        className="w-full bg-white text-primary hover:bg-white/90 h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-black/20 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {creating ? "Deploying..." : "Launch Session"}
                    </Button>
                </div>
                {/* Visual Flourishes */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 blur-[100px] -mr-32 -mt-32 rounded-full pointer-events-none group-hover:bg-accent/30 transition-colors" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-black/20 blur-[80px] -mr-20 -mb-20 rounded-full pointer-events-none" />
            </Card>
          </motion.div>

          {/* Sessions List */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8 content-start">
            <AnimatePresence mode="popLayout">
                {filtered.map((s, idx) => (
                    <motion.div 
                        key={s.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        transition={{ delay: idx * 0.05, duration: 0.5 }}
                    >
                        <Card className="p-8 h-full flex flex-col border border-white/10 shadow-xl bg-white/5 hover:bg-white/10 hover:border-primary/40 hover:shadow-primary/10 transition-all duration-500 rounded-[2.5rem] group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-2.5 h-2.5 rounded-full ${s.isActive ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-pulse" : "bg-white/20"}`} />
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{s.isActive ? "Live Engine" : "Historical"}</p>
                                    </div>
                                    <h3 className="text-2xl font-bold tracking-tight leading-tight group-hover:text-primary transition-all line-clamp-2">{s.title}</h3>
                                </div>
                                <div className="text-[11px] font-black uppercase tracking-[0.15em] bg-white/5 text-muted-foreground px-4 py-2 rounded-xl border border-white/5 shadow-inner">
                                    {s.code}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5 mb-10 relative z-10">
                                <div className="flex flex-col gap-2 p-5 bg-black/20 rounded-3xl border border-white/5 group-hover:border-primary/10 transition-colors">
                                    <MessageSquare className="w-5 h-5 text-primary mb-1 shadow-primary/20" />
                                    <span className="text-2xl font-black leading-none">{s._count?.questions || 0}</span>
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Inquiries</span>
                                </div>
                                <div className="flex flex-col gap-2 p-5 bg-black/20 rounded-3xl border border-white/5 group-hover:border-accent/10 transition-colors">
                                    <Calendar className="w-5 h-5 text-accent mb-1 shadow-accent/20" />
                                    <span className="text-sm font-black leading-none truncate mt-1 uppercase tracking-tight">
                                        {new Date(s.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mt-1">Timeline</span>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-auto relative z-10">
                                <Button 
                                    onClick={() => router.push(`/session/${s.id}`)}
                                    className="flex-[2] bg-foreground text-background hover:bg-primary hover:text-white rounded-2xl h-14 font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 group/btn"
                                >
                                    <Play className="w-4 h-4 mr-2 group-hover/btn:translate-x-0.5 transition-transform" />
                                    {s.isActive ? "Engage" : "Review"}
                                </Button>
                                <Button 
                                    onClick={() => router.push(`/session/${s.id}/analytics`)}
                                    variant="outline"
                                    className="flex-1 border-white/10 bg-transparent hover:bg-white/10 rounded-2xl h-14"
                                >
                                    <BarChart2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => deleteSession(s.id)}
                                    className="flex-1 border-white/10 bg-transparent text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5 rounded-2xl h-14 transition-all"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                            </div>
                            
                            {/* Card Background Bloom */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/2 blur-[60px] rounded-full pointer-events-none" />
                        </Card>
                    </motion.div>
                ))}
            </AnimatePresence>
            
            {filtered.length === 0 && !loading && (
                <div className="col-span-full flex flex-col items-center justify-center p-24 text-center bg-white/5 rounded-[3rem] border border-dashed border-white/10 min-h-[460px]">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 mb-8 shadow-2xl">
                        <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                    </div>
                    <p className="text-2xl font-black mb-4 uppercase tracking-tighter">No sessions identified</p>
                    <p className="text-muted-foreground font-medium text-lg max-w-sm leading-relaxed">{search ? `No results matching "${search}".` : "Your command center is empty. Launch your first interactive session above."}</p>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
