import { SignUp } from '@/components/auth/signUp'

import { Pagination } from './components/ui/pagination'

function App() {
  return (
    <div>
      <Pagination totalCount={250} />
      <SignUp />
    </div>
  )
}

export default App
