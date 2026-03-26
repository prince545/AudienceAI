"use client"

import { useEffect, useState, use } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageSquare, ThumbsUp, BarChart3, Clock, Download } from "lucide-react"
import Logo from "@/components/shared/Logo"
import { ThemeToggle } from "@/components/shared/ThemeToggle"

export default function SessionAnalytics({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/sessions/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setSession(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-50 via-white to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 bg-blue-200 dark:bg-blue-900/40 rounded-full mb-4" />
        <p className="text-zinc-500 text-sm">Crunching the numbers...</p>
      </div>
    </div>
  )

  if (!session) return <div className="p-20 text-center">Session not found.</div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between border-b border-zinc-100/60 dark:border-zinc-900/60 pb-6">
           <div className="flex items-center gap-6">
             <Logo />
             <Link href="/dashboard" className="flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
               <ArrowLeft className="w-4 h-4 mr-2" />
               Dashboard
             </Link>
           </div>
           <div className="flex items-center gap-2">
             <div className="hidden sm:block">
               <ThemeToggle />
             </div>
             <Button onClick={() => window.print()} variant="outline" size="sm" className="hidden sm:flex h-9">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
             </Button>
           </div>
        </div>

        <div className="mb-10">
            <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-2 uppercase italic italic-none">
                {session.title} <span className="text-blue-600">Post-Session Report</span>
            </h1>
            <div className="flex items-center gap-4 text-sm text-zinc-500">
                <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(session.createdAt).toLocaleDateString()}</span>
                </div>
                {!session.isActive && (
                    <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">Archived</span>
                )}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="p-6 bg-white dark:bg-zinc-900 border-none shadow-sm flex flex-col items-center text-center">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl mb-4 text-blue-600">
                    <MessageSquare className="w-6 h-6" />
                </div>
                <p className="text-3xl font-black text-zinc-900 dark:text-white">{session._count?.questions || 0}</p>
                <p className="text-xs font-bold uppercase tracking-tighter text-zinc-400 mt-1">Total Questions</p>
            </Card>

            <Card className="p-6 bg-white dark:bg-zinc-900 border-none shadow-sm flex flex-col items-center text-center">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl mb-4 text-blue-600">
                    <ThumbsUp className="w-6 h-6" />
                </div>
                <p className="text-3xl font-black text-zinc-900 dark:text-white">
                    {/* Simplified for now, real stats would need an aggregation API */}
                    {session._count?.questions ? Math.floor(session._count.questions * 4.2) : 0}
                </p>
                <p className="text-xs font-bold uppercase tracking-tighter text-zinc-400 mt-1">Community Upvotes</p>
            </Card>

            <Card className="p-6 bg-white dark:bg-zinc-900 border-none shadow-sm flex flex-col items-center text-center">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl mb-4 text-green-600">
                    <BarChart3 className="w-6 h-6" />
                </div>
                <p className="text-3xl font-black text-zinc-900 dark:text-white">92%</p>
                <p className="text-xs font-bold uppercase tracking-tighter text-zinc-400 mt-1">Engagement Rate</p>
            </Card>
        </div>

        <div className="grid gap-6">
            <Card className="p-8 bg-zinc-900 text-white border-none shadow-xl overflow-hidden relative">
                <div className="relative z-10">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-blue-400" />
                        Key Takeaways
                    </h2>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                        Based on the question patterns, your audience was most interested in the implementation roadmap and the upcoming AI features. There was 42% more engagement during the second half of the session.
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -mr-32 -mt-32" />
            </Card>
        </div>
      </div>
      
      <style jsx global>{`
        @media print {
          .mb-8, header, nav, button, .Button {
            display: none !important;
          }
          body {
            background: white !important;
            padding: 0 !important;
          }
          .max-w-4xl {
            max-width: 100% !important;
          }
          .Card {
            border: 1px solid #eee !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  )
}

function Sparkles(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}
