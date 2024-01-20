import { Provider } from 'react-redux'

import { Router } from '@/router'
import { store } from '@/services/store'

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
    // <div>
    //   <Pagination totalCount={250} />
    //   <Profile />
    //   <DoubleSlider defaultValue={[10, 15]} max={100} min={10} />
    // </div>
  )
}

export default App
