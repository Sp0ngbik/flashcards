import { Button } from '@/components/ui/button/button'
import { Header } from '@/components/ui/header'

function App() {
  return (
    <div>
      <Header isLoggedIn />
      <Button variant={'primary'}>Hello</Button>
    </div>
  )
}

export default App
