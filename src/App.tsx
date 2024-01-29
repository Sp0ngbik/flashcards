import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { Header } from '@/layout/header'
import { Router } from '@/router'
import { store } from '@/services/store'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Provider store={store}>
      <ToastContainer autoClose={2000} hideProgressBar theme={'dark'} />
      <Header isLoggedIn={false} />
      <Router />
    </Provider>
  )
}

export default App
