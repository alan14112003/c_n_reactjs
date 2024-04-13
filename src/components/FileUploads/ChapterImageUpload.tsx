import UploadServices from '@/services/uploadServices'
import {
  ChapterImageUploadJson,
  ChapterImageUploadResponse,
} from '@/types/fileUploadType'
import { useMutation } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { useTranslation } from 'react-i18next'
import { read as XLSX_read, utils as XLSX_utils } from 'xlsx'
import { Button } from '../ui/button'
import { Loader, X } from 'lucide-react'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'

type ChapterImageUploadProp = {
  onUpload: (data: ChapterImageUploadResponse[]) => void
  onDelete: () => void
  chapterImageUpload?: ChapterImageUploadResponse[]
}

const ChapterImageUpload: FC<ChapterImageUploadProp> = ({
  onDelete,
  onUpload,
  chapterImageUpload,
}) => {
  const [chapter, setChapter] = useState<ChapterImageUploadJson[] | null>(null)
  const [chapterImageUploaded, setChapterImageUploaded] = useState<
    ChapterImageUploadResponse[] | null
  >(null)
  const [isUpload, setIsUpload] = useState(false)

  const { t } = useTranslation(['cms', 'response_code'])

  const mutationCreate = useMutation({
    mutationFn: () => {
      return UploadServices.uploadMultiple('/chapters', chapter!)
    },
  })

  const mutationDelete = useMutation({
    mutationFn: () => {
      function splitArrayIntoChunks(
        array: ChapterImageUploadResponse[],
        chunkSize: number
      ) {
        const chunks = []
        for (let i = 0; i < array.length; i += chunkSize) {
          const chunk = array.slice(i, i + chunkSize)
          chunks.push(chunk)
        }
        return chunks
      }

      return Promise.all(
        splitArrayIntoChunks(chapterImageUploaded!, 100).map(
          (ChapterImageUploadedChunk) => {
            return UploadServices.deleteMultiple(
              ChapterImageUploadedChunk.map(
                (ChapterImageUploadedChunkItem) =>
                  ChapterImageUploadedChunkItem.public_id
              )
            )
          }
        )
      )
    },
  })

  useEffect(() => {
    if (chapterImageUpload) {
      setChapterImageUploaded(chapterImageUpload)
    }
  }, [chapterImageUpload])

  const handleChange = (file: File) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const data = new Uint8Array(e.target!.result as ArrayBuffer)
      const workbook = XLSX_read(data, { type: 'array' })

      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]

      // Chuyển đổi dữ liệu từ sheet thành mảng JSON
      const chapterJson: ChapterImageUploadJson[] =
        XLSX_utils.sheet_to_json(worksheet)

      setChapter(chapterJson)
    }

    reader.readAsArrayBuffer(file)
  }

  const handleUpload = async () => {
    try {
      if (!chapterImageUploaded) {
        setIsUpload(true)
        const response = await mutationCreate.mutateAsync()
        const uploadResponse: ChapterImageUploadResponse[] = response.data
        console.log(uploadResponse)
        setChapterImageUploaded(uploadResponse)
        onUpload(uploadResponse)
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          `${
            error.response?.data?.code
              ? t<any, {}, null>(`response_code:${error.response.data.code}`)
              : error.response?.statusText
          }`
        )
        return
      }
      console.log(error)
    } finally {
      setIsUpload(false)
    }
  }

  const handleDelete = async () => {
    if (chapterImageUploaded) {
      try {
        setIsUpload(true)
        await mutationDelete.mutateAsync()
        setChapterImageUploaded(null)
        onDelete()
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(
            `${
              error.response?.data?.code
                ? t<any, {}, null>(`response_code:${error.response.data.code}`)
                : error.response?.statusText
            }`
          )
          return
        }
        console.log(error)
      } finally {
        setIsUpload(false)
      }
    }
    setChapter(null)
  }

  return (
    <div className="border-dashed border-2 max-w-full max-h-full flex justify-center items-center">
      {!(chapter || chapterImageUploaded) && (
        <FileUploader
          className="w-full"
          handleChange={handleChange}
          types={[
            'xls', // cho .xls
            'xlsx', // cho .xlsx
            'ods', // cho .ods
            'csv', // cho .csv
            'tsv', // cho .tsv (không chính thức nhưng dễ nhận biết)
            'rtf', // cho .rtf (không phổ biến cho bảng tính nhưng hỗ trợ đọc)
            'pdf', // cho .pdf (đọc thông qua xlsx chủ yếu được sử dụng để nhập dữ liệu)
            'html', // cho HTML
            'json', // cho định dạng JSON của Workbook
          ]}
        >
          <div className="p-4 w-[40rem] max-w-full flex justify-center items-center">
            {'upload csv here'}
          </div>
        </FileUploader>
      )}
      {(chapter || chapterImageUploaded) && (
        <div className="relative p-4 w-full">
          <div className="relative">
            <div className="flex justify-center items-center">
              <p>
                {chapter ? chapter.length : chapterImageUploaded?.length} ảnh
              </p>
            </div>
            <Button
              type="button"
              size={'icon'}
              variant={'destructive'}
              className="rounded-full absolute top-0 right-0 translate-x-1/3 -translate-y-1/3"
              onClick={handleDelete}
            >
              <X className="" />
            </Button>
            <Button
              type="button"
              variant="success"
              onClick={handleUpload}
              disabled={!!chapterImageUploaded}
            >
              upload
            </Button>
          </div>
          {isUpload && (
            <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
              <Loader className="animate-spin" size={50} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ChapterImageUpload
