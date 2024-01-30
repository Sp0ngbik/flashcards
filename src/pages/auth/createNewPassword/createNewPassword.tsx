import { useForm } from 'react-hook-form'

import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { TextFieldControlled } from '@/common/ui/controlled'
import { Typography } from '@/common/ui/typography'
import {
  FormValuesCreatePassword,
  createPasswordSchema,
} from '@/pages/auth/createNewPassword/utils'
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
          id={'password'}
          label={'Password'}
          name={'password'}
          placeholder={'Your password'}
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
