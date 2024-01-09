import { Button } from '@/components/ui/button/button'
import { Header } from '@/components/ui/header'
import { RadioGroupDemo } from '@/components/ui/radio-group'

function App() {
  return (
    <div>
      <Header isLoggedIn />
      <Button variant={'primary'}>Hello</Button>
      <RadioGroupDemo options={['1', '2', '3', '1']} />
    </div>
  )
}

export default App
