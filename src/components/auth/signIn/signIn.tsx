import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import TextField from '@/components/ui/textField/textField'
import { Typography } from '@/components/ui/typography'

export const SignIn = () => {
  return (
    <Card>
      <Typography variant={'large'}>Sign In</Typography>
      <TextField label={'Email'} placeholder={'Email'} />
      <TextField label={'Password'} placeholder={'Password'} variant={'password'} />
      <Checkbox text={'Remember me'} />
      <Typography variant={'body2'}>Forgot Password?</Typography>
      <Button fullWidth>Sign In</Button>
      <Typography variant={'body2'}>Don&apos;t have an account?</Typography>
      <Button variant={'link'}>Sign Up</Button>
    </Card>
  )
}
