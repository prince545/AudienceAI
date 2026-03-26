"use client"

import { useEffect, useState, use } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Home, BarChart2 } from "lucide-react"

export default function SessionEnded({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/sessions/${id}`)
      .then((r) => r.json())
      .then(setSession)
      .catch(console.error)
  }, [id])

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6 text-center">
      <Card className="max-w-md w-full p-10 border-none shadow-2xl bg-white dark:bg-zinc-900 rounded-3xl">
        <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-full text-green-600">
                <CheckCircle2 className="w-12 h-12" />
            </div>
        </div>
        
        <h1 className="text-3xl font-black text-zinc-900 dark:text-white mb-2 uppercase tracking-tighter">Session Ended</h1>
        <p className="text-zinc-500 mb-8">
            Thank you for participating! The live Q&A for <span className="font-bold text-zinc-900 dark:text-zinc-100 italic">"{session?.title || "this session"}"</span> has now concluded.
        </p>

        <div className="grid gap-3">
             <Link href="/">
                <Button className="w-full bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 h-12 rounded-xl text-md font-bold">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                </Button>
             </Link>
             
             {/* If the user is the owner, show analytics link. In a real app, we'd check auth here. */}
             <Link href={`/session/${id}/analytics`}>
                <Button variant="outline" className="w-full h-12 rounded-xl text-md font-medium">
                    <BarChart2 className="w-4 h-4 mr-2" />
                    View Detailed Analytics
                </Button>
             </Link>
        </div>
      </Card>
    </div>
  )
}
