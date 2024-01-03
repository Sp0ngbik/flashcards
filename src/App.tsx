import { Button } from '@/components/ui/button/button'

function App() {
  return (
    <div>
      <Button as={'a'} href={'/link'} variant={'primary'}>
        Hello!
      </Button>
      <Button as={'a'} href={'/link'} variant={'primary'}>
        Good nigth
      </Button>
      <Button variant={'primary'}>Hello</Button>
    </div>
  )
}

export default App
