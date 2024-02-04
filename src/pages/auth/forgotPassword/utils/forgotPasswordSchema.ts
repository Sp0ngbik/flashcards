import { z } from 'zod'

export type FormValuesForgotPassword = z.infer<typeof forgotPasswordSchema>

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
})
