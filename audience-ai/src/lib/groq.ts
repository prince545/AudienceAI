import Groq from "groq-sdk"

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

export async function clusterQuestions(questions: string[]): Promise<{
  clusters: Array<{
    theme: string
    questions: string[]
    smartAnswer: string
  }>
}> {
  const prompt = `You are analyzing audience questions from a live presentation.

Here are the questions:
${questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}

Group these into clusters of similar questions. For each cluster:
1. Give a short theme (5 words max)
2. List which questions belong to it
3. Write a concise smart answer (2-3 sentences) the presenter can use

Respond ONLY with valid JSON in this exact format:
{
  "clusters": [
    {
      "theme": "string",
      "questions": ["question text", ...],
      "smartAnswer": "string"
    }
  ]
}`

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    response_format: { type: "json_object" },
  })

  const content = response.choices[0].message.content!
  return JSON.parse(content)
}
