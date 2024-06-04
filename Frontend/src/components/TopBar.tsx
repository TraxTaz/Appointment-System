import { FC } from 'react'
import siouxLogo from '../assets/sioux-logo.svg'

interface TopBarProps {}

const TopBar: FC<TopBarProps> = ({}) => {
  return (
    <div className='flex items-center h-28 w-full shadow-md p-3'>
      <img src={siouxLogo} alt='sioux logo' className='h-20' />
    </div>
  )
}

export default TopBar
