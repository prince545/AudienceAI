import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Show, SignInButton, UserButton } from "@clerk/nextjs"
import { ArrowRight, Sparkles, Zap, Shield, BarChart3, Users } from "lucide-react"
import Logo from "@/components/shared/Logo"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <header className="px-6 lg:px-12 h-20 flex items-center border-b border-zinc-100 dark:border-zinc-900 sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-50">
        <Logo />
        <nav className="ml-auto flex gap-4 sm:gap-8 items-center">
          <Show when="signed-in">
            <Link className="text-sm font-bold uppercase tracking-tighter hover:text-purple-600 transition-colors" href="/dashboard">
              Dashboard
            </Link>
            <UserButton />
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost" className="text-sm font-bold uppercase tracking-tighter">Login</Button>
            </SignInButton>
            <Link href="/dashboard">
              <Button className="bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 font-bold px-6 rounded-full">Get Started</Button>
            </Link>
          </Show>
        </nav>
      </header>
      
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-48 bg-zinc-50 dark:bg-zinc-950 overflow-hidden relative">
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4">
                    <Sparkles className="w-4 h-4" />
                    Powered by Groq AI
                </div>
                <h1 className="text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl/none uppercase italic">
                  Run Smarter <span className="text-purple-600">Q&A</span> Sessions.
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400 font-medium">
                  Experience real-time interaction, AI-powered question clustering, and live polling for your next big presentation.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-10 h-16 text-lg font-black uppercase tracking-tighter rounded-2xl shadow-2xl shadow-purple-500/40 group">
                    Start Presenting <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative background blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/10 blur-[150px] -z-10" />
        </section>

        <section className="w-full py-24 bg-white dark:bg-zinc-900">
          <div className="container px-6 md:px-12 mx-auto">
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl w-fit">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Real-time Q&A</h3>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                  Instant question submission and upvoting. Keep your audience engaged without the awkward silence.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl w-fit">
                  <Sparkles className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">AI Analysis</h3>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                  Powered by Llama 3.1. Automatically group similar questions and discover trending topics instantly.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl w-fit">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Live Polls</h3>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                  Create instant votes and see results live. Perfect for temperature checks and rapid feedback.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <Logo className="scale-75" />
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">© 2026 AudienceAI. Production Ready.</p>
            <div className="flex gap-8">
                <Link className="text-xs font-bold uppercase tracking-widest hover:text-purple-600" href="#">Terms</Link>
                <Link className="text-xs font-bold uppercase tracking-widest hover:text-purple-600" href="#">Privacy</Link>
            </div>
        </div>
      </footer>
    </div>
  )
}
