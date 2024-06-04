import { useLocation } from 'react-router-dom'

export const useGetQueryParam = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const getQueryParam = (param: string) => queryParams.get(param)

  return getQueryParam
}
