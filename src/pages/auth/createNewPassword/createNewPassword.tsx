import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { TextFieldControlled } from '@/common/ui/controlled'
import { Typography } from '@/common/ui/typography'
import {
  FormValuesCreatePassword,
  createPasswordSchema,
} from '@/pages/auth/createNewPassword/utils'
import { useCreateNewPasswordMutation } from '@/services/auth/auth.sevice'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './createNewPassword.module.scss'

const CreateNewPassword = () => {
  const { token } = useParams<{ token: string }>()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValuesCreatePassword>({
    defaultValues: { password: '' },
    resolver: zodResolver(createPasswordSchema),
  })
  const [createNewPassword] = useCreateNewPasswordMutation()
  const navigate = useNavigate()
  const onSubmit = async (data: FormValuesCreatePassword) => {
    if (token) {
      await createNewPassword({ password: data.password, token: token })
      toast.success('Password was updated')
      navigate('/sign-in')
    } else {
      toast.error('No such user')
    }
  }

  return (
    <Card classNameWrapper={s.newPasswordWrapper}>
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
