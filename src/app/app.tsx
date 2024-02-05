import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { store } from '@/services/store'

import 'react-toastify/dist/ReactToastify.css'

import s from './app.module.scss'

import { Router } from './router/router'
function App() {
  return (
    <Provider store={store}>
      <ToastContainer
        autoClose={2000}
        hideProgressBar
        pauseOnHover
        position={'bottom-left'}
        theme={'dark'}
        toastClassName={s.toastContainer}
      />
      <Router />
    </Provider>
  )
}

export default App
