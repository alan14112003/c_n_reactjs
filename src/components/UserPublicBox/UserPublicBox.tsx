import { UserPublic } from '@/types/userType'
import { FC } from 'react'
import Image from '../Image'
import { NoAvatar } from '@/assets/images'

type UserPublicBoxProp = {
  user: UserPublic
}

const UserPublicBox: FC<UserPublicBoxProp> = ({ user }) => {
  return (
    <div className="flex gap-2 items-center">
      <Image
        className="h-6 rounded-full"
        alt={`avatar ${user.fullName}`}
        src={user.avatar ?? ''}
        fallback={NoAvatar}
      />
      <h3 className="font-bold">{user.fullName}</h3>
    </div>
  )
}

export default UserPublicBox
