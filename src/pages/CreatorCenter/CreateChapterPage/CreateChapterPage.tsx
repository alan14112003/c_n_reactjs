import storyServices, { StoryKey } from '@/services/storyServices'
import { StoriesResponse } from '@/types/storyType'
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
import { ChapterCreate } from '@/types/chapterType'
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

const CreateChapterPage = () => {
  const { t } = useTranslation([
    'cms',
    'creator_chapters_page',
    'response_code',
  ])

  const { slugId } = useParams()
  const [slug, id] = slugId!.split('.')
  const [isFree, setIsFree] = useState(true)
  const navigate = useNavigate()

  const { data: storyResponse, isSuccess } = useQuery({
    queryKey: [StoryKey, 'auth', 'get', id],
    queryFn: () => {
      return storyServices.getByAuth(slug, id)
    },
  })

  const queryClient = useQueryClient()

  const story: StoriesResponse = storyResponse?.data

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  useEffect(() => {
    if (story) {
      form.setValue('StoryId', story.id)
      form.setValue('type', story.type)
      form.setValue('isFree', true)
    }
  }, [story])

  const mutation = useMutation({
    mutationFn: ChapterServices.create,
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

      toast.success('tạo chương mới thành công')

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
              t('creator_chapters_page:page_create_title') + story.name
            )}
          </title>
        )}
      </Helmet>
      <div>
        <h2 className="text-2xl font-bold">
          {isSuccess &&
            t('creator_chapters_page:page_create_title') + `: ${story.name}`}
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
                  {story.type === StoryTypeEnum.WORD && (
                    <ChapterContentTextField form={form} />
                  )}

                  {story.type === StoryTypeEnum.COMIC && (
                    <ChapterContentImageField form={form} />
                  )}
                </>
              )}
            </div>

            <div className="flex justify-end mt-8">
              <Button variant="success">thêm chương</Button>
            </div>
          </form>
        </Form>
      </div>
    </HelmetProvider>
  )
}

export default CreateChapterPage
