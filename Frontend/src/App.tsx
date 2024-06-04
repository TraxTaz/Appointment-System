import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import SchedulePage from './components/pages/SchedulePage'
import Providers from './components/Providers'
import Layout from './components/pages/Layout'

const router = createBrowserRouter([
  {path: '/', element: <Navigate to='/login' />},
  {path: '/login', element: <LoginPage />},
  {path: '/schedule', element: <Layout />, children: [
    { index: true, element: <SchedulePage />}
  ]}
])

function App() {

  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}

export default App
