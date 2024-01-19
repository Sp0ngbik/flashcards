import { Profile } from '@/components/auth/profile'

import { Button } from './components/ui/button'
import { Pagination } from './components/ui/pagination'

function App() {
  return (
    <div>
      <Pagination totalCount={250} />
      <Profile />
      <Button as={'a'} variant={'link'}>
        hi
      </Button>
      {/*<CreateNewPassword />*/}
    </div>
  )
}

export default App
