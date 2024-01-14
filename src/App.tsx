import { RadioGroup } from '@/components/ui/radio-group'

import { Pagination } from './components/ui/pagination'
import { RadioItem } from './components/ui/radio-group/radioItem'

function App() {
  return (
    <div>
      <Pagination totalCount={250} />
      <RadioGroup defaultValue={'23'} disabled>
        <RadioItem value={'23'}>23</RadioItem>
        <RadioItem value={'42'}>42</RadioItem>
        <RadioItem value={'22'}>42</RadioItem>
        <RadioItem value={'12'}>12</RadioItem>
        <RadioItem value={'234'}>12</RadioItem>
      </RadioGroup>
    </div>
  )
}

export default App
