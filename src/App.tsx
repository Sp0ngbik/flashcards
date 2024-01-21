import { Provider } from 'react-redux'

import { Profile } from '@/components/auth/profile'
import { DoubleSlider } from '@/components/ui/slider'
import { Router } from '@/router'
import { store } from '@/services/store'

function App() {
  return (
    <Provider store={store}>
      <Profile />
      <DoubleSlider />
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
