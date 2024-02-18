import { FC } from 'react'

import { Card } from '@/common/ui/card'
import GoBackButton from '@/common/ui/goBackButton/goBackButton'
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

  return (
    <div className={s.profileWrapper}>
      <GoBackButton />
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
