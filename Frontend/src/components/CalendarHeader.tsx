import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import { FC } from 'react'

interface CalendarHeaderProps {
  month: string
  year: number
  changeMonth: (flag: boolean) => void
}

const CalendarHeader: FC<CalendarHeaderProps> = ({month, year, changeMonth}) => {
  return <div className='flex justify-between mb-2 text-5xl font-semibold text-gray-700'>
  <div>
    <span className='mr-2 uppercase'>
      {month}
    </span>
    <span>{year}</span>
  </div>
  <div className='flex gap-3'>
    <button
      className='hover:bg-gray-100'
      onClick={() => changeMonth(false)}
    >
      <ArrowBigLeft className='w-12 h-12 text-gray-700 cursor-pointer' />
    </button>
    <button
      className='hover:bg-gray-100'
      onClick={() => changeMonth(true)}
    >
      <ArrowBigRight className='w-12 h-12 text-gray-700 cursor-pointer' />
    </button>
  </div>
</div>
}

export default CalendarHeader