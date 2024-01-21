import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

type Props = {
  message: string
}

export const Notification = ({ message }: Props) => {
  useEffect(() => {
    toast.error(message)
  }, [message])

  return (
    <div>
      <ToastContainer autoClose={2000} hideProgressBar theme={'dark'} />
    </div>
  )
}
