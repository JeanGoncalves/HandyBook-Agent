import { createGeminiModel, buildMessages, extractReplyText } from "../lib/llm"

const SYSTEM_PROMPT = "Você é um concierge de serviços (HandyBook). Responda de forma curta, útil e educada."

export async function handleChat(messageText: string, messageHistory: Array<{ role: "user" | "assistant"; content: string }> = []) {
  const model = createGeminiModel()

  if (!model) {
    return {
      reply: `Simulado: você disse "${messageText}". Configure GOOGLE_API_KEY para usar Gemini via LangChain.`,
    }
  }

  const messages = buildMessages(SYSTEM_PROMPT, messageHistory, messageText)
  const modelResponse = await model.invoke(messages)
  const reply = extractReplyText(modelResponse) || "Desculpe, não consegui responder agora."

  return { reply }
}
