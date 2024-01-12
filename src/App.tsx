import Pagination from '@/components/ui/pagination/pagination'
import { Select } from '@/components/ui/select'

function App() {
  return (
    <div>
      <Pagination pageSize={25} siblings={2} totalElements={350} />
      <Select options={['10223', '20', '30']} />
    </div>
  )
}

export default App
