import requester from 'apis'
import { MutationFunction } from 'react-query'

import { ApplyFormValue, CareerData } from 'pages/types'

import { UploadFileResponseSuccess } from './api'

export const getCareersApi = () => requester.get('/jobs/page').then((res) => res.data?.data as CareerData[])

export const getCareerApi = (id: string) => requester.get(`/jobs/${id}`).then((res) => res.data)

export const uploadFileApi: MutationFunction<UploadFileResponseSuccess, FormData> = (formData) =>
  requester
    .post('_upload_service/document', formData, {
      timeout: 30000,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data)
export const applyCareerApi: MutationFunction<never, ApplyFormValue> = (data) =>
  requester.post('_blog_service/cv', data).then((res) => res.data as never)
