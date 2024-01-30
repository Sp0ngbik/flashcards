import { z } from 'zod'

export type FormValuesAddCard = z.infer<typeof addCardSchema>

export const addCardSchema = z.object({
  answer: z.string().min(3),
  question: z.string().min(3),
})
