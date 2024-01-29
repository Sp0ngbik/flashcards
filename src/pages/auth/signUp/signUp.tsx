import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'

import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { TextFieldControlled } from '@/common/ui/controlled'
import { Typography } from '@/common/ui/typography'
import { FormValuesSignUp, signUpSchema } from '@/pages/auth/signUp/utils'
import { useSignUpMutation } from '@/services/auth/auth.sevice'
import { ServerError } from '@/services/auth/auth.types'
import { setAuthenticated } from '@/services/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './signUp.module.scss'

export const SignUp = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormValuesSignUp>({
    defaultValues: { confirmPassword: '', email: '', password: '', sendConfirmationEmail: false },
    resolver: zodResolver(signUpSchema),
  })

  // const dispatch = useAppDispatch()
  // const navigate = useNavigate()

  const [signUp, { error, isLoading }] = useSignUpMutation<ServerError>()
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  useEffect(() => {
    if (error) {
      setError('email', { message: error.data.errorMessages[0], type: 'custom' })
    }
  }, [error, setError])

  if (isAuthenticated) {
    return <Navigate to={'/'} />
  }

  if (isLoading) {
    return <div>Loading</div>
  }

  const onSubmit = async (data: FormValuesSignUp) => {
    const { confirmPassword, ...rest } = data

    await signUp(rest).unwrap()
    // dispatch(setAuthenticated(true))
  }

  // const handleSignInClick = () => {
  //   navigate('/sign-in')
  // }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography className={s.signUpLabel} variant={'large'}>
          Sign Up
        </Typography>
        <TextFieldControlled
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
        <TextFieldControlled
          className={s.confirmPassword}
          control={control}
          errorMessage={errors.confirmPassword?.message}
          id={'confirmPassword'}
          label={'Confirm Password'}
          name={'confirmPassword'}
          placeholder={'Confirm your password'}
          variant={'password'}
        />
        <Button fullWidth>Sign Up</Button>
      </form>
      <Typography className={s.formQuestion} variant={'body2'}>
        Already have an account?
      </Typography>
      <Button
        className={s.submitButton}
        // onClick={handleSignInClick}
        variant={'link'}
      >
        Sign In
      </Button>
    </Card>
  )
}
