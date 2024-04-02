import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/utils/utils'
import { UseFormReturn } from 'react-hook-form'
import { FC, memo } from 'react'
import { useQuery } from '@tanstack/react-query'
import AuthorServices, { AuthorKey } from '@/services/authorServices'
import { AuthorResponse } from '@/types/authorType'
import { Button } from '@/components/ui/button'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'

type AuthorFieldUIProp = {
  form: UseFormReturn<
    {
      name: string
      descriptions: string
      avatar: {
        url: string
        public_id: string
      }
      type: number
      AuthorId: number
      categories: number[]
    },
    any,
    undefined
  >
}

const AuthorFieldUI: FC<AuthorFieldUIProp> = memo(({ form }) => {
  const {
    data: authorsResponse,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: [AuthorKey],
    queryFn: AuthorServices.all,
    gcTime: 86400000,
    refetchOnMount: false,
  })

  if (isError) {
    console.log(error)
  }

  const authors: AuthorResponse[] = authorsResponse?.data

  return (
    <FormField
      control={form.control}
      name="AuthorId"
      render={({ field }) => (
        <FormItem className=" w-1/3">
          <FormLabel className="block">Author</FormLabel>
          {isSuccess && (
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      'w-full justify-between font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value
                      ? authors.find((author) => author.id === field.value)
                          ?.name
                      : 'Select author'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup>
                      {authors.map((author) => (
                        <CommandItem
                          key={author.id}
                          onSelect={() => {
                            form.setValue('AuthorId', author.id)
                          }}
                        >
                          {author.name}
                          <CheckIcon
                            className={cn(
                              'ml-auto h-4 w-4',
                              author.id === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  )
})

export default AuthorFieldUI
