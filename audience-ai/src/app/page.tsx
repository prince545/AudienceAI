"use client"

import Link from "next/link"
import { Show, SignInButton, UserButton } from "@clerk/nextjs"
import {
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Users,
  MessageSquare,
  Brain,
  Activity,
  Globe,
  Lock,
  Star,
  CheckCircle,
  ExternalLink,
  Layout,
  ChevronUp,
  Mic,
  Radio,
} from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { useEffect, useState, useRef } from "react"

/* ─────────────────────────────────────────────
   Animated counter (IntersectionObserver)
───────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        let start = 0
        const step = Math.ceil(to / 60)
        const timer = setInterval(() => {
          start = Math.min(start + step, to)
          setCount(start)
          if (start >= to) clearInterval(timer)
        }, 16)
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [to])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

/* ─────────────────────────────────────────────
   Marquee strip
───────────────────────────────────────────── */
function Marquee() {
  const items = [
    "10,000+ Concurrent Users",
    "AI Clustering",
    "Live Polls",
    "Real-time Q&A",
    "Enterprise SSO",
    "Sub-50ms Latency",
    "99.9% Uptime",
    "Groq Llama 3.3",
  ]
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-border/50 bg-muted/30 backdrop-blur-sm py-4">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-muted-foreground"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Audience wave SVG decoration
───────────────────────────────────────────── */
function AudienceWave() {
  return (
    <svg viewBox="0 0 600 120" className="w-full opacity-20 dark:opacity-30" fill="none">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <motion.rect
          key={i}
          x={i * 68 + 8}
          width={52}
          rx={6}
          fill="url(#barGrad)"
          initial={{ height: 20, y: 100 }}
          animate={{
            height: [20, Math.random() * 80 + 20, 20],
            y: [100, 100 - (Math.random() * 80 + 20), 100],
          }}
          transition={{
            duration: 2 + Math.random() * 1.5,
            repeat: Infinity,
            repeatType: "mirror",
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.6 0.22 260)" />
          <stop offset="100%" stopColor="oklch(0.7 0.25 285)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */
export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -60])

  const features = [
    {
      icon: Zap,
      label: "01",
      title: "Real-time Q&A",
      description: "Zero-lag question submission, upvoting, and moderation. WebSocket-powered live updates keep everyone in sync.",
      accentClass: "text-primary",
      bgClass: "bg-primary/5 border-primary/15",
      iconBg: "bg-primary/10",
    },
    {
      icon: Brain,
      label: "02",
      title: "AI Clustering",
      description: "Groq Llama 3.3 at 300×+ speed. Duplicate questions auto-merge. Topics surface organically.",
      accentClass: "text-accent",
      bgClass: "bg-accent/5 border-accent/15",
      iconBg: "bg-accent/10",
    },
    {
      icon: BarChart3,
      label: "03",
      title: "Live Polls",
      description: "Five poll types. Results animate in real-time. Word clouds, rankings, ratings — all built in.",
      accentClass: "text-emerald-500",
      bgClass: "bg-emerald-500/5 border-emerald-500/15",
      iconBg: "bg-emerald-500/10",
    },
    {
      icon: Users,
      label: "04",
      title: "Massive Scale",
      description: "Redis-backed state, WebSocket clustering. 10K+ concurrent attendees with zero performance drop.",
      accentClass: "text-orange-500",
      bgClass: "bg-orange-500/5 border-orange-500/15",
      iconBg: "bg-orange-500/10",
    },
    {
      icon: Shield,
      label: "05",
      title: "Enterprise Security",
      description: "SSO, RBAC, end-to-end encryption, and audit logs for compliance-heavy teams.",
      accentClass: "text-violet-500",
      bgClass: "bg-violet-500/5 border-violet-500/15",
      iconBg: "bg-violet-500/10",
    },
    {
      icon: Activity,
      label: "06",
      title: "Deep Analytics",
      description: "Session heatmaps, engagement curves, exportable CSVs, and AI-written post-event reports.",
      accentClass: "text-cyan-500",
      bgClass: "bg-cyan-500/5 border-cyan-500/15",
      iconBg: "bg-cyan-500/10",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "PM · TechCorp",
      content: "The AI clustering saved us hours of question-sorting at our last all-hands. Audience loved the live polls.",
      initials: "SC",
      colorClass: "bg-primary/10 text-primary ring-1 ring-primary/20",
    },
    {
      name: "Michael Rodriguez",
      role: "Lead Eng · ScaleUp",
      content: "5,000 concurrent users, zero hiccups. Polling is buttery smooth. We've tried everything — this wins.",
      initials: "MR",
      colorClass: "bg-accent/10 text-accent ring-1 ring-accent/20",
    },
    {
      name: "Dr. Emily Watson",
      role: "Professor · Stanford",
      content: "Anonymous Q&A completely changed classroom dynamics. Engagement up 300% in one semester.",
      initials: "EW",
      colorClass: "bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20",
    },
  ]

  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "/mo",
      desc: "For small meetups and solo presenters.",
      items: ["50 participants", "Unlimited questions", "Basic single-choice polls", "3 AI clusters/session"],
      cta: "Start Free",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/mo",
      desc: "Everything for large events and conferences.",
      items: ["500 participants", "Advanced AI insights", "All 5 poll types", "Custom branding", "Export analytics", "Priority support"],
      cta: "Upgrade Now",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "Unlimited scale, premium security.",
      items: ["Unlimited participants", "Single Sign-On (SSO)", "Dedicated manager", "99.9% SLA", "Audit logs", "Whitelabeling"],
      cta: "Contact Sales",
      highlight: false,
    },
  ]

  return (
    <div className="noise flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=DM+Serif+Display:ital@0;1&display=swap');

        body { font-family: 'DM Sans', system-ui, sans-serif; }
        .serif { font-family: 'DM Serif Display', Georgia, serif; }

        /* Uses --primary from design system */
        .text-gradient-brand {
          background: linear-gradient(135deg, var(--foreground) 20%, oklch(0.6 0.22 260) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Uses mesh-gradient utility from globals.css */
        .hero-ambient {
          background:
            radial-gradient(ellipse 80% 50% at 50% -5%, oklch(0.6 0.22 260 / 0.15) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 15%, oklch(0.7 0.25 285 / 0.10) 0%, transparent 60%);
        }

        .grid-dots {
          background-image:
            linear-gradient(oklch(0.5 0 0 / 0.04) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.5 0 0 / 0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .card-lift {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
        }
        .card-lift:hover {
          transform: translateY(-5px);
          box-shadow: var(--glass-glow), 0 20px 50px -15px oklch(0 0 0 / 0.25);
        }

        /* Primary button — uses --primary token */
        .btn-primary {
          background: var(--primary);
          color: var(--primary-foreground);
          box-shadow: 0 4px 24px -6px oklch(0.55 0.22 260 / 0.5);
          transition: box-shadow 0.25s ease, transform 0.25s ease, filter 0.2s ease;
        }
        .btn-primary:hover {
          filter: brightness(1.1);
          box-shadow: 0 8px 32px -6px oklch(0.55 0.22 260 / 0.65);
          transform: translateY(-2px);
        }

        /* Ghost button — uses glass utility */
        .btn-ghost {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(12px);
          transition: background 0.2s ease;
        }
        .btn-ghost:hover { background: oklch(0.5 0 0 / 0.08); }

        /* Pro plan glow — uses --primary */
        .plan-pro {
          box-shadow: var(--glass-glow), 0 32px 64px -20px oklch(0 0 0 / 0.3);
          border: 1.5px solid oklch(0.6 0.22 260 / 0.3);
        }

        /* Feature card accent bar */
        .feature-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          width: 0;
          background: var(--primary);
          transition: width 0.45s ease;
          opacity: 0.7;
        }
        .feature-wrap:hover .feature-bar { width: 100%; }
      `}</style>

      {/* ════════════════ HEADER ════════════════ */}
      <header className="px-6 lg:px-14 h-[72px] flex items-center border-b border-border/50 sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-primary transition-transform group-hover:scale-105">
            <Mic className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold tracking-tight text-lg">AudienceAI</span>
        </Link>

        <nav className="ml-auto flex items-center gap-2 sm:gap-6">
          {["Features", "Pricing", "Docs"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block"
            >
              {item}
            </Link>
          ))}
          <Show when="signed-in">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <ThemeToggle />
            <UserButton />
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block">
                Sign In
              </button>
            </SignInButton>
            <ThemeToggle />
            <Link href="/dashboard">
              <button className="btn-primary text-sm font-semibold px-5 py-2.5 rounded-full">
                Get Started
              </button>
            </Link>
          </Show>
        </nav>
      </header>

      <main className="flex-1">

        {/* ════════════════ HERO ════════════════ */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden grid-dots"
        >
          <div className="hero-ambient absolute inset-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />

          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 max-w-5xl mx-auto">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 mb-10"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              Powered by Groq Llama 3.3 · 300× faster inference
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="serif font-bold leading-[1.06] tracking-tight mb-8"
              style={{ fontSize: "clamp(2.8rem,8vw,6.5rem)" }}
            >
              <span className="text-foreground">Presentations</span>
              <br />
              <span className="text-gradient-brand">audiences remember.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
            >
              Real-time Q&A, AI-clustered questions, and live polls — seamlessly woven into every session.
              Built for presenters who demand more.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/dashboard">
                <button className="btn-primary font-bold px-8 h-14 rounded-full text-base flex items-center gap-2 group">
                  Start Presenting Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/join">
                <button className="btn-ghost text-foreground font-medium px-8 h-14 rounded-full text-base flex items-center gap-2 group">
                  <Users className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  Join a Session
                </button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-xs text-muted-foreground/60"
            >
              Trusted by 2,000+ presenters · No credit card · 2 min setup
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative z-10 w-full max-w-lg mx-auto mt-16"
          >
            <AudienceWave />
          </motion.div>
        </section>

        {/* ════════════════ MARQUEE ════════════════ */}
        <Marquee />

        {/* ════════════════ LIVE MOCKUP ════════════════ */}
        <section className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass rounded-3xl overflow-hidden"
            >
              {/* Chrome */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-muted/20">
                <div className="flex gap-2">
                  {["oklch(0.6 0.2 25)", "oklch(0.75 0.18 80)", "oklch(0.65 0.2 145)"].map((c, i) => (
                    <div key={i} className="w-3 h-3 rounded-full opacity-70" style={{ background: c }} />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <Lock className="w-3 h-3" />
                  app.audienceai.io/session/live
                </div>
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Body */}
              <div className="p-8 grid md:grid-cols-3 gap-6">
                {/* Q&A */}
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold text-foreground">Trending Questions</h3>
                    <span className="text-xs text-muted-foreground">248 participants · 34 questions</span>
                  </div>
                  {[
                    { votes: 124, q: "How do you manage shared state across 10K users?", user: "Anonymous", ago: "2m ago", active: true },
                    { votes: 89, q: "Are you planning to add Discord integration soon?", user: "Sarah T.", ago: "5m ago", active: false },
                    { votes: 55, q: "What's the strategy for handling network partition?", user: "Alex M.", ago: "8m ago", active: false },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      className={`flex gap-4 p-4 rounded-xl border transition-all ${item.active
                        ? "bg-primary/5 border-primary/20"
                        : "bg-card border-border hover:bg-muted/20"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1 min-w-[36px]">
                        <ChevronUp className={`w-4 h-4 ${item.active ? "text-primary" : "text-muted-foreground"}`} />
                        <span className={`text-sm font-bold ${item.active ? "text-primary" : "text-muted-foreground"}`}>
                          {item.votes}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-card-foreground font-medium leading-snug">{item.q}</p>
                        <p className="text-xs text-muted-foreground mt-1.5">{item.user} · {item.ago}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  <div className="p-5 rounded-xl border bg-accent/5 border-accent/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-4 h-4 text-accent" />
                      <span className="text-xs font-bold uppercase tracking-widest text-accent">AI Insight</span>
                    </div>
                    <p className="text-sm text-card-foreground/70 leading-relaxed">
                      Your audience is focused on{" "}
                      <strong className="text-card-foreground">backend scalability</strong>.
                      Address Redis clustering next — 3 similar questions clustered.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl border bg-card border-border">
                    <h4 className="text-sm font-semibold text-card-foreground mb-3">Active Poll</h4>
                    <p className="text-xs text-muted-foreground mb-4">Primary tech stack?</p>
                    {[
                      { label: "Next.js", pct: 65, color: "oklch(0.55 0.22 260)" },
                      { label: "Remix", pct: 20, color: "oklch(0.7 0.25 285)" },
                      { label: "Other", pct: 15, color: "oklch(0.5 0.02 260)" },
                    ].map((bar, i) => (
                      <div key={i} className="mb-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>{bar.label}</span><span>{bar.pct}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${bar.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                            className="h-full rounded-full"
                            style={{ background: bar.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[{ val: "94%", label: "Satisfaction" }, { val: "12m", label: "Avg. Engage" }].map((s, i) => (
                      <div key={i} className="p-3 rounded-xl border border-border bg-muted/30 text-center">
                        <div className="text-xl font-bold text-card-foreground">{s.val}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════ STATS ════════════════ */}
        <section className="py-20 px-6 border-y border-border/50 bg-muted/10">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { val: 10000, suffix: "+", label: "Concurrent users", icon: Users },
              { val: 50, suffix: "ms", label: "Real-time latency", icon: Zap },
              { val: 99, suffix: ".9%", label: "Uptime SLA", icon: Shield },
              { val: 5000000, suffix: "+", label: "Questions processed", icon: MessageSquare },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <s.icon className="w-5 h-5 mx-auto mb-4 text-muted-foreground/40" />
                <div className="serif text-4xl md:text-5xl text-foreground mb-2 tracking-tight">
                  <Counter to={s.val} suffix={s.suffix} />
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ════════════════ FEATURES ════════════════ */}
        <section id="features" className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-20">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Features</p>
              <h2 className="serif font-bold text-foreground leading-tight mb-6" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
                Every tool you need,<br />nothing you don't.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Built for conference stages, corporate all-hands, and university lectures alike.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  onMouseEnter={() => setHoveredFeature(i)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`feature-wrap card-lift relative overflow-hidden rounded-2xl border p-8 bg-card ${f.bgClass}`}
                >
                  <span className="absolute top-6 right-6 text-xs font-mono text-muted-foreground/25">{f.label}</span>

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${f.iconBg}`}>
                    <f.icon className={`w-5 h-5 ${f.accentClass}`} />
                  </div>

                  <h3 className="font-bold text-card-foreground text-lg mb-3 tracking-tight">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                  <div className="feature-bar" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ TESTIMONIALS ════════════════ */}
        <section className="py-28 px-6 border-t border-border/50 bg-muted/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Testimonials</p>
              <h2 className="serif font-bold text-foreground" style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>
                Presenters love it.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-lift p-8 rounded-2xl border border-border bg-card"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current text-amber-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${t.colorClass}`}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-card-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ PRICING ════════════════ */}
        <section id="pricing" className="py-28 px-6 border-t border-border/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Pricing</p>
              <h2 className="serif font-bold text-foreground mb-4" style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>
                Simple, honest pricing.
              </h2>
              <p className="text-muted-foreground">Start free. Upgrade when you need it.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 items-center">
              {plans.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`card-lift rounded-3xl p-8 md:p-10 relative overflow-hidden ${
                    plan.highlight ? "plan-pro bg-card md:-translate-y-4" : "border border-border bg-card"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute top-6 right-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-primary bg-primary/10 border border-primary/20">
                        Popular
                      </span>
                    </div>
                  )}

                  <h3 className="font-bold text-card-foreground text-lg mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="serif text-5xl text-foreground tracking-tight">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-8">{plan.desc}</p>

                  <ul className="space-y-3 mb-10">
                    {plan.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-primary" : "text-muted-foreground/50"}`} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                      plan.highlight
                        ? "btn-primary"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ CTA BANNER ════════════════ */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mesh-gradient relative rounded-3xl overflow-hidden p-12 md:p-20 text-center glass"
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top, oklch(0.6 0.22 260 / 0.15) 0%, transparent 70%)" }}
              />
              <div className="relative z-10">
                <h2 className="serif font-bold text-foreground mb-6 leading-tight" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
                  Ready to transform<br />your presentations?
                </h2>
                <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                  Join thousands of presenters who run smarter, more memorable sessions with AudienceAI.
                </p>
                <Link href="/dashboard">
                  <button className="btn-primary font-bold px-10 h-14 rounded-full text-base flex items-center gap-2 group mx-auto">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <p className="mt-6 text-xs text-muted-foreground/50">No credit card required · Setup in 2 minutes</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="border-t border-border/50 py-16 px-6 bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-5 w-fit group">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-primary transition-transform group-hover:scale-105">
                  <Mic className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold tracking-tight">AudienceAI</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                The complete audience engagement platform for modern presenters. Focus on what matters — let AI handle the rest.
              </p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Demo", "Changelog"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Legal", links: ["Terms", "Privacy", "Security"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50 mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border/50">
            <p className="text-xs text-muted-foreground/50">© 2026 AudienceAI. All rights reserved.</p>
            <div className="flex gap-5">
              {[Globe, ExternalLink, Layout].map((Icon, i) => (
                <Link key={i} href="#" className="text-muted-foreground/40 hover:text-muted-foreground transition-colors">
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}