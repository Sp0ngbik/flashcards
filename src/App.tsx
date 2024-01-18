import { Profile } from '@/components/auth/profile'

import { Pagination } from './components/ui/pagination'

function App() {
  return (
    <div>
      <Pagination totalCount={250} />
      <Profile email={'asd'} nickname={'asd'} />
    </div>
  )
}

export default App
