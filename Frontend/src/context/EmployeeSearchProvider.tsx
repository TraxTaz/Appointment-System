import { Dispatch, FC, ReactNode, SetStateAction, createContext, useState } from 'react'
import { Person } from '../types/person'

interface EmployeeSearchContextType {
  employee: Person | undefined
  setEmployee: Dispatch<SetStateAction<Person | undefined>>
}

// = undefined
let defaultValue

export const EmployeeSearchContext = createContext<EmployeeSearchContextType>(
  { employee: defaultValue, setEmployee: () => {}}
)

interface EmployeeSearchProviderProps {
  children: ReactNode
}

const EmployeeSearchProvider: FC<EmployeeSearchProviderProps> = ({children}) => {
  const [employee, setEmployee] = useState<Person | undefined>()
  return (
    <EmployeeSearchContext.Provider value={{ employee, setEmployee}}>{children}</EmployeeSearchContext.Provider>
  )
}

export default EmployeeSearchProvider
