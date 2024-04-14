import storyServices, { StoryKey } from '@/services/storyServices'
import { StoriesResponse, StoryCreate } from '@/types/storyType'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import AuthorFieldUI from '@/components/CreatorCenTer/HandleStoryUI/AuthorFieldUI'
import CategoriesFieldUI from '@/components/CreatorCenTer/HandleStoryUI/CategoriesFieldUI'
import DescriptionFieldUI from '@/components/CreatorCenTer/HandleStoryUI/DescriptionFieldUI'
import TypeFieldUI from '@/components/CreatorCenTer/HandleStoryUI/TypeFieldUI'
import { SingleFileUpload } from '@/components/FileUploads'

import { Button } from '@/components/ui/button'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { StoryStorePath } from '@/constants/uploads/uploadPath'
import { StoryHandleResponse } from '@/types/storyType'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Image } from 'lucide-react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { useEffect } from 'react'

const FormSchema = z.object({
  name: z.string().min(1),
  descriptions: z.string(),
  avatar: z.object({
    url: z.string(),
    public_id: z.string(),
  }),
  type: z.number(),
  AuthorId: z.number(),
  categories: z.array(z.number()),
})

type FormValueType = z.infer<typeof FormSchema>

const UpdateStoryPage = () => {
  const { slugId } = useParams()
  const [slug, id] = slugId!.split('.')

  const { t } = useTranslation(['response_code'])
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const form = useForm<FormValueType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
  })

  const { data: storyResponse, isSuccess } = useQuery({
    queryKey: [StoryKey, 'auth', 'get', id],
    queryFn: () => {
      return storyServices.getByAuth(slug, id)
    },
  })

  const story: StoriesResponse = storyResponse?.data

  useEffect(() => {
    if (isSuccess) {
      form.setValue('name', story.name)
      form.setValue('AuthorId', story.AuthorId)
      form.setValue('avatar', JSON.parse(story.avatar))
      form.setValue(
        'categories',
        story.Categories.map((category) => category.id)
      )
      form.setValue('descriptions', story.descriptions)
      form.setValue('type', story.type)
    }
  }, [storyResponse])

  const mutation = useMutation({
    mutationFn: (data: StoryCreate) => {
      return storyServices.update(id, data)
    },
  })

  const onSubmit = async (body: z.infer<typeof FormSchema>) => {
    console.log('body: ', body)
    try {
      const res = await mutation.mutateAsync({
        ...body,
        avatar: JSON.stringify(body.avatar),
      })

      const data: StoryHandleResponse = res.data

      toast.success('sửa truyện thành công')

      console.log(data)

      queryClient.removeQueries({
        queryKey: [StoryKey, 'auth'],
      })

      navigate(-1)
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
        <title>Sửa truyện</title>
      </Helmet>
      <h2 className="text-2xl font-bold">Sửa truyện</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="mt-6 flex gap-6 justify-between">
            <div className="w-3/12">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <SingleFileUpload
                      pathUpload={StoryStorePath}
                      onUpload={(data) => {
                        form.setValue('avatar', data)
                      }}
                      onDelete={() => {
                        form.resetField('avatar')
                      }}
                      fileUpload={field.value}
                    >
                      <Image size={200} />
                    </SingleFileUpload>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-9/12">
              <CategoriesFieldUI form={form} />
              <div className="mt-4 flex gap-4 items-start">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-1/3">
                      <FormLabel>Tên</FormLabel>
                      <Input placeholder="tên" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <TypeFieldUI form={form} />

                <AuthorFieldUI form={form} />
              </div>

              <DescriptionFieldUI form={form} />

              <Button variant="success" className="mt-8 float-end">
                Cập nhật
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </HelmetProvider>
  )
}

export default UpdateStoryPage
