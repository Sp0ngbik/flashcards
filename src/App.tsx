import Pagination from '@/components/ui/pagination/pagination'

function App() {
  return (
    <div>
      <Pagination pageSize={25} siblings={2} totalElements={350} />
    </div>
  )
}

export default App
