import { tool } from '@openai/agents'
import { createProfessionalParams } from './schemas'
import { requestJson } from './helpers'

export const createProfessionalTool = tool({
  name: 'create_professional',
  description: 'Cria um novo profissional no mock-api',
  parameters: createProfessionalParams,
  execute: async (payload) => {
    const resp = await requestJson('POST', '/professionals', payload)
    if (!resp.ok) return `Erro (${resp.status}): ${resp.text}`
    return resp.text
  },
})


