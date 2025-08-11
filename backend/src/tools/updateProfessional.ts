import { tool } from '@openai/agents'
import { z } from 'zod'
import { httpJson } from './helpers'

export const updateProfessionalTool = tool({
  name: 'update_professional',
  description: 'Atualiza um profissional por ID',
  parameters: z.object({
    id: z.number(),
    name: z.string().nullable(),
    services: z.array(z.enum(['beleza', 'mecânico', 'construção', 'limpeza', 'outro'])).nullable(),
    basePrice: z.number().nullable(),
    rating: z.number().nullable(),
    reviewCount: z.number().nullable(),
    location: z.object({ lat: z.number(), lng: z.number() }).nullable(),
    city: z.string().nullable(),
    workingHours: z.array(z.object({ day: z.string().nullable(), hours: z.string().nullable() })).nullable(),
    diary: z.array(z.object({ date: z.string().nullable(), time: z.string().nullable(), status: z.string().nullable() })).nullable(),
  }),
  execute: async (payload: any) => {
    const { id, ...rest } = payload || {}
    const resp = await httpJson('PUT', `/professionals/${id}`, rest)
    if (!resp.ok) {
      if (resp.status === 404) return 'Profissional não encontrado'
      return `Erro (${resp.status}): ${resp.text}`
    }
    return resp.text
  },
})


