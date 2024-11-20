import { z } from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_API_PORT: z.string()
})

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_PORT: process.env.NEXT_PUBLIC_API_PORT
})
if (!configProject.success) {
  throw new Error('Các giá trị khai báo trong file .env không hợp lệ')
}

const envConfig = configProject.data
export default envConfig
