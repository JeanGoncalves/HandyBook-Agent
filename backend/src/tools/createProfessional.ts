import { tool } from '@openai/agents'
import { z } from 'zod'
import { httpJson } from './helpers'

export const createProfessionalTool = tool({
  name: 'create_professional',
  description: 'Cria um novo profissional no mock-api',
  parameters: z.object({
    name: z.string(),
    services: z.array(z.enum(['beleza', 'mecânico', 'construção', 'limpeza', 'outro'])),
    basePrice: z.number(),
    rating: z.number().nullable(),
    reviewCount: z.number().nullable(),
    location: z.object({ lat: z.number(), lng: z.number() }),
    city: z.string(),
    workingHours: z.array(z.object({ day: z.string(), hours: z.string() })),
    diary: z.array(z.object({ date: z.string(), time: z.string(), status: z.string() })).nullable(),
  }),
  execute: async (payload) => {
    const resp = await httpJson('POST', '/professionals', payload)
    if (!resp.ok) return `Erro (${resp.status}): ${resp.text}`
    return resp.text
  },
})


