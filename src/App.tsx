import { SignUp } from '@/components/auth/signUp'
import { DoubleSlider } from '@/components/ui/slider'

import { SignIn } from './components/auth/signIn'

function App() {
  return (
    <div>
      <DoubleSlider defaultValue={[10, 15]} max={15} min={10} />
      <SignUp />
      <SignIn />
    </div>
  )
}

export default App
