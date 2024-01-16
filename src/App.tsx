import { SignUp } from '@/components/auth/signUp'
import { DoubleSlider } from '@/components/ui/slider'

import { Pagination } from './components/ui/pagination'

function App() {
  return (
    <div>
      <Pagination totalCount={250} />
      <SignUp />
      <DoubleSlider defaultValue={[25, 45]} max={45} min={25} />
    </div>
  )
}

export default App
