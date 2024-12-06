//==============================================================================
// STATIC DATA
//==============================================================================
export interface PageType {
  key: number
  value: string
  path: string
}
export type PagesType = PageType[]

export interface TabType {
  key: number
  value: string | JSX.Element
  name?: string
  queryId?: string
  path?: string
}
export type TabsType = TabType[]

export type ContentComponentsType = {
  [index: string]: JSX.Element
}

//==============================================================================
// APPLYFORM
//==============================================================================
export interface ApplyFormValue {
  jobId: string
  name: string
  email: string
  phoneNumber: string
  cvLink: string
  linkedinUrl?: string
  websiteUrl?: string
}

export interface CareerData {
  id: string
  title: string
  description: string
  location: string
  jobType: string
  isOpen: boolean
  isFullTime: boolean
  createdAt: string
  updatedAt: string
}
