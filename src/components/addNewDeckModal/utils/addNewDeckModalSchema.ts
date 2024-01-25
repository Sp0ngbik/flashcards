import { fileSchema } from '@/components/auth/profile/utils'
import { z } from 'zod'

export type FormValuesAddDeck = z.infer<typeof addDeckSchema>

export const addDeckSchema = z.object({
  file: fileSchema,
  isPrivate: z.boolean().default(false),
  name: z.string().min(3),
})
