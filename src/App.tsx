import { Profile } from '@/components/auth/profile'
import { SignUp } from '@/components/auth/signUp'

import { Pagination } from './components/ui/pagination'

function App() {
  return (
    <div>
      <Pagination totalCount={250} />
      {/*<SignUp />*/}
      <Profile />
    </div>
  )
}

export default App
