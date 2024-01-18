import { z } from 'zod'

export type FormProfile = z.infer<typeof profileSchema>

export const profileSchema = z.object({
  nickname: z.string().min(3).max(30),
})

export type FormFile = z.infer<typeof fileSchema>

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const fileSchema = z.object({
  image: z
    .any()
    .refine(file => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
})
