import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './pageNotFound.module.scss'

import pageNotFoundImage from './../../assets/image/404.png'

const PageNotFound = () => {
  const navigate = useNavigate()
  const navigateHandler = () => {
    navigate('/')
  }

  return (
    <div className={s.container}>
      <img alt={'not found'} className={s.icon} src={pageNotFoundImage} />
      <Typography as={'h2'} variant={'body1'}>
        Sorry! Page not found!
      </Typography>
      <Button onClick={navigateHandler} variant={'primary'}>
        Back to home page
      </Button>
    </div>
  )
}

export default PageNotFound
