import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export type FormProfile = z.infer<typeof profileSchema>

export const profileSchema = z.object({
  nickname: z.string().min(3).max(30),
})
export const useEditProfile = (initialValue: FormProfile = { nickname: '' }) =>
  useForm<FormProfile>({
    defaultValues: initialValue,
    resolver: zodResolver(profileSchema),
  })
