"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Play, Trash2, MessageSquare, Copy, ExternalLink, BarChart2, Calendar } from "lucide-react"
import Logo from "@/components/shared/Logo"

export default function Dashboard() {
  const [sessions, setSessions] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch("/api/sessions")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSessions(data)
        } else {
          console.error("Failed to fetch sessions:", data)
          setSessions([])
        }
      })
      .catch(console.error)
  }, [])

  async function createSession() {
    if (!title) return
    setLoading(true)
    const resp = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
    const newSession = await resp.json()
    setSessions([newSession, ...sessions])
    setTitle("")
    setLoading(false)
  }

  function copyJoinLink(code: string) {
    const url = `${window.location.origin}/join/${code}`
    navigator.clipboard.writeText(url)
    alert("Join link copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-zinc-100 dark:border-zinc-900 pb-8">
          <div className="space-y-4">
            <Logo />
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Your Sessions</h1>
              <p className="text-zinc-500 mt-1">Manage and launch your live presentations.</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <UserButton />
            <div className="flex gap-4 items-center bg-white dark:bg-zinc-900 p-2 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
              <Input
                placeholder="New Session Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-none bg-transparent focus-visible:ring-0 min-w-[200px]"
              />
              <Button onClick={createSession} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((s) => (
            <Card key={s.id} className="p-6 hover:shadow-lg transition-shadow group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                   <h2 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 transition-colors uppercase tracking-tight">{s.title}</h2>
                   <div className={`w-2 h-2 rounded-full ${s.isActive ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-zinc-300"}`} />
                </div>
                
                 <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">
                    <div className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded">
                        <MessageSquare className="w-3 h-3 text-blue-500" />
                        <span>{s._count?.questions || 0} Questions</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded">
                        <Calendar className="w-3 h-3 text-purple-500" />
                        <span>{new Date(s.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex gap-2">
                    <Button 
                      onClick={() => router.push(`/session/${s.id}`)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none shadow-md"
                    >
                      <Play className="w-4 h-4 mr-2 fill-current" />
                      {s.isActive ? "Launch" : "Re-open"}
                    </Button>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => copyJoinLink(s.code)}
                        className="hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                </div>
                {!s.isActive && (
                    <Button 
                        variant="ghost" 
                        onClick={() => router.push(`/session/${s.id}/analytics`)}
                        className="w-full text-zinc-500 hover:text-blue-600 text-xs font-bold uppercase tracking-tighter"
                    >
                        <BarChart2 className="w-3.5 h-3.5 mr-2" />
                        Analysis Summary
                    </Button>
                )}
              </div>
            </Card>
          ))}
          
          {sessions.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
              <p className="text-zinc-400">No sessions yet. Create your first one to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
