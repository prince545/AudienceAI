import React from 'react';

const AudienceAICard = () => {
  return (
    <div className="max-w-xl p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          AudienceAI — Live Presentation Assistant
        </h3>
        <span className="text-sm font-medium text-zinc-500 whitespace-nowrap">
          Oct. 2025
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          "Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", 
          "WebSockets", "Groq API", "PostgreSQL", "Prisma", 
          "Redis", "Recoil"
        ].map(tech => (
          <span 
            key={tech} 
            className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      <ul className="space-y-3 mt-4 text-sm text-zinc-600 dark:text-zinc-400 list-disc list-inside">
        <li>
          <span className="font-semibold text-zinc-800 dark:text-zinc-300">Live Interaction: </span> 
          Built a live presentation platform where audiences join via QR code, submit anonymous questions, and upvote in real time via WebSockets.
        </li>
        <li>
          <span className="font-semibold text-zinc-800 dark:text-zinc-300">Smart AI Integration: </span>
          Integrated Groq AI to automatically cluster similar questions, generate smart answers, and surface the top unanswered queries to the presenter.
        </li>
        <li>
          <span className="font-semibold text-zinc-800 dark:text-zinc-300">Comprehensive Dashboard: </span>
          Implemented a presenter dashboard with slide sync, live sentiment analysis of audience reactions, session recording with timestamped Q&A transcripts, and post-session AI summary export.
        </li>
        <li>
          <span className="font-semibold text-zinc-800 dark:text-zinc-300">Scalable Architecture: </span>
          Supported up to 1,000 concurrent audience members with Redis-backed session state.
        </li>
      </ul>
      
      <div className="mt-6 flex gap-4">
        {/* Replace # with actual links when ready */}
        <a 
          href="#" 
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          View Project
        </a>
        <a 
          href="#" 
          className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
        >
          GitHub Repo
        </a>
      </div>
    </div>
  );
};

export default AudienceAICard;
