import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowBack } from '@/assets/icons/arrow-back-outline'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { Typography } from '@/common/ui/typography'
import ProfileAvatar from '@/pages/auth/profile/ui/profileAvatar/profileAvatar'
import { ProfileEditBody } from '@/pages/auth/profile/ui/profileEditBody/profileEditBody'
import { useMeQuery } from '@/services/auth/auth.service'

import s from './profile.module.scss'

export type ProfileProps = {
  editStatus?: boolean
}

export const Profile: FC<ProfileProps> = ({ editStatus = false }) => {
  const { data: me } = useMeQuery()
  const navigate = useNavigate()

  return (
    <div className={s.profileWrapper}>
      <Button
        className={s.backToDeck}
        onClick={() => {
          navigate(-1)
        }}
        variant={'link'}
      >
        <ArrowBack className={s.arrowBack} />
        Back to Decks List
      </Button>
      <Card>
        <Typography className={s.profileLabel} variant={'h1'}>
          Personal Information
        </Typography>
        <div className={s.profileBlock}>
          <ProfileAvatar avatar={me?.avatar} />
          <ProfileEditBody editStatus={editStatus} email={me?.email} nickname={me?.name ?? ''} />
        </div>
      </Card>
    </div>
  )
}
