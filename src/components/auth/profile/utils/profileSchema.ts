import { z } from 'zod'

export type FormProfile = z.infer<typeof profileSchema>

export const profileSchema = z.object({
  nickname: z.string().min(3).max(30),
})
