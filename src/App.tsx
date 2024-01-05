import { Button } from '@/components/ui/button/button'
import TextField from '@/components/ui/textField/textField'

function App() {
  return (
    <div>
      <Button as={'a'} href={'/link'} variant={'primary'}>
        Hello!
      </Button>
      <Button variant={'primary'}>Hello</Button>
      <TextField placeholder={'Input'} />
    </div>
  )
}

export default App
