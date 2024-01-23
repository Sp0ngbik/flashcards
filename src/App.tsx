import { Provider } from 'react-redux'

import { Router } from '@/router'
import { store } from '@/services/store'

import { Header } from './components/ui/header'

function App() {
  return (
    <Provider store={store}>
      <Header isLoggedIn />
      <Router />
    </Provider>
  )
}

export default App
