import { Person } from "./person"

export type Meeting = {
  title: string
  persons: Person[]
  startDate: Date
  endDate: Date
}