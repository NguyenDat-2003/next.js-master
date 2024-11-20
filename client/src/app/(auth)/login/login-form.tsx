'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import envConfig from '~/config'
import { LoginBody, LoginBodyType } from '~/schemaValidations/auth.schema'
import { useToast } from '~/hooks/use-toast'

export default function LoginForm() {
  const { toast } = useToast()
  // 1. Define your form.
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    try {
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_PORT}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          console.log(res.ok)
          console.log(data)

          throw data
        }
        console.log(res.ok)

        console.log(data)

        return data
      })
      console.log(res)
      toast({
        title: 'Chúc mừng',
        description: 'Bạn đã đăng nhập thành công'
      })
    } catch (error: any) {
      // Khi có error thì sẽ trả về một obj lỗi như này
      // {
      //   message: 'Lỗi xảy ra khi xác thực dữ liệu...',
      //   errors: [ { field: 'password', message: 'Email hoặc mật khẩu không đúng' } ],
      //   statusCode: 422
      // }
      const listErrors = error.errors as {
        field: string
        message: string
      }[]

      if (error.statusCode === 422) {
        listErrors.forEach((err) => {
          form.setError(err.field as 'email' | 'password', {
            type: 'server',
            message: err.message
          })
        })
      } else {
        toast({
          title: 'Lỗi!',
          description: error.message,
          variant: 'destructive'
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 max-w-[600px] flex-shrink-0 w-full'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='mt-8 w-full'>
          Đăng nhập
        </Button>
      </form>
    </Form>
  )
}
