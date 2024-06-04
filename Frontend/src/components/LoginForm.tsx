import { FC } from 'react'
import Button from './ui/Button'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long!' }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,50}$/,
      {
        message:
          'Password must have 1 lower case, 1 upper case, 1 special symbol and be at least 8 characters long!',
      }
    ),
})

type FormData = z.infer<typeof schema>

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = (data: FormData) => {
    console.log(data)
    navigate('/schedule?state=view')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-md w-full bg-white px-8 py-6 shadow-md rounded-md z-10 border-t-2 border-gray-100'
    >
      <h3 className='w-full text-center text-lg font-semibold'>
        Sign in to your <span className='text-orange-500'>Sioux</span> account:
      </h3>
      <div className='flex flex-col gap-1 mt-4'>
        <label
          htmlFor='username'
          className='font-sm font-semibold text-gray-700 mb-2'
        >
          Username:
        </label>
        <input
          type='text'
          placeholder='Username'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlie'
          {...register('username')}
        />
        {errors.username && (
          <p className='text-sm text-rose-600 font-medium mt-1'>
            {errors.username.message}
          </p>
        )}
      </div>
      <div className='flex flex-col gap-1 mt-4'>
        <label
          htmlFor='password'
          className='font-sm font-semibold text-gray-700 mb-2'
        >
          Password:
        </label>
        <input
          type='password'
          placeholder='Password'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlie'
          {...register('password')}
        />
        {errors.password && (
          <p className='text-sm text-rose-600 font-medium mt-1'>
            {errors.password.message}
          </p>
        )}
      </div>
      <div className='flex justify-center mt-6'>
        <Button type='submit' className='w-[50%]'>
          Sign in
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
