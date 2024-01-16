import { SignUp } from '@/components/auth/signUp'
import { DoubleSlider } from '@/components/ui/slider/slider'

import { Pagination } from './components/ui/pagination'

function App() {
  return (
    <div>
      <Pagination totalCount={250} />
      <SignUp />
      <DoubleSlider defaultValue={[10, 25]} max={25} min={10} />
    </div>
  )
}

export default App
