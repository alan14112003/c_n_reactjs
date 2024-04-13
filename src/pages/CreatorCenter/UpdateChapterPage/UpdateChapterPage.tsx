import storyServices, { StoryKey } from '@/services/storyServices'
import { StoriesList } from '@/types/storyType'
import { toTitleCase } from '@/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'
import ChapterServices, { ChapterKey } from '@/services/chapterServices'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'
import { ChapterCreate, ChapterResponse } from '@/types/chapterType'
import ChapterContentTextField from '@/components/CreatorCenTer/HandleChapterUI/ChapterContentTextField'
import ChapterNumberField from '@/components/CreatorCenTer/HandleChapterUI/ChapterNumberField'
import ChapterNameField from '@/components/CreatorCenTer/HandleChapterUI/ChapterNameField'
import ChapterIsFreeField from '@/components/CreatorCenTer/HandleChapterUI/ChapterIsFreeField'
import ChapterPriceField from '@/components/CreatorCenTer/HandleChapterUI/ChapterPriceField'
import ChapterPrivateEndField from '@/components/CreatorCenTer/HandleChapterUI/ChapterPrivateEndField'
import ChapterContentImageField from '@/components/CreatorCenTer/HandleChapterUI/ChapterContentImageField'

const FormSchema = z.object({
  name: z.string().min(1),
  number: z.number().min(0),
  content: z.string().min(10),
  isFree: z.boolean(),
  privateEnd: z.date().optional(),
  price: z.number().optional(),
  StoryId: z.number(),
  type: z.number(),
})

const UpdateChapterPage = () => {
  const { t } = useTranslation([
    'cms',
    'creator_chapters_page',
    'response_code',
  ])

  const { id, slugId } = useParams()
  const [isFree, setIsFree] = useState(true)
  const navigate = useNavigate()

  const { data: chapterResponse, isSuccess } = useQuery({
    queryKey: [ChapterKey, 'auth', 'get', id],
    queryFn: () => {
      return ChapterServices.getByAuth(id!)
    },
  })

  const queryClient = useQueryClient()

  const chapter: ChapterResponse = chapterResponse?.data

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  useEffect(() => {
    if (chapter) {
      form.setValue('StoryId', chapter.StoryId)
      form.setValue('number', chapter.number)
      form.setValue('name', chapter.name)
      form.setValue('type', chapter.type)
      form.setValue('isFree', chapter.isFree)
      form.setValue('price', chapter.price ?? 0)
      form.setValue('privateEnd', chapter.privateEnd ?? undefined)
      form.setValue('content', chapter.content)
      setIsFree(chapter.isFree)
    }
  }, [chapter])

  const mutation = useMutation({
    mutationFn: (data: ChapterCreate) => ChapterServices.update(id!, data),
  })

  const onSubmit = async (body: z.infer<typeof FormSchema>) => {
    try {
      const data: ChapterCreate = { ...body }

      if (body.isFree) {
        data.privateEnd = undefined
        data.price = undefined
      }

      const res = await mutation.mutateAsync(data)

      const result = res.data

      toast.success('Cập nhật chương thành công')

      console.log(result)

      queryClient.removeQueries({
        queryKey: [ChapterKey, 'auth'],
      })

      navigate(`/creator-center/chapters/${slugId}`)
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
    }
  }

  return (
    <HelmetProvider>
      {/* title */}
      <Helmet>
        {isSuccess && (
          <title>
            {toTitleCase(
              t('creator_chapters_page:page_create_title') + chapter.name
            )}
          </title>
        )}
      </Helmet>
      <div>
        <h2 className="text-2xl font-bold">
          {isSuccess &&
            t('creator_chapters_page:page_create_title') + `: ${chapter.name}`}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="mt-6 flex gap-6 justify-between">
              <div className="w-3/12">
                <ChapterNumberField form={form} />
              </div>
              <div className="w-6/12">
                <ChapterNameField form={form} />
              </div>
              <div className="w-3/12">
                <ChapterIsFreeField form={form} setIsFree={setIsFree} />
              </div>
            </div>
            {isFree === false && (
              <div className="mt-4 flex gap-4">
                <div className="w-6/12">
                  <ChapterPriceField form={form} />
                </div>
                <div className="w-6/12">
                  <ChapterPrivateEndField form={form} />
                </div>
              </div>
            )}

            <div>
              {isSuccess && (
                <>
                  {chapter.type === StoryTypeEnum.WORD && (
                    <ChapterContentTextField form={form} />
                  )}

                  {chapter.type === StoryTypeEnum.COMIC && (
                    <ChapterContentImageField form={form} />
                  )}
                </>
              )}
            </div>

            <Button variant="success" className="mt-8 float-end">
              Sửa chương
            </Button>
          </form>
        </Form>
      </div>
    </HelmetProvider>
  )
}

export default UpdateChapterPage
