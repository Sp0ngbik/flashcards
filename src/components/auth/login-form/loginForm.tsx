// import { useForm } from 'react-hook-form'
//
// import { Button } from '@/components/ui/button'
// import { CheckboxControlled, TextFieldControlled } from '@/components/ui/controlled'
// import { zodResolver } from '@hookform/resolvers/zod'
//
// import { FormValues, loginSchema } from '../signIn/utils'
//
// export const LoginForm = () => {
//   const {
//     control,
//     formState: { errors },
//     handleSubmit,
//   } = useForm<FormValues>({
//     defaultValues: { email: '', password: '', rememberMe: false },
//     resolver: zodResolver(loginSchema),
//   })
//
//   const onSubmit = (data: FormValues) => {
//     console.log(data)
//   }
//
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <TextFieldControlled
//         control={control}
//         errorMessage={errors.email?.message}
//         label={'email'}
//         name={'email'}
//       />
//       <TextFieldControlled
//         control={control}
//         errorMessage={errors.password?.message}
//         label={'password'}
//         name={'password'}
//         variant={'password'}
//       />
//       <CheckboxControlled control={control} name={'rememberMe'} text={'Remember me'} />
//
//       <Button>Log In</Button>
//     </form>
//   )
// }
