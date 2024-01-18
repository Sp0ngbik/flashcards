import { ForgotPassword } from '@/components/auth/forgotPassword'

import { Pagination } from './components/ui/pagination'

function App() {
  return (
    <div>
      <Pagination totalCount={250} />
      <ForgotPassword />
    </div>
  )
}

export default App
