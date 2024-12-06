import { useQuery } from 'react-query'

import { getCareersApi } from 'apis/careerApis'
import { CareerData } from 'pages/types'

const useCareers = () => useQuery<CareerData[], Error>(['careers'], () => getCareersApi())

export default useCareers
