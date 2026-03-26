<div align="center">

<img src="./public/assets/landing_page_demo.webp" alt="AudienceAI Landing Page Demo" width="100%" style="border-radius: 12px;" />

# 🎙️ AudienceAI

**Transform Ordinary Presentations into Interactive Experiences. Live.**

[Features](#-features) • [Screenshots](#-premium-interfaces) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Deployment](#-deployment)

</div>

---

## 🚀 Overview

**AudienceAI** is a premium, real-time presentation companion built for the modern speaker. Forget clunky, outdated Q&A panels. AudienceAI provides presenters and audiences with stunning, glassmorphic interfaces that make interaction seamless, engaging, and gorgeous. 

Participants simply scan a generated QR code from their phones to ask questions and vote on live polls instantly. The presenter receives real-time inputs natively on their dashboard, complete with **Llama 3.3 AI Intelligence** to automatically cluster similar questions and suggest smart answers on the fly.

---

## ✨ Features

- **Real-Time Synchronisation**: Uses WebSockets (`Socket.IO`) to deliver questions and poll votes globally with sub-second latency.
- **Llama-Powered AI Summaries**: Presenters can analyze incoming audience questions, group common themes, and get AI-generated speaking notes in real-time.
- **Glassmorphic UI Engine**: Heavily customized Tailwind CSS implementation featuring gorgeous `slate/zinc`-based themes, floating layered cards, blurred headers, and `framer-motion` spring animations.
- **Live Polling**: Presenters can deploy multi-option polls and watch the progress bars dynamically fill up with beautiful spring animations as audiences vote live.
- **Anonymous Upvoting**: Audiences can prioritize questions natively without needing to create accounts.
- **Secure Authentication**: Built-in Clerk Auth ensures seamless speaker dashboard management, while keeping audience entry frictionless.

---

## 📸 Premium Interfaces

### The Audience View
A frictionless mobile-first experience. Beautifully layered floating inputs and native-feeling interactions ensure the audience isn't distracted by bad software.
<div align="center">
  <img src="./public/assets/audience_view.png" alt="Audience View" width="80%" style="border-radius: 12px; border: 1px solid #333;" />
</div>

<br/>

### The Presenter Command Center
A desktop-first, highly functional dashboard. Live polls display deep graphical physics while managing thousands of incoming votes.
<div align="center">
  <img src="./public/assets/presenter_poll.png" alt="Presenter Dashboard" width="80%" style="border-radius: 12px; border: 1px solid #333;" />
</div>

---

## 🛠 Tech Stack

**AudienceAI** uses a hyper-modern edge computing stack to deliver a state-of-the-art experience:

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Real-Time**: [Socket.IO](https://socket.io/) (Custom Node Server backing Next.js)
- **Authentication**: [Clerk](https://clerk.com/)
- **AI Integration**: [Groq API](https://groq.com/) running Llama-3.3-70B
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/audience-ai.git
cd audience-ai
npm install
```

### 2. Environment Variables
Create a `.env` file at the root of the project with the following keys:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database (Postgres)
DATABASE_URL="postgresql://user:password@localhost:5432/audienceai"

# Groq AI
GROQ_API_KEY=gsk_...
```

### 3. Database Setup
```bash
npx prisma generate
npx prisma db push
```

### 4. Run the Development Environment
AudienceAI uses a custom server setup to simultaneously run Next.js and Socket.IO.
```bash
npm run dev
```
Navigate to `http://localhost:3000` to see the landing page!

---

## 🎨 Design Philosophy

AudienceAI explicitly moves away from "AI-generated" generic aesthetics (e.g. flat purple/pink linear gradients with low contrast). Instead, the app defines a high-end corporate standard:
- **Depth & Dimension**: Uses soft shadows, layered opacities (`/50`, `/20`), and `backdrop-blur-xl` to mimic glass interfaces.
- **Typography & Tracking**: Capitalized, widely tracked `tracking-widest` labels denote metadata, paired with extremely heavy `font-extrabold` active states to clearly guide the eye.
- **Kinetic Motion**: All inputs, polls, and active states react to hovering with soft spring translations via Framer Motion.  

---

<div align="center">
  <p>Built with ❤️ by You.</p>
</div>
