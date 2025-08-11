import { Agent, tool } from '@openai/agents'
import { z } from 'zod'

function getBaseUrl(): string {
  return process.env.MOCK_API_BASE_URL || 'http://localhost:3001'
}

async function httpJson(method: string, path: string, body?: unknown): Promise<{ ok: boolean; status: number; text: string }> {
  const fetchFn: any = (globalThis as any).fetch
  const url = new URL(path, getBaseUrl()).toString()
  try {
    const resp = await fetchFn(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    try {
      const data = await resp.json()
      return { ok: !!resp.ok, status: Number(resp.status), text: typeof data === 'string' ? data : JSON.stringify(data) }
    } catch {
      const text = await resp.text()
      return { ok: !!resp.ok, status: Number(resp.status), text }
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return { ok: false, status: 0, text: `Falha na requisição: ${msg}` }
  }
}

const helloTool = tool({
  name: 'hello',
  description: 'Saúda o usuário',
  parameters: z.object({ name: z.string().min(1) }),
  execute: async ({ name }) => `Olá, ${name}! Ferramentas diretas no agente ativas.`,
})

const searchProfessionalsTool = tool({
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

const createProfessionalTool = tool({
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

const updateProfessionalTool = tool({
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

const deleteProfessionalTool = tool({
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

export async function createHandybookAgent() {
  const agent = new Agent({
    name: 'Handybook Agent (tools in-process)',
    instructions:
      'Você é um concierge. Use as ferramentas para buscar, criar, atualizar e remover profissionais conforme a intenção do usuário.',
    tools: [
      helloTool,
      searchProfessionalsTool,
      createProfessionalTool,
      updateProfessionalTool,
      deleteProfessionalTool,
    ],
  })
  return { agent }
}


