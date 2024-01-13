import Pagination from '@/components/ui/pagination/pagination'

function App() {
  return (
    <div>
      <Pagination pageSize={20} selectOptions={['10', '20', '30', '100']} totalCount={250} />
    </div>
  )
}

export default App
