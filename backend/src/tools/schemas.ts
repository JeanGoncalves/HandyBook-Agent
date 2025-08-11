import { z } from 'zod'

export const helloParams = z.object({ name: z.string().min(1) })

export const professionalServices = z.enum(['beleza', 'mecânico', 'construção', 'limpeza', 'outro'])

export const searchProfessionalsParams = z.object({
  service: professionalServices.nullable(),
  city: z.string().nullable(),
  minRating: z.number().min(0).max(5).nullable(),
  maxPrice: z.number().min(0).nullable(),
  sort: z.enum(['relevance', 'price', 'rating']).nullable(),
})

export const createProfessionalParams = z.object({
  name: z.string().describe('Nome do profissional'),
  services: z.array(professionalServices),
  basePrice: z.number().describe('Preço base do profissional'),
  rating: z.number().describe('Avaliação do profissional'),
  reviewCount: z.number().describe('Quantidade de avaliações do profissional'),
  location: z.object({ lat: z.number(), lng: z.number() }).describe('Localização do profissional'),
  city: z.string().describe('Cidade do profissional'),
  workingHours: z.array(z.object({ day: z.string().describe('Dia da semana'), hours: z.string().describe('Horário de atendimento') })).describe('Horários de atendimento do profissional'),
  diary: z.array(z.object({
    date: z.string().describe('Data do atendimento'),
    time: z.string().describe('Horário do atendimento'),
    status: z.enum(['available', 'not-available']).describe('Status do atendimento'),
  })).describe('Diário de atendimento do profissional'),
})

export const updateProfessionalParams = z.object({
  id: z.number(),
  name: z.string().describe('Nome do profissional'),
  services: z.array(professionalServices).describe('Serviços do profissional'),
  basePrice: z.number().describe('Preço base do profissional'),
  rating: z.number().describe('Avaliação do profissional'),
  reviewCount: z.number().describe('Quantidade de avaliações do profissional'),
  location: z.object({
    lat: z.number().describe('Latitude do profissional'),
    lng: z.number().describe('Longitude do profissional'),
  }).describe('Localização do profissional'),
  city: z.string().describe('Cidade do profissional'),
  workingHours: z.array(z.object({
    day: z.string().describe('Dia da semana'),
    hours: z.string().describe('Horário de atendimento'),
  })).describe('Horários de atendimento do profissional'),
  diary: z.array(z.object({
    date: z.string().describe('Data do atendimento'),
    time: z.string().describe('Horário do atendimento'),
    status: z.enum(['available', 'not-available']).describe('Status do atendimento'),
  })).describe('Diário de atendimento do profissional'),
})

export const deleteProfessionalParams = z.object({ id: z.number() })
