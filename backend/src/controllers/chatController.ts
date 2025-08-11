import { Request, Response } from "express"
import { chatRequestSchema } from "../schemas/chat"
import { handleChat } from "../services/chatService"

export async function chatController(req: Request, res: Response) {
  // normalize legacy keys: { message, history } -> { messageText, messageHistory }
  const normalizedBody = {
    messageText: (req.body?.messageText ?? req.body?.message) as unknown,
    messageHistory: (req.body?.messageHistory ?? req.body?.history) as unknown,
  }

  const parsed = chatRequestSchema.safeParse(normalizedBody)
  if (!parsed.success) {
    return res.status(400).json({ message: "Payload inválido", errors: parsed.error.issues })
  }

  const { messageText, messageHistory = [] } = parsed.data

  try {
    const result = await handleChat(messageText, messageHistory)
    return res.json(result)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "unknown"
    return res.status(500).json({ message: "Erro no agente", error: errorMessage })
  }
}
