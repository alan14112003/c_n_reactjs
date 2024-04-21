import { ChapterImageUploadResponse } from '@/types/fileUploadType'
import { FC, useEffect, useState } from 'react'
import Images from './Images'

type ChapterContentImageProp = {
  content: string
}

const ChapterContentImage: FC<ChapterContentImageProp> = ({ content }) => {
  const [imagesList, setImagesList] = useState<ChapterImageUploadResponse[]>([])

  useEffect(() => {
    const imagesParse: ChapterImageUploadResponse[] = JSON.parse(content)
    imagesParse.sort((image1, image2) => image1.index - image2.index)

    setImagesList(imagesParse)
  }, [])

  return (
    <div>
      <Images images={imagesList} />
    </div>
  )
}

export default ChapterContentImage
