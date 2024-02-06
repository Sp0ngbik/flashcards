import { ChangeEvent, ComponentPropsWithoutRef, ElementType, forwardRef } from 'react'
import { toast } from 'react-toastify'

import { ZodError } from 'zod'

import { fileSchema } from './fileSchema'

type ImageLoaderProps<T extends ElementType = 'input'> = {
  setPhoto: (image: File) => void
} & ComponentPropsWithoutRef<T>

const ImageLoader = forwardRef<HTMLInputElement, ImageLoaderProps>(({ setPhoto, ...rest }, ref) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    let err = null

    try {
      fileSchema.parse(selectedFile)
    } catch (error: unknown) {
      err = error
      if (error instanceof ZodError) {
        toast.error(error.errors?.[0]?.message ?? 'File validation error')
      } else {
        toast.error(JSON.stringify(error))
      }
    }

    if (!err) {
      selectedFile && setPhoto(selectedFile)
    }
    e.target.value = ''
  }

  return <input onChange={handleFileChange} ref={ref} type={'file'} {...rest} />
})

export default ImageLoader
