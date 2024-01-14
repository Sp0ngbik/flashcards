import Pagination from '@/components/ui/pagination/pagination'

import { Select } from './components/ui/select'

function App() {
  return (
    <div>
      <Pagination pageSize={20} selectOptions={['10', '20', '30', '100']} totalCount={250} />
      <Select options={['1', '2', '3']} />
    </div>
  )
}

export default App
