import { FC, useEffect, useState } from 'react'
import { useCalendar } from '../hooks/useCalendar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog'
import CalendarHeader from './CalendarHeader'
import CalendarTile from './CalendarTile'
import { Meeting } from '../types/meeting'
import { Person } from '../types/person'
import MeetingForm from './MeetingForm'
import MeetingsList from './MeetingsList'
import { useNavigate } from 'react-router-dom'
import { useGetQueryParam } from '../hooks/useGetQueryParam'
import { useEmployeeSearch } from '../hooks/useEmployeeSearch'
import AppointmentAPI from '../api/AppointmentAPI'

interface CalendarProps {}
// const dummyPersons: Person[] = [
//   {
//     name: 'Donald Trump',
//     phoneNumber: '+31616022126',
//     licensePlate: '69HH69',
//     role: 'Customer',
//     id: 1,
//   },
//   {
//     name: 'John Jhones',
//     phoneNumber: '+31563636743',
//     licensePlate: 'SM3SH',
//     role: 'Customer',
//     id: 2,
//   },
// ]

// const dummyMeetings: Meeting[] = [
//   {
//     title: 'Super secret project',
//     members: dummyPersons,
//     start: new Date(2023, 10, 13, 9),
//     end: new Date(2023, 10, 13, 10),
//   },
//   {
//     title: 'Not so secret project',
//     members: dummyPersons,
//     start: new Date(2023, 10, 13, 10),
//     end: new Date(2023, 10, 13, 11),
//   },
//   {
//     title: 'I have no idea',
//     members: dummyPersons,
//     start: new Date(2023, 10, 13, 14),
//     end: new Date(2023, 10, 13, 15),
//   },
// ]

const Calendar: FC<CalendarProps> = ({}) => {
  const {
    date,
    firstDayOfMonthWeekDayIndex,
    lastDayOfMonth,
    month,
    year,
    tiles,
    monthNames,
    daysOfWeek,
    changeMonth,
  } = useCalendar()
  const [selectedDate, setSelectedDate] = useState<number>()
  const navigate = useNavigate()
  const getQueryParam = useGetQueryParam()
  const state = getQueryParam('state')
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const { employee } = useEmployeeSearch()

  useEffect(() => {
    if (employee) {
      AppointmentAPI.getAppointmentsByEmployeeId(employee.id).then((res) => {
        setMeetings(res.data.meetings)
      })
    }
  }, [employee])
  console.log(meetings);
  
  return (
    <>
      <Dialog onOpenChange={() => navigate('/schedule?state=view')}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='mb-6 text-xl'>
              {state === 'view'
                ? `Scheduled meetings for: ${selectedDate}/${month + 1}/${year}`
                : state === 'add'
                ? 'Add meeting'
                : 'Edit meeting'}
            </DialogTitle>
            {state === 'view' ? (
              <MeetingsList
                meetings={meetings}
                date={selectedDate!}
                month={month}
                year={year}
              />
            ) : state === 'add' ? (
              <MeetingForm
                date={selectedDate!}
                month={month}
                year={year}
                action='create'
              />
            ) : (
              <MeetingForm
                date={selectedDate!}
                month={month}
                year={year}
                action='update'
              />
            )}
          </DialogHeader>
        </DialogContent>
        <div>
          <CalendarHeader
            month={monthNames[date.getMonth()]}
            year={year}
            changeMonth={changeMonth}
          />
          <div className='grid grid-cols-7 gap-1'>
            {daysOfWeek &&
              daysOfWeek.map((d) => (
                <div
                  key={d}
                  className='flex justify-end items-end w-[200px] text-2xl font-medium'
                >
                  {d.slice(0, 3)}
                </div>
              ))}
            {tiles &&
              tiles.map((t, i) => {
                const date: number = i - firstDayOfMonthWeekDayIndex + 2
                const showDate: boolean = date > 0 && date <= lastDayOfMonth
                return showDate ? (
                  <DialogTrigger key={i} onClick={() => setSelectedDate(date)}>
                    <CalendarTile
                      meetings={meetings}
                      year={year}
                      month={month}
                      showDate={showDate}
                      firstDayOfMonthWeekDayIndex={firstDayOfMonthWeekDayIndex}
                      index={i}
                      className='bg-gray-300 cursor-pointer transition-colors hover:bg-orange-300'
                    />
                  </DialogTrigger>
                ) : (
                  <CalendarTile
                    meetings={meetings}
                    year={year}
                    month={month}
                    showDate={showDate}
                    firstDayOfMonthWeekDayIndex={firstDayOfMonthWeekDayIndex}
                    index={i}
                    key={i}
                    className='bg-gray-100'
                  />
                )
              })}
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default Calendar
