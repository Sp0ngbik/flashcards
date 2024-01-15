import { useForm } from 'react-hook-form'

import { LoginForm } from '@/components/auth/login-form/login-form'
import { Button } from '@/components/ui/button'
import { RadioGroupControlled } from '@/components/ui/controlled/radioGroupControlled'
import { RadioItem } from '@/components/ui/radio-group/radioItem'

import { Pagination } from './components/ui/pagination'

function App() {
  const { control, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div>
      <Pagination totalCount={250} />
      <LoginForm />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RadioGroupControlled control={control} name={'users'}>
            <RadioItem value={'Vlad'}>Vlad</RadioItem>
            <RadioItem value={'Sereg'}>Sereg</RadioItem>
            <RadioItem value={'Stas'}>Stas</RadioItem>
            <RadioItem value={'Vadik'}>Vadik</RadioItem>
          </RadioGroupControlled>
          <Button>S</Button>
        </form>
      </div>
    </div>
  )
}

export default App
