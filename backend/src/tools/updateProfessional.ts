import { tool } from '@openai/agents'
import { updateProfessionalParams } from './schemas'
import { requestJson } from './helpers'

export const updateProfessionalTool = tool({
  name: 'update_professional',
  description: 'Atualiza um profissional por ID',
  parameters: updateProfessionalParams,
  execute: async (payload: any) => {
    const { id, ...rest } = payload || {}
    const resp = await requestJson('PUT', `/professionals/${id}`, rest)
    if (!resp.ok) {
      if (resp.status === 404) return 'Profissional não encontrado'
      return `Erro (${resp.status}): ${resp.text}`
    }
    return resp.text
  },
})


