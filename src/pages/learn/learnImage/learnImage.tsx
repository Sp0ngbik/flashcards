import { useState } from 'react'

import { ImagePreview } from '@/common/ui/imagePreview'

import s from '@/pages/learn/learnImage/learnImage.module.scss'

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
        <img
          alt={''}
          className={`${s.learnImage} ${s.learnImageWrapper}`}
          onClick={showImage}
          src={imageSRC}
        />
      )}
    </div>
  )
}

export default LearnImage
