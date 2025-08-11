import { tool } from '@openai/agents'
import { searchProfessionalsParams } from './schemas'
import { buildQuery, requestJson } from './helpers'

export const searchProfessionalsTool = tool({
  name: 'search_professionals',
  description: 'Busca profissionais no mock-api filtrando por service, city, minRating, maxPrice e sort',
  parameters: searchProfessionalsParams,
  execute: async (args) => {
    const url = `/professionals${buildQuery({
      service: args.service ?? undefined,
      city: args.city ?? undefined,
      minRating: args.minRating ?? undefined,
      maxPrice: args.maxPrice ?? undefined,
      sort: args.sort ?? undefined,
    })}`
    const resp = await requestJson('GET', url)
    if (!resp.ok) return `Erro (${resp.status}): ${resp.text}`
    return resp.text
  },
})


