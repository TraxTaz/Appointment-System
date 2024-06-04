import { FC } from 'react'
import { Meeting } from '../types/meeting'
import Button from './ui/Button'
import MeetingCard from './MeetingCard'
import { useNavigate } from 'react-router-dom'
import { useEmployeeSearch } from '../hooks/useEmployeeSearch'

interface MeetingsListProps {
  meetings: Meeting[]
  date: number
  month: number
  year: number
}

const MeetingsList: FC<MeetingsListProps> = ({
  meetings,
  date,
  month,
  year,
}) => {
  const navigate = useNavigate()
  const onClick = () => navigate('/schedule?state=add')
  const filteredMeetings = meetings.filter(
    (m) =>
      new Date(m.startDate).getFullYear() === year &&
      new Date(m.startDate).getMonth() === month &&
      new Date(m.startDate).getDate() === date
  )

  return (
    <>
      <div className='flex flex-col gap-3 max-h-[800px] overflow-y-auto'>
        {filteredMeetings.length ? (
          filteredMeetings.map((m, i) => <MeetingCard key={i} meeting={m} />)
        ) : (
          <p className='w-full text-center text-xl text-gray-700'>
            No meetings scheduled.
          </p>
        )}
      </div>
      <div className='flex justify-center pt-5'>
        <Button onClick={onClick}>Add a meeting</Button>
      </div>
    </>
  )
}

export default MeetingsList
