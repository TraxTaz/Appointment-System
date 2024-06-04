import { FC, useState } from 'react'
import Calendar from '../Calendar'
import { Combobox } from '../ui/Combobox'
import MeetingForm from '../MeetingForm'

interface SchedulePageProps {}

const SchedulePage: FC<SchedulePageProps> = ({}) => {
  const [selectedEmplId, setSelectedEmplId] = useState<number | undefined>()

  // fetch the select employee with his schedule if the the id is defined

  return (
    <div className='flex justify-center flex-col items-center gap-8 w-full mt-14'>
      {/* <MeetingForm /> */}
      <div className='flex justify-center items-center gap-14'>
        <h1 className='text-3xl text-gray-700 font-semibold '>
          Selected employee:
        </h1>
        <Combobox setSelectedEmplId={setSelectedEmplId} />
      </div>
      <Calendar />
    </div>
  )
}

export default SchedulePage
