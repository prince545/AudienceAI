"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { 
  ArrowRight, 
  Key, 
  Users,
  Sparkles
} from "lucide-react"
import Logo from "@/components/shared/Logo"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { motion } from "framer-motion"

export default function JoinManualPage() {
  const [code, setCode] = useState("")
  const router = useRouter()

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.trim().length >= 4) {
      router.push(`/join/${code.trim().toUpperCase()}`)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/30 relative overflow-hidden flex flex-col">
      {/* Premium Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4" />
      </div>

      <header className="px-6 lg:px-12 h-20 flex items-center border-b border-white/20 dark:border-white/5 bg-white/70 dark:bg-[#030712]/70 sticky top-0 z-40 backdrop-blur-xl">
        <Logo />
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
        >
            <Card className="p-8 md:p-10 border-none shadow-2xl shadow-blue-500/10 dark:shadow-none bg-white/80 dark:bg-[#0f111a]/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 dark:border-slate-800/50">
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl mb-6">
                        <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight mb-2">Join a Session</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                        Enter the 6-digit code provided by your presenter to participate.
                    </p>
                </div>

                <form onSubmit={handleJoin} className="space-y-6">
                    <div className="relative group">
                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <Input 
                            placeholder="ENTER CODE" 
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            className="pl-12 h-16 bg-slate-100/50 dark:bg-black/20 border-slate-200 dark:border-slate-800 rounded-2xl text-xl font-bold tracking-[0.3em] text-center focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:tracking-normal placeholder:font-medium placeholder:text-sm"
                            maxLength={10}
                        />
                    </div>
                    
                    <Button 
                        type="submit"
                        disabled={code.trim().length < 4}
                        className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        Join Room
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </form>

                <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800/50 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 ring-1 ring-amber-500/20">
                        <Sparkles className="w-3 h-3" />
                        Quick Tip
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        Codes are usually 6 characters long and look like <span className="font-bold text-slate-700 dark:text-slate-200">ABCD12</span>. Ask your presenter for the code or scan their QR code.
                    </p>
                </div>
            </Card>
        </motion.div>
      </main>

      <footer className="p-8 text-center text-slate-400 text-xs font-medium">
        &copy; 2026 AudienceAI. Real-time engagement platform.
      </footer>
    </div>
  )
}
