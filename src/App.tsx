import { Button } from '@/components/ui/button/button'
import TextField from '@/components/ui/textField/textField'

function App() {
  return (
    <div>
      <Button variant={'primary'}>Hello</Button>
      <TextField />
      <TextField variant={'search'} />
      <TextField variant={'password'} />
    </div>
  )
}

export default App
