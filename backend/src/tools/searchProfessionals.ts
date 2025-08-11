import { tool } from '@openai/agents'
import { z } from 'zod'
import { httpJson } from './helpers'

export const searchProfessionalsTool = tool({
  name: 'search_professionals',
  description: 'Busca profissionais no mock-api filtrando por service, city, minRating, maxPrice e sort',
  parameters: z.object({
    service: z.enum(['beleza', 'mecânico', 'construção', 'limpeza', 'outro']).nullable(),
    city: z.string().nullable(),
    minRating: z.number().min(0).max(5).nullable(),
    maxPrice: z.number().min(0).nullable(),
    sort: z.enum(['relevance', 'price', 'rating']).nullable(),
  }),
  execute: async (args) => {
    const q = new URLSearchParams()
    const service = args.service ?? undefined
    const city = args.city ?? undefined
    const minRating = args.minRating ?? undefined
    const maxPrice = args.maxPrice ?? undefined
    const sort = args.sort ?? undefined
    if (service) q.set('service', service)
    if (city) q.set('city', city)
    if (typeof minRating === 'number') q.set('minRating', String(minRating))
    if (typeof maxPrice === 'number') q.set('maxPrice', String(maxPrice))
    if (sort) q.set('sort', sort)
    const url = `/professionals?${q.toString()}`
    const resp = await httpJson('GET', url)
    if (!resp.ok) return `Erro (${resp.status}): ${resp.text}`
    return resp.text
  },
})


