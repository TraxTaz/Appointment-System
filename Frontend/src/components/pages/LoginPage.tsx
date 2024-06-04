import { FC } from 'react'
import siouxLogo from '../../assets/sioux-logo.svg'
import LoginForm from '../LoginForm'

interface LoginPageProps {
  
}

const LoginPage: FC<LoginPageProps> = ({}) => {
  return <div className='flex justify-evenly items-center w-full h-screen overflow-hidden relative px-16 2xl:gap-[300px] bg-orange-500'>
    <div className="flex justify-center items-center absolute left-[-500px] top-[-500px] w-[1600px] h-[1600px] bg-white rounded-full shadow-md" />
      <img src={siouxLogo} alt='sioux logo' className='z-10 w-[900px]' />
      <LoginForm />
  </div>
}

export default LoginPage