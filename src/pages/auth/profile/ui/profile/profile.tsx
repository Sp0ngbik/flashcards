import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { ArrowBack } from '@/assets/icons/arrow-back-outline'
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

  return (
    <div className={s.profileWrapper}>
      <NavLink className={s.backToDeck} to={'/'}>
        <ArrowBack className={s.arrowBack} />
        Back to Decks List
      </NavLink>
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
