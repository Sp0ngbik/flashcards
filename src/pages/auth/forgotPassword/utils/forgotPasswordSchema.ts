import { z } from 'zod'

export type FormValuesForgotPassword = z.infer<typeof signInSchema>

export const signInSchema = z.object({
  email: z.string().email(),
})
