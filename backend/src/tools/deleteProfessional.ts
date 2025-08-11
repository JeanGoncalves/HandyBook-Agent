import { tool } from '@openai/agents'
import { z } from 'zod'
import { getBaseUrl } from './helpers'

export const deleteProfessionalTool = tool({
  name: 'delete_professional',
  description: 'Remove um profissional por ID',
  parameters: z.object({ id: z.number() }),
  execute: async ({ id }) => {
    const fetchFn: any = (globalThis as any).fetch
    const url = new URL(`/professionals/${id}`, getBaseUrl()).toString()
    try {
      const resp = await fetchFn(url, { method: 'DELETE' })
      if (resp.status === 204) return 'OK'
      const text = await resp.text()
      return text
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      return `Falha na requisição: ${msg}`
    }
  },
})


