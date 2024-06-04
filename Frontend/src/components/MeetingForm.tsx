import { FC } from 'react'
import Button from './ui/Button'
import { PlusCircle, Trash2 } from 'lucide-react'
import { z } from 'zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetQueryParam } from '../hooks/useGetQueryParam'
import { useEmployeeSearch } from '../hooks/useEmployeeSearch'

const memberSchema = z.object({
  name: z.string().min(3, { message: 'Required' }),
  phone: z
    .string()
    .min(1, { message: 'Required' })
    .regex(
      /^\+?[0-9]{1,3}?[-. ]?(\([0-9]{1,3}\)|[0-9]{1,3})?[-. ]?[0-9]{1,4}[-. ]?[0-9]{1,4}[-. ]?[0-9]{1,9}$/,
      { message: 'Phone is invalid.' }
    ),
  plate: z.string().optional(),
})

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Required' })
    .max(50, { message: 'Title must be max 50 characters long.' }),
  date: z.string().min(1, { message: 'Required' }),
  startsAt: z.string().min(1, { message: 'Required' }),
  endsAt: z.string().min(1, { message: 'Required' }),
  employee: z.string().min(1, { message: 'Required' }),
  members: z.array(memberSchema),
})

type FormData = z.infer<typeof formSchema>

type FormAction = 'create' | 'update'

interface MeetingFormProps {
  date: number,
  month: number, 
  year: number,
  action: FormAction
}

const hours: string[] = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
]

const MeetingForm: FC<MeetingFormProps> = ({date, month, year}) => {
  const { employee } = useEmployeeSearch()
  const getQueryParam = useGetQueryParam()
  const state = getQueryParam('state')
  const selectedDate = new Date()
  selectedDate.setDate(date)
  selectedDate.setMonth(month)
  selectedDate.setFullYear(year)
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee: employee?.name || 'No Employee selected',
      date: selectedDate.toISOString().split('T')[0],
      members: [{ name: '', phone: '', plate: '' }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  })
  const onSubmit = (data: FormData) => console.log(data)
  const addMember = () => {
    append({ name: '', phone: '', plate: '' })
  }
  const removeMember = (index: number) => {
    remove(index)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-xl w-full bg-white overflow-y-auto max-h-[700px]'
    >
      <div className='flex flex-col gap-1 mt-4'>
        <label
          htmlFor='title'
          className='font-sm font-semibold text-gray-700 mb-2'
        >
          Title:
        </label>
        <input
          type='text'
          placeholder='Title'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlie'
          {...register('title')}
        />
        {errors.title && (
          <p className='text-sm text-rose-600 font-medium mt-1'>
            {errors.title.message}
          </p>
        )}
      </div>
      <div className='flex flex-col gap-1 mt-4'>
        <label
          htmlFor='title'
          className='font-sm font-semibold text-gray-700 mb-2'
        >
          Date:
        </label>
        <input
          disabled
          type='date'
          placeholder='Title'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlie'
          {...register('date')}
        />
        {errors.date && (
          <p className='text-sm text-rose-600 font-medium mt-1'>
            {errors.date.message}
          </p>
        )}
      </div>
      <div className='flex items-start gap-3 mt-4'>
        <div className='flex justify-center flex-col gap-1'>
          <label
            htmlFor='start'
            className='font-sm font-semibold text-gray-700 mb-2'
          >
            Starts at:
          </label>

          <select
            {...register('startsAt')}
            className='w-20 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlie'
          >
            {hours.length && hours.map((h) => <option value={h}>{h}</option>)}
          </select>
          {errors.startsAt && (
            <p className='text-sm text-rose-600 font-medium mt-1'>
              {errors.startsAt.message}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='end'
            className='font-sm font-semibold text-gray-700 mb-2'
          >
            Ends at:
          </label>
          <select
            defaultValue={'09:00'}
            {...register('endsAt')}
            className='w-20 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlie'
          >
            {hours.length && hours.map((h) => <option value={h}>{h}</option>)}
          </select>
          {errors.endsAt && (
            <p className='text-sm text-rose-600 font-medium mt-1'>
              {errors.endsAt.message}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-1 flex-1'>
          <label
            htmlFor='title'
            className='font-sm font-semibold text-gray-700 mb-2'
          >
            Employee:
          </label>
          <input
            disabled
            type='text'
            placeholder='Employee'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlie'
            {...register('employee')}
          />
          {errors.employee && (
            <p className='text-sm text-rose-600 font-medium mt-1'>
              {errors.employee.message}
            </p>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-1 mt-4'></div>
      {fields.length &&
        fields.map((f, index) => (
          <div key={index} className='relative flex flex-col gap-1 mt-4 pr-14'>
            <div>
              <label
                htmlFor='title'
                className='font-sm font-semibold text-gray-700'
              >
                Member {index + 1}:
              </label>
              <input
                key={index}
                type='text'
                {...register(`members.${index}.name`)}
                placeholder={`Name`}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlie'
              />
              {errors.members?.[index]?.name && (
                <p className='text-sm text-rose-600 font-medium mt-1'>
                  {errors.members?.[index]?.name?.message}
                </p>
              )}
            </div>
            <div className='flex gap-3'>
              <div className='w-3/5'>
                <label
                  htmlFor='title'
                  className='font-sm font-semibold text-gray-700 mb-2'
                >
                  Phone:
                </label>
                <input
                  type='text'
                  {...register(`members.${index}.phone`)}
                  placeholder={`Phone`}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlie'
                />
                {errors.members?.[index]?.phone && (
                  <p className='text-sm text-rose-600 font-medium mt-1'>
                    {errors.members?.[index]?.phone?.message}
                  </p>
                )}
              </div>
              <div className='w-2/5'>
                <label
                  htmlFor='title'
                  className='font-sm font-semibold text-gray-700 mb-2'
                >
                  License Plate:
                </label>
                <input
                  type='text'
                  {...register(`members.${index}.plate`)}
                  placeholder={`Plate`}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlie'
                />
                {errors.members?.[index]?.plate && (
                  <p className='text-sm text-rose-600 font-medium mt-1'>
                    {errors.members?.[index]?.plate?.message}
                  </p>
                )}
              </div>
            </div>
            <Button
              type='button'
              onClick={() => removeMember(index)}
              className='absolute right-0 top-[50%] hover:bg-white group'
              variant='ghost'
            >
              <Trash2 className='w-6 h-6 group-hover:text-rose-500 text-gray-700 transition-colors' />
            </Button>
          </div>
        ))}
      <div className='flex items-center justify-center'>
        <Button
          variant='ghost'
          type='button'
          className='rounded-full px-2 hover:bg-white group'
          onClick={addMember}
        >
          <PlusCircle className='w-6 h-6 text-gray-700 group-hover:text-orange-500 transition-colors' />
        </Button>
      </div>
      <div className='flex items-center justify-center mt-5'>
        <Button type='submit'>
          {state === 'add' ? 'Add' : 'Edit'} meeting
        </Button>
      </div>
    </form>
  )
}

export default MeetingForm
