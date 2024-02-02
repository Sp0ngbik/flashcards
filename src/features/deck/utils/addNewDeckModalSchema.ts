import { z } from 'zod'

export type FormValuesAddDeck = z.infer<typeof addDeckSchema>

export const addDeckSchema = z.object({
  isPrivate: z.boolean().default(false),
  name: z.string().min(3),
})
