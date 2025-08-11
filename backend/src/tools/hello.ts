import { tool } from '@openai/agents'
import { helloParams } from './schemas'

export const helloTool = tool({
  name: 'hello',
  description: 'Saúda o usuário',
  parameters: helloParams,
  execute: async ({ name }) => `Olá, ${name}! Ferramentas diretas no agente ativas.`,
})


