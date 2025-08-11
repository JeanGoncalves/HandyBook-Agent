import { tool } from '@openai/agents'
import { z } from 'zod'

export const helloTool = tool({
  name: 'hello',
  description: 'Saúda o usuário',
  parameters: z.object({ name: z.string().min(1) }),
  execute: async ({ name }) => `Olá, ${name}! Ferramentas diretas no agente ativas.`,
})


