import Pagination from '@/components/ui/pagination/pagination'
import { SelectItem } from '@/components/ui/select/selectItem'

import { Select } from './components/ui/select'

function App() {
  return (
    <div>
      <Pagination totalCount={250} />
      <Select defaultValue={'2'}>
        <SelectItem value={'1'}>1</SelectItem>
        <SelectItem value={'2'}>2</SelectItem>
        <SelectItem value={'3'}>3</SelectItem>
        <SelectItem value={'24'}>4</SelectItem>
      </Select>
    </div>
  )
}

export default App
