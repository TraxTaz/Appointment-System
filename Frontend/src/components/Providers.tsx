import { FC, ReactNode } from 'react'
import { Toaster } from 'sonner'
import EmployeeSearchProvider from '../context/EmployeeSearchProvider'

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <Toaster position='top-center' richColors />
      <EmployeeSearchProvider>{children}</EmployeeSearchProvider>
    </>
  )
}

export default Providers
