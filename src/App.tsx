import { DoubleSlider } from '@/components/ui/slider'

import { Pagination } from './components/ui/pagination'

function App() {
  return (
    <div>
      <Pagination totalCount={250} />
      <DoubleSlider defaultValue={[10, 20]} />
    </div>
  )
}

export default App
