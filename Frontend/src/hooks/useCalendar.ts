import { useState } from 'react'

export function useCalendar() {
  const [date, setDate] = useState<Date>(new Date())
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  date.setDate(1)
  const firstDayOfMonthWeekDayIndex = date.getDay() % 7 || 7

  const tiles = Array(42).fill(null)
  const month = date.getMonth()

  const year = date.getFullYear()
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate()

  const changeMonth = (flag: boolean) => {
    const newDate = new Date(year, month)
    if (flag) {
      if (month == 12) {
        newDate.setFullYear(year + 1)
        newDate.setMonth(1)
      } else {
        newDate.setMonth(month + 1)
      }
    } else {
      if (month == 1) {
        newDate.setFullYear(year - 1)
        newDate.setMonth(12)
      }
      newDate.setMonth(month - 1)
    }

    setDate(newDate)
  }

  return {
    date,
    setDate,
    firstDayOfMonthWeekDayIndex,
    lastDayOfMonth,
    month,
    year,
    tiles,
    monthNames,
    daysOfWeek,
    changeMonth,
  }
}
