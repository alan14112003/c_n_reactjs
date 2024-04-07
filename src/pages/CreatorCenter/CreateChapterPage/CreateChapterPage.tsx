import storyServices, { StoryKey } from '@/services/storyServices'
import { StoriesList } from '@/types/storyType'
import { cn, getLocateDate, toTitleCase } from '@/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ChapterStatusEnum from '@/constants/chapters/ChapterStatusEnum'
import { useEffect, useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import ReactQuill from 'react-quill'
import textEditorModules from '@/config/textEditorModules'
import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'
import ChapterServices from '@/services/chapterServices'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'
import { ChapterCreate } from '@/types/chapterType'
import ChapterSortEnum from '@/constants/chapters/ChapterSortEnum'

const FormSchema = z.object({
  name: z.string().min(1),
  number: z.number().min(0),
  content: z.string().min(10),
  isFree: z.boolean(),
  privateEnd: z.date().optional(),
  price: z.number().min(1).optional(),
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
    queryKey: [StoryKey, 'auth'],
    queryFn: () => {
      return storyServices.getByAuth(slug, id)
    },
  })

  const queryClient = useQueryClient()

  const story: StoriesList = storyResponse?.data

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
        queryKey: ['chapters', 'auth'],
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
        {isSuccess && (
          <title>
            {toTitleCase(t('creator_chapters_page:page_title') + story.name)}
          </title>
        )}
      </Helmet>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="mt-6 flex gap-6 justify-between">
              <div className="w-3/12">
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chương số</FormLabel>
                      <Input
                        type="number"
                        placeholder="Chương số"
                        {...field}
                        onChange={(e) => {
                          form.setValue('number', Number(e.target.value))
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-6/12">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên</FormLabel>
                      <Input placeholder="tên" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-3/12">
                <FormField
                  control={form.control}
                  name="isFree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const isFreeVal = value === 'true'
                          form.setValue('isFree', isFreeVal)
                          setIsFree(isFreeVal)
                        }}
                        value={`${field.value}`}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t<any, {}, null>(
                              ChapterStatusEnum.allNames()[
                                `${ChapterStatusEnum.IS_FREE}`
                              ]
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(ChapterStatusEnum.allNames()).map(
                            (chapterStatusKey) => (
                              <SelectItem
                                value={chapterStatusKey}
                                key={chapterStatusKey}
                              >
                                {t<any, {}, null>(
                                  ChapterStatusEnum.allNames()[chapterStatusKey]
                                )}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {isFree === false && (
              <div className="mt-4 flex gap-4">
                <div className="w-6/12">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Xu</FormLabel>
                        <Input
                          placeholder="Xu"
                          type="number"
                          {...field}
                          onChange={(e) => {
                            form.setValue('price', Number(e.target.value))
                          }}
                          required
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-6/12">
                  <FormField
                    control={form.control}
                    name="privateEnd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Ngày kết thúc(để trống nếu vĩnh viễn)
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal flex',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP', {
                                  locale: getLocateDate(),
                                })
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date: Date) => date < new Date()}
                              initialFocus
                              locale={getLocateDate()}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            <div>
              {isSuccess && (
                <>
                  {story.type === StoryTypeEnum.WORD && (
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem className="mt-8">
                          <FormLabel>Nội dung</FormLabel>
                          <ReactQuill
                            theme="snow"
                            value={field.value}
                            onChange={field.onChange}
                            modules={textEditorModules}
                          />

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </>
              )}
            </div>

            <Button variant="success" className="mt-8 float-end">
              thêm chương
            </Button>
          </form>
        </Form>
      </div>
    </HelmetProvider>
  )
}

export default CreateChapterPage
