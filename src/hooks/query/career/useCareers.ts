import { useQuery } from 'react-query'

import { getCareerApi, getCareersApi } from 'apis/careerApis'

const useCareers = (jobId?: string) => {
  return useQuery(['careers', jobId], () => (jobId ? getCareerApi(jobId) : getCareersApi()))
}
export default useCareers
