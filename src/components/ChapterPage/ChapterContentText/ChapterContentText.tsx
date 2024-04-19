import { FC } from 'react'

type ChapterContentTextProp = {
  content: string
}
const ChapterContentText: FC<ChapterContentTextProp> = ({ content }) => {
  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </div>
  )
}

export default ChapterContentText
