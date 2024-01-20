import { useForm } from 'react-hook-form'

import {
  FormValuesCreatePassword,
  createPasswordSchema,
} from '@/components/auth/createNewPassword/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TextFieldControlled } from '@/components/ui/controlled'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './createNewPassword.module.scss'

const CreateNewPassword = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValuesCreatePassword>({
    defaultValues: { password: '' },
    resolver: zodResolver(createPasswordSchema),
  })

  const onSubmit = (data: FormValuesCreatePassword) => {
    console.log(data)
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography className={s.createPasswordLabel} variant={'large'}>
          Create new password
        </Typography>
        <TextFieldControlled
          className={s.passwordField}
          control={control}
          errorMessage={errors.password?.message}
          id={'Password'}
          label={'Password'}
          name={'password'}
          placeholder={'Password'}
          variant={'password'}
        />
        <Typography as={'p'} className={s.createPassword} variant={'body2'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button className={s.button} fullWidth>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}

export default CreateNewPassword
