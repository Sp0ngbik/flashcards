import { Button } from '@/components/ui/button/button'
import { Header } from '@/components/ui/header'
import { RadioGroupDemo } from '@/components/ui/radio-group'

function App() {
  return (
    <div>
      <Header isLoggedIn />
      <Button variant={'primary'}>Hello</Button>
      <RadioGroupDemo options={['sad', 'dsa', 'ss', 'dd1']} />
    </div>
  )
}

export default App
