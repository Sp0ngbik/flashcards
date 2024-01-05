import { Button } from '@/components/ui/button/button'
import Checkbox from '@/components/ui/checkbox/checkbox'

function App() {
  return (
    <div>
      <Button as={'a'} href={'/link'} variant={'primary'}>
        Hello!
      </Button>
      <Button variant={'primary'}>Hello</Button>
      <Checkbox></Checkbox>
    </div>
  )
}

export default App
