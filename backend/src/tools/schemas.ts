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
  name: z.string(),
  services: z.array(professionalServices),
  basePrice: z.number(),
  rating: z.number().nullable(),
  reviewCount: z.number().nullable(),
  location: z.object({ lat: z.number(), lng: z.number() }),
  city: z.string(),
  workingHours: z.array(z.object({ day: z.string(), hours: z.string() })),
  diary: z.array(z.object({ date: z.string(), time: z.string(), status: z.string() })).nullable(),
})

export const updateProfessionalParams = z.object({
  id: z.number(),
  name: z.string().nullable(),
  services: z.array(professionalServices).nullable(),
  basePrice: z.number().nullable(),
  rating: z.number().nullable(),
  reviewCount: z.number().nullable(),
  location: z.object({ lat: z.number(), lng: z.number() }).nullable(),
  city: z.string().nullable(),
  workingHours: z.array(z.object({ day: z.string().nullable(), hours: z.string().nullable() })).nullable(),
  diary: z.array(z.object({ date: z.string().nullable(), time: z.string().nullable(), status: z.string().nullable() })).nullable(),
})

export const deleteProfessionalParams = z.object({ id: z.number() })


