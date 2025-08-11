import { z } from "zod"

export const chatRequestSchema = z.object({
  messageText: z.string().min(1, "Mensagem obrigatória"),
  messageHistory: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() }))
    .optional(),
})

export type ChatRequest = z.infer<typeof chatRequestSchema>
