import CreateNewPassword from '@/components/auth/createNewPassword/createNewPassword'
import { Profile } from '@/components/auth/profile'

import { Pagination } from './components/ui/pagination'

function App() {
  return (
    <div>
      <Pagination totalCount={250} />
      <Profile email={'asd'} nickname={'asd'} />
      <CreateNewPassword />
    </div>
  )
}

export default App
