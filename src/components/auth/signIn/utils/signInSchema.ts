import { z } from 'zod'

export type FormValues = z.infer<typeof signInSchema>

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})
