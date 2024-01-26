import { z } from 'zod'

export type FormValuesCreatePassword = z.infer<typeof createPasswordSchema>

export const createPasswordSchema = z.object({
  password: z.string().min(3),
})
