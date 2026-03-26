export const projectData = {
  id: "audience-ai",
  title: "AudienceAI — Live Presentation Assistant",
  date: "Oct. 2025",
  description: "A live presentation platform featuring real-time anonymous Q&A, upvoting, and AI-powered question clustering to assist presenters.",
  techStack: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Shadcn/UI",
    "WebSockets",
    "Groq API",
    "PostgreSQL",
    "Prisma",
    "Redis",
    "Recoil"
  ],
  features: [
    "Built a live presentation platform where audiences join via QR code, submit anonymous questions, and upvote in real time via WebSockets.",
    "Integrated Groq AI to automatically cluster similar questions, generate smart answers, and surface the top unanswered queries to the presenter.",
    "Implemented a presenter dashboard with slide sync, live sentiment analysis of audience reactions, session recording with timestamped Q&A transcripts, and post-session AI summary export.",
    "Supported up to 1,000 concurrent audience members with Redis-backed session state."
  ],
  links: {
    live: "",   // Add your live project URL here
    github: ""  // Add your GitHub repository URL here
  }
};
