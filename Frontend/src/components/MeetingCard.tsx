import { FC } from 'react'
import { Meeting } from '../types/meeting'
import { User } from 'lucide-react'
import { dateToHHMMFormatter } from '../lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import Button from './ui/Button'
import { Trash2, PenSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface MeetingCardProps {
  meeting: Meeting
}

const MeetingCard: FC<MeetingCardProps> = ({ meeting }) => {
  const navigate = useNavigate()
  const onEdit = () => navigate('/schedule?state=edit')

  return (
    <div className='relative w-full rounded-md px-4 py-2 text-black border border-gray-100'>
      <div className='flex gap-3 text-lg'>
        <span className='font-semibold min-w-[120px]'>
          {dateToHHMMFormatter(new Date(meeting.startDate))} -{' '}
          {dateToHHMMFormatter(new Date(meeting.endDate))}
        </span>
        <p className='font-medium'>{meeting.title}</p>
      </div>
      <ul className='pl-5 mt-1 text-base cursor-default'>
        {meeting.persons.length > 0 &&
          meeting.persons.map((m, i) => (
            <li key={i}>
              <TooltipProvider>
                <Tooltip defaultOpen={false}>
                  <TooltipTrigger className='flex items-center gap-1'>
                    <User className='w-4 h-4 mr-1' strokeWidth={3} />
                    {m.name}
                  </TooltipTrigger>
                  <TooltipContent className='cursor-default'>
                    <ul>
                      <li className='flex justify-between gap-3'>
                        <span>Name:</span> <span>{m.name}</span>
                      </li>
                      <li className='flex justify-between gap-3'>
                        <span>Phone:</span> <span>{m.phoneNumber}</span>
                      </li>
                      <li className='flex justify-between gap-3'>
                        <span>License plate:</span>{' '}
                        <span>
                          {m.licensePlate || 'No license plate provided.'}
                        </span>
                      </li>
                      <li className='flex justify-between gap-3'>
                        <span>Role:</span> <span>{m.role}</span>
                      </li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
      </ul>
      <div className='absolute right-3 bottom-3 flex'>
        <Button onClick={onEdit} className='bg-white hover:bg-white group'>
          <PenSquare className='w-4 h-4 text-gray-700 group-hover:text-orange-500 transition-colors' />
        </Button>
        <Button className='bg-white hover:bg-white group'>
          <Trash2 className='w-4 h-4 text-gray-700 group-hover:text-rose-500 transition-colors' />
        </Button>
      </div>
    </div>
  )
}

export default MeetingCard
