import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { CheckboxControlled, TextFieldControlled } from '@/common/ui/controlled'
import { Typography } from '@/common/ui/typography'
import { FormValuesSignIn, signInSchema } from '@/pages/auth/signIn/utils'
import { useLoginMutation } from '@/services/auth/auth.service'
import { ErrorResponse } from '@/services/auth/auth.types'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './signIn.module.scss'

export const SignIn = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValuesSignIn>({
    defaultValues: { email: '', password: '', rememberMe: false },
    resolver: zodResolver(signInSchema),
  })
  const navigate = useNavigate()
  const [login] = useLoginMutation()

  const onSubmit = async (data: FormValuesSignIn) => {
    try {
      await toast.promise(login(data).unwrap(), { pending: 'In progress', success: 'Success' })
      navigate('/')
    } catch (e: unknown) {
      const err = e as ErrorResponse

      toast.error(err.data.message ?? 'Could not sign in')
    }
  }

  const handleSignUpClick = () => {
    navigate('/sign-up')
  }

  return (
    <Card classNameWrapper={s.signInWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography className={s.signInLabel} variant={'large'}>
          Sign In
        </Typography>
        <TextFieldControlled
          className={s.emailField}
          control={control}
          errorMessage={errors.email?.message}
          id={'email'}
          label={'Email'}
          name={'email'}
          placeholder={'example@gmail.com'}
        />
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
        <CheckboxControlled
          className={s.rememberMe}
          control={control}
          id={'rememberMe'}
          name={'rememberMe'}
          text={'Remember me'}
        />
        <NavLink className={s.forgotPassword} to={'/forgot-password'}>
          Forgot Password?
        </NavLink>
        <Button fullWidth>Sign In</Button>
      </form>
      <Typography className={s.formQuestion} variant={'body2'}>
        Don&apos;t have an account?
      </Typography>
      <Button className={s.submitButton} onClick={handleSignUpClick} variant={'link'}>
        Sign Up
      </Button>
    </Card>
  )
}
