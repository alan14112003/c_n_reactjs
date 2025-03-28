import { FileUploadResponse } from '@/types/fileUploadType'
import { FC, memo, ReactNode, useEffect, useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { Button } from '../ui/button'
import { Loader, X } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import UploadServices from '@/services/uploadServices'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

type SingleFileUploadProp = {
  children?: ReactNode
  pathUpload: string
  onUpload: (data: FileUploadResponse) => void
  onDelete: () => void
  fileUpload?: FileUploadResponse
}

export const SingleFileUpload: FC<SingleFileUploadProp> = memo(
  ({ pathUpload, onUpload, onDelete, children, fileUpload }) => {
    const [file, setFile] = useState<File | null>(null)
    const [fileUploaded, setFileUploaded] = useState<FileUploadResponse | null>(
      null
    )
    const [isUpload, setIsUpload] = useState(false)

    const { t } = useTranslation(['cms', 'response_code'])

    const mutationCreate = useMutation({
      mutationFn: () => {
        return UploadServices.uploadSingle(pathUpload, file!)
      },
    })

    const mutationDelete = useMutation({
      mutationFn: () => {
        return UploadServices.deleteSingle(fileUploaded?.public_id!)
      },
    })

    useEffect(() => {
      if (fileUpload) {
        setFileUploaded(fileUpload)
      }
    }, [fileUpload])

    const handleChange = (file: File) => {
      setFile(file)
    }

    const handleUpload = async () => {
      try {
        if (!fileUploaded) {
          setIsUpload(true)
          const response = await mutationCreate.mutateAsync()
          const uploadResponse: FileUploadResponse = response.data
          console.log(uploadResponse)
          setFileUploaded(uploadResponse)
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
      if (fileUploaded) {
        try {
          setIsUpload(true)
          await mutationDelete.mutateAsync()
          setFileUploaded(null)
          onDelete()
        } catch (error) {
          if (isAxiosError(error)) {
            toast.error(
              `${
                error.response?.data?.code
                  ? t<any, {}, null>(
                      `response_code:${error.response.data.code}`
                    )
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
      setFile(null)
    }

    return (
      <div className="border-dashed border-2 max-w-full max-h-full flex justify-center items-center">
        {!file && !fileUploaded && (
          <FileUploader
            handleChange={handleChange}
            types={[
              'apng',
              'avif',
              'gif',
              'jpeg',
              'png',
              'svg+xml',
              'webp',
              'bmp',
              'x-icon',
              'tiff',
              'heif',
              'heic',
              'jpg',
            ]}
          >
            <div className="p-4">{children ?? 'upload file here'}</div>
          </FileUploader>
        )}
        {(file || fileUploaded) && (
          <div className="relative p-4">
            <div className="relative">
              <img
                src={file ? URL.createObjectURL(file) : fileUploaded?.url}
                alt="for upload"
                className="max-w-full max-h-full object-cover"
              />
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
                disabled={!!fileUploaded}
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
)
