import { z } from 'zod'

export type FormValuesAddDeck = z.infer<typeof addDeckSchema>

const MAX_FILE_SIZE = 1000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const addDeckSchema = z.object({
  filePath: z.string(),
  // .refine(
  //   file => file.size <= MAX_FILE_SIZE,
  //   `Max image size is 1MB. The file will not be uploaded.`
  // )
  // .refine(
  //   file => ACCEPTED_IMAGE_TYPES.includes(file.type),
  //   'Only .jpg, .jpeg, .png and .webp formats are supported. The file will not be uploaded.'
  // ),
  isPrivate: z.boolean().default(false),
  name: z.string().min(3),
})
