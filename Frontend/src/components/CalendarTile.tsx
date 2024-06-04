import { FC, HTMLAttributes } from 'react'
import { cn } from '../lib/utils'
import { useEmployeeSearch } from '../hooks/useEmployeeSearch'
import { Meeting } from '../types/meeting'

interface CalendarTileProps extends HTMLAttributes<HTMLDivElement> {
  year: number
  month: number
  meetings: Meeting[]
  showDate: boolean
  index: number
  firstDayOfMonthWeekDayIndex: number
}

const CalendarTile: FC<CalendarTileProps> = ({showDate, meetings, year, month, index, firstDayOfMonthWeekDayIndex, className, ...props}) => {
  const { employee } = useEmployeeSearch()
  const date = index - firstDayOfMonthWeekDayIndex + 2
  // TODO: Test how many times the component is rendered
  // console.log(employee?.name)
  console.log(meetings);
  console.log( meetings.length && typeof meetings[0].startDate);
  console.log(meetings.length && new Date(meetings[0].startDate));
  
  
  
  const meetingsForTheDayCount = meetings.filter(
    (m) =>
      new Date(m.startDate).getFullYear() === year &&
      new Date(m.startDate).getMonth() === month &&
      new Date(m.startDate).getDate() === date
  ).length
  

  return <div
  key={index}
  className={cn(
    'flex justify-between items-end pb-3 pr-2 pt-2 flex-col w-[200px] h-[100px] shadow-sm', className
  )}
  {...props}
>
  {showDate && (
    <span className='text-lg'>
      {date}
    </span>
  )}
  {meetingsForTheDayCount > 0 && (
    <span className='flex justify-center items-center h-6 w-6 rounded-full font-bold  bg-orange-500 text-white'>
      {meetingsForTheDayCount}
    </span>
  )}
</div>
}

export default CalendarTile