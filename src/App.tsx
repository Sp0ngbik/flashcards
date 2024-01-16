import { SignIn } from '@/components/auth/signIn'

import { Pagination } from './components/ui/pagination'

function App() {
  return (
    <div>
      <Pagination totalCount={250} />
      <SignIn />
    </div>
  )
}

export default App
