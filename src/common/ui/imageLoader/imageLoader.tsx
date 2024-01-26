import { ChangeEvent, ComponentPropsWithoutRef, ElementType, forwardRef } from 'react'

import { ZodError } from 'zod'

import { fileSchema } from './fileSchema'

type ImageLoaderProps<T extends ElementType = 'input'> = {
  setFileError: (value: null | string) => void
  setPhoto: (image: File) => void
} & ComponentPropsWithoutRef<T>

const ImageLoader = forwardRef<HTMLInputElement, ImageLoaderProps>(
  ({ setFileError, setPhoto, ...rest }, ref) => {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]
      let err = null

      try {
        fileSchema.parse(selectedFile)
        setFileError(null)
      } catch (error: unknown) {
        err = error
        if (error instanceof ZodError) {
          setFileError(error.errors?.[0]?.message || 'File validation error')
        } else {
          console.error('Unexpected error type:', error)
        }
      }

      if (!err) {
        selectedFile && setPhoto(selectedFile)
      }
    }

    return <input onChange={handleFileChange} ref={ref} type={'file'} {...rest} />
  }
)

export default ImageLoader
