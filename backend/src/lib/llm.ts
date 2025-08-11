import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { googleApiKey } from "../config/env"
import { SystemMessage, HumanMessage, AIMessage, BaseMessage } from "@langchain/core/messages"

export function createGeminiModel() {
  if (!googleApiKey) return null

  return new ChatGoogleGenerativeAI({
    apiKey: googleApiKey,
    model: "gemini-2.0-flash-001",
    temperature: 0.3,
  })
}

export function buildMessages(systemInstruction: string, history: Array<{ role: "user" | "assistant"; content: string }>, latestUserText: string): BaseMessage[] {
  const messages: BaseMessage[] = [new SystemMessage(systemInstruction)]

  for (const item of history) {
    messages.push(item.role === "user" ? new HumanMessage(item.content) : new AIMessage(item.content))
  }
  
  const last = history[history.length - 1]

  if (!(last && last.role === "user" && last.content === latestUserText)) {
    messages.push(new HumanMessage(latestUserText))
  }

  return messages
}

export function extractReplyText(modelResponse: unknown): string {
  const content = (modelResponse as any)?.content
  
  if (typeof content === "string") return content

  if (Array.isArray(content)) {
    return content
      .map((piece: any) => (typeof piece === "string" ? piece : piece?.text))
      .filter((t: any) => Boolean(t))
      .join(" ")
  }

  return String(content ?? "")
}
