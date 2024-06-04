import { useContext } from "react"
import { EmployeeSearchContext } from "../context/EmployeeSearchProvider"

export const useEmployeeSearch = () => {
  return useContext(EmployeeSearchContext)
}