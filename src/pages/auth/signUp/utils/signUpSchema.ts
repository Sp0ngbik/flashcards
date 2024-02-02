import { z } from 'zod'
export type FormValuesSignUp = z.infer<typeof signUpSchema>

export const signUpSchema = z
  .object({
    confirmPassword: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(4),
    sendConfirmationEmail: z.boolean(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      })
    }
  })
  .transform(data => {
    if (data.confirmPassword === data.password) {
      data.sendConfirmationEmail = true
    }

    return data
  })
