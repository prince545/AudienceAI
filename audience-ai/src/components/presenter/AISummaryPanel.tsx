"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AISummaryPanel({
  sessionId,
  onClose,
}: {
  sessionId: string
  onClose: () => void
}) {
  const [clusters, setClusters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/ai/cluster", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          console.error("AI Error:", data.error, data.details)
          setClusters([])
        } else {
          setClusters(data.clusters || [])
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error("Fetch Error:", err)
        setLoading(false)
      })
  }, [sessionId])

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">AI Question Summary</h2>
          <button onClick={onClose} className="text-gray-400 text-2xl hover:text-gray-600">&times;</button>
        </div>
        {loading ? (
          <p className="text-gray-500 text-center py-8">Analyzing questions with AI...</p>
        ) : clusters.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Not enough questions for AI analysis yet.</p>
        ) : (
          <div className="space-y-4">
            {clusters.map((cluster, i) => (
              <div key={i} className="border rounded-xl p-4 dark:border-zinc-800">
                <h3 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">{cluster.theme}</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mb-3 list-disc list-inside">
                  {cluster.questions.map((q: string, j: number) => (
                    <li key={j}>{q}</li>
                  ))}
                </ul>
                <p className="text-sm bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-200 rounded-lg p-3">
                  {cluster.smartAnswer}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
