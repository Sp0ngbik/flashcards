import { Button } from '@/components/ui/button/button'
import { Header } from '@/components/ui/header'
import { RadioGroup } from '@/components/ui/radio-group'

function App() {
  return (
    <div>
      <Header isLoggedIn />
      <Button variant={'primary'}>Hello</Button>
      <RadioGroup options={['sad', 'dsa', 'ss', 'dd1']} />
    </div>
  )
}

export default App
