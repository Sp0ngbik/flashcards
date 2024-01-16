import { LoginForm } from '@/components/auth/login-form/login-form'
import { SignIn } from '@/components/auth/signIn'

import { Pagination } from './components/ui/pagination'

function App() {
  return (
    <div>
      <Pagination totalCount={250} />
      <LoginForm />
      <SignIn />
    </div>
  )
}

export default App
