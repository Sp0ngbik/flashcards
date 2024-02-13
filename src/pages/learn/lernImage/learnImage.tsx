import { useState } from 'react'

import { ImagePreview } from '@/common/ui/imge-preview'

import s from '@/pages/learn/lernImage/learnImage.module.scss'

type LearnImageProps = {
  imageSRC: string
}

const LearnImage = ({ imageSRC }: LearnImageProps) => {
  const [image, setShowImage] = useState<boolean>(false)
  const showImage = () => {
    setShowImage(true)
  }
  const hideImage = () => {
    setShowImage(false)
  }

  return (
    <div>
      {image ? (
        <ImagePreview onClose={hideImage} open={image} src={imageSRC} />
      ) : (
        <img alt={''} className={s.learnImage} onClick={showImage} src={imageSRC} />
      )}
    </div>
  )
}

export default LearnImage
