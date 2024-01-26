import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

type Props = {
  message: null | string
  resetError: (value: null | string) => void
}

export const Notification = ({ message, resetError }: Props) => {
  useEffect(() => {
    message && toast.error(message)
    toast.onChange(({ status }) => {
      if (status === 'added') {
        resetError(null)
      }
    })
  }, [message, resetError])

  return (
    <div>
      <ToastContainer autoClose={2000} hideProgressBar theme={'dark'} />
    </div>
  )
}
