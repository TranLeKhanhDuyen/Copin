import { useQuery } from 'react-query'

import { getCareersApi } from 'apis/careerApis'

export interface Career {
  id: string
  title: string
  description: string
  department?: string
  location?: string
}

interface CareersResponse {
  data: Career[]
}

const useCareers = () => {
  const queryResult = useQuery<CareersResponse, Error>(['careers'], getCareersApi)

  const getCurrentCareer = (id: string) => queryResult.data?.data.find((career) => career.id === id)

  return { ...queryResult, getCurrentCareer }
}

export default useCareers
