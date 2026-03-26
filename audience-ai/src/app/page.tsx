"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Show, SignInButton, UserButton } from "@clerk/nextjs"
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Shield, 
  BarChart3, 
  Users, 
  ChevronRight,
  MessageSquare,
  Brain,
  Activity,
  Globe,
  Lock,
  Download,
  Star,
  CheckCircle,
  ExternalLink,
  Layout,
  ThumbsUp
} from "lucide-react"
import Logo from "@/components/shared/Logo"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: Zap,
      title: "Real-time Q&A",
      description: "Instant question submission and upvoting. Keep your audience engaged without the awkward silence.",
      gradient: "from-blue-500/10 to-indigo-500/10",
      iconColor: "text-blue-500"
    },
    {
      icon: Brain,
      title: "AI Clustering",
      description: "Powered by Groq's Llama 3.3. Automatically group similar questions and discover trending topics.",
      gradient: "from-indigo-500/10 to-slate-500/10",
      iconColor: "text-indigo-500"
    },
    {
      icon: BarChart3,
      title: "Live Polls",
      description: "Create instant votes with 5 poll types. See results animate in real-time with beautiful visualizations.",
      gradient: "from-emerald-500/10 to-teal-500/10",
      iconColor: "text-emerald-500"
    },
    {
      icon: Users,
      title: "Scalable Rooms",
      description: "Support 10,000+ concurrent participants with WebSocket clustering and Redis-backed state management.",
      gradient: "from-orange-500/10 to-amber-500/10",
      iconColor: "text-orange-500"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "End-to-end encryption, SSO support, and role-based access control for your organization.",
      gradient: "from-slate-500/10 to-zinc-500/10",
      iconColor: "text-slate-500"
    },
    {
      icon: Activity,
      title: "Advanced Analytics",
      description: "Track engagement metrics, export reports, and get AI-powered insights after every session.",
      gradient: "from-cyan-500/10 to-blue-500/10",
      iconColor: "text-cyan-500"
    }
  ]

  const stats = [
    { value: "10K+", label: "Concurrent Users", icon: Users },
    { value: "<50ms", label: "Real-time Latency", icon: Zap },
    { value: "99.9%", label: "Uptime SLA", icon: Shield },
    { value: "5M+", label: "Questions Processed", icon: MessageSquare }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager at TechCorp",
      content: "AudienceAI transformed our all-hands meetings. The AI clustering feature alone saved us hours of manual question sorting.",
      avatar: "SC",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Lead Engineer at ScaleUp",
      content: "Handled 5,000+ concurrent users without breaking a sweat. The real-time polling is incredibly smooth.",
      avatar: "MR",
      rating: 5
    },
    {
      name: "Dr. Emily Watson",
      role: "Professor, Stanford University",
      content: "My students love the anonymous Q&A. Engagement increased by 300% compared to traditional methods.",
      avatar: "EW",
      rating: 5
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans selection:bg-blue-500/30">
      {/* Dynamic Background with elegant grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 dark:opacity-20 animate-pulse" style={{ background: 'radial-gradient(ellipse at top, rgba(37, 99, 235, 0.4) 0%, transparent 60%)' }} />
      </div>

      {/* Header */}
      <header className="px-6 lg:px-12 h-20 flex items-center border-b border-white/20 dark:border-white/5 sticky top-0 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl z-50">
        <Logo />
        <nav className="ml-auto flex gap-4 sm:gap-8 items-center">
          <Link className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hidden md:block" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hidden md:block" href="#pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hidden md:block" href="#docs">
            Docs
          </Link>
          <Show when="signed-in">
            <Link className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="/dashboard">
              Dashboard
            </Link>
            <div className="hidden md:flex">
              <ThemeToggle />
            </div>
            <UserButton />
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost" className="text-sm font-medium text-slate-600 dark:text-slate-300">Sign In</Button>
            </SignInButton>
            <div className="hidden md:flex">
              <ThemeToggle />
            </div>
            <Link href="/dashboard">
              <Button className="bg-blue-600 text-white font-medium px-6 rounded-full shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:bg-blue-700 transition-all border border-blue-500/50">
                Get Started Free
              </Button>
            </Link>
          </Show>
        </nav>
      </header>
      
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative w-full pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center space-y-8 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-zinc-900/80 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4 backdrop-blur-md border border-slate-200/60 dark:border-zinc-800 shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span>Powered by Groq Llama 3.3 — 300x Faster Inference</span>
              </div>
              
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-slate-900 dark:text-white max-w-5xl">
                Run Smarter{" "}
                <span className="relative whitespace-nowrap">
                  <span className="relative z-10 text-blue-600 dark:text-blue-500">Q&A Sessions.</span>
                  {/* Decorative underline */}
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-500/20 dark:bg-blue-500/30 rounded-full z-0 transform -rotate-1"></span>
                </span>
              </h1>
              
              <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl/relaxed lg:text-status-lg/relaxed dark:text-zinc-400">
                The complete audience engagement platform for presenters. Real-time Q&A, AI-powered clustering, and live polling — seamlessly integrated into your workflow.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-14 text-lg font-semibold rounded-full shadow-[0_0_40px_-10px_rgba(37,99,235,0.6)] border border-blue-500/50 group transition-all duration-300">
                    Start Presenting Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/join">
                  <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-900 dark:text-white group transition-all duration-300">
                    <Users className="mr-2 h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    Join a Session
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Glassmorphic Mockup UI */}
            <motion.div 
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="mt-20 mx-auto max-w-5xl perspective-1000"
            >
              <div className="relative rounded-2xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 overflow-hidden transform-gpu">
                {/* Mockup Header */}
                <div className="px-6 py-4 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-white/60 dark:bg-black/20">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-sm font-medium text-slate-500 dark:text-zinc-400 flex items-center gap-2">
                    <Lock className="w-3 h-3" /> app.audienceai.io/session/live
                  </div>
                  <div className="w-16" /> {/* Spacer */}
                </div>
                
                {/* Mockup Body */}
                <div className="p-8 grid md:grid-cols-3 gap-6">
                  {/* Left Col: Q&A */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Trending Questions</h3>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">Live</div>
                    </div>
                    
                    {/* Mock Question 1 */}
                    <div className="p-4 rounded-xl bg-white dark:bg-zinc-800 shadow-sm border border-slate-100 dark:border-zinc-700/50 flex gap-4">
                      <div className="flex flex-col items-center gap-1">
                        <button className="text-blue-600 dark:text-blue-500"><ThumbsUp className="w-5 h-5 fill-current" /></button>
                        <span className="font-bold text-slate-700 dark:text-slate-300">124</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">How do you manage state across 10k users?</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-medium">Anonymous</span> • <span>2 mins ago</span>
                        </div>
                      </div>
                    </div>

                    {/* Mock Question 2 */}
                    <div className="p-4 rounded-xl bg-white/60 dark:bg-zinc-800/60 border border-slate-100 dark:border-zinc-700/50 flex gap-4 relative overflow-hidden">
                      {/* AI Highlight subtle background */}
                      <div className="absolute top-0 right-0 p-2"><Sparkles className="w-4 h-4 text-amber-500" /></div>
                      <div className="flex flex-col items-center gap-1">
                        <button className="text-slate-400 hover:text-blue-600"><ThumbsUp className="w-5 h-5" /></button>
                        <span className="font-bold text-slate-700 dark:text-slate-300">89</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100 text-opacity-80">Are you planning to add Discord integration soon?</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-medium">Sarah T.</span> • <span>5 mins ago</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Col: AI Insights & Polls */}
                  <div className="space-y-6">
                     <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border border-indigo-100 dark:border-indigo-900/50">
                        <div className="flex items-center gap-2 mb-3">
                          <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                          <h4 className="font-bold text-indigo-900 dark:text-indigo-100">AI Summary</h4>
                        </div>
                        <p className="text-sm text-indigo-800/80 dark:text-indigo-200/80 leading-relaxed">
                          The audience is highly engaged with <strong>backend scalability</strong>. Consider addressing Redis clustering next.
                        </p>
                     </div>

                     <div className="p-5 rounded-xl bg-white dark:bg-zinc-800 shadow-sm border border-slate-100 dark:border-zinc-700/50">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Active Poll</h4>
                        <p className="text-sm font-medium mb-3">What's your primary tech stack?</p>
                        <div className="space-y-2">
                          <div className="relative h-8 rounded-md bg-slate-100 dark:bg-zinc-900 overflow-hidden">
                            <motion.div initial={{width: "0%"}} animate={{width: "65%"}} transition={{duration: 1, delay: 1}} className="absolute inset-y-0 left-0 bg-blue-500" />
                            <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-bold text-slate-800 dark:text-white mix-blend-difference">
                              <span>Next.js</span>
                              <span>65%</span>
                            </div>
                          </div>
                          <div className="relative h-8 rounded-md bg-slate-100 dark:bg-zinc-900 overflow-hidden">
                            <motion.div initial={{width: "0%"}} animate={{width: "35%"}} transition={{duration: 1, delay: 1.2}} className="absolute inset-y-0 left-0 bg-slate-400 dark:bg-slate-600" />
                            <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-bold text-slate-800 dark:text-white mix-blend-difference">
                              <span>Other</span>
                              <span>35%</span>
                            </div>
                          </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="border-y border-slate-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/30 backdrop-blur-md">
          <div className="container px-6 md:px-12 mx-auto py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <stat.icon className="w-6 h-6 mx-auto mb-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  <div className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-500 dark:text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-24 lg:py-32">
          <div className="container px-6 md:px-12 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                Everything you need to engage
              </h2>
              <p className="text-slate-600 dark:text-zinc-400 text-lg leading-relaxed">
                AudienceAI packs a powerful suite of tools designed to make every presentation interactive, memorable, and friction-free.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group relative p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className={`p-4 rounded-2xl w-fit mb-6 bg-gradient-to-br ${feature.gradient} border border-black/5 dark:border-white/5`}>
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                  <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className={`w-5 h-5 ${feature.iconColor}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-24 lg:py-32 bg-slate-50/50 dark:bg-zinc-900/20 border-t border-slate-200/50 dark:border-zinc-800/50">
          <div className="container px-6 md:px-12 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Simple, transparent pricing</h2>
              <p className="text-slate-600 dark:text-zinc-400 text-lg">Start for free, upgrade when your audience grows.</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto items-center">
              {/* Starter */}
              <div className="p-8 md:p-10 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm transition-transform hover:-translate-y-1 duration-300">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Starter</h3>
                <div className="text-5xl font-extrabold text-slate-900 dark:text-white mb-4">$0 <span className="text-lg font-medium text-slate-500">/mo</span></div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-[250px]">Perfect for small meetups and casual presenters.</p>
                <ul className="space-y-4 mb-10">
                  {[ "Up to 50 participants", "Unlimited Questions", "Basic Polls (Single Choice)", "AI Clustering (3/session)" ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full rounded-xl h-12 border-slate-200 dark:border-zinc-700 font-semibold hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-900 dark:text-white">Get Started</Button>
              </div>

              {/* Pro */}
              <div className="relative p-8 md:p-12 bg-white dark:bg-zinc-900 rounded-3xl border-2 border-blue-600 shadow-2xl shadow-blue-500/15 transform md:-translate-y-4 z-10 w-full overflow-hidden">
                <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute top-4 right-6 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Popular</div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Pro</h3>
                <div className="text-5xl font-extrabold text-slate-900 dark:text-white mb-4">$29 <span className="text-lg font-medium text-slate-500">/mo</span></div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-[250px]">Everything you need to engage large scale events and conferences.</p>
                <ul className="space-y-4 mb-10">
                  {[ "Up to 500 participants", "Advanced AI Insights", "All 5 Poll Types", "Custom Branding", "Export Analytics", "Priority Support" ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 font-semibold shadow-lg shadow-blue-500/25 transition-all">Upgrade Now</Button>
              </div>

              {/* Enterprise */}
              <div className="p-8 md:p-10 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm transition-transform hover:-translate-y-1 duration-300">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Enterprise</h3>
                <div className="text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Custom</div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-[250px]">Advanced security, unlimited scale, and premium support.</p>
                <ul className="space-y-4 mb-10">
                  {[ "Unlimited participants", "Single Sign-On (SSO)", "Dedicated Manager", "SLA & 99.9% Uptime", "Audit Logs", "Whitelabeling" ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-slate-800 dark:text-slate-400 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full rounded-xl h-12 border-slate-200 dark:border-zinc-700 font-semibold hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-900 dark:text-white">Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-24 mb-12">
          <div className="container px-6 md:px-12 mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-zinc-900 p-12 md:p-20 text-center border border-slate-800">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                  Ready to transform your presentations?
                </h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                  Join thousands of presenters who use AudienceAI to create deeply engaging, interactive sessions that audiences love.
                </p>
                <Link href="/dashboard">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 shadow-[0_0_30px_rgba(255,255,255,0.2)] font-bold px-10 h-14 rounded-full transition-all group">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 text-slate-500 group-hover:text-slate-900 transition-colors" />
                  </Button>
                </Link>
                <p className="mt-6 text-sm text-slate-500">No credit card required. Setup in 2 minutes.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 mt-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <Logo className="mb-4" />
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mt-4">
                The complete audience engagement platform for modern presenters. Focus on what matters, let AI handle the rest.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Demo</Link></li>
                <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-200 dark:border-zinc-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">© 2026 AudienceAI. All rights reserved. Built for presenters.</p>
            <div className="flex gap-6">
              <Link href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <ExternalLink className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Layout className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}