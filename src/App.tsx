import { Provider } from 'react-redux'

import { Header } from '@/layout/header'
import { Router } from '@/router'
import { store } from '@/services/store'

function App() {
  return (
    <Provider store={store}>
      <Header isLoggedIn />
      <Router />
    </Provider>
  )
}

export default App
