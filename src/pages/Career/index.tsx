import { Trans } from '@lingui/macro'
import { useEffect, useMemo, useRef } from 'react'
import { useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

import MainContainer from 'components/layouts/PublicLayout/MainContainer'
import SideBarWeb, { SideBarMobile } from 'components/layouts/PublicLayout/SideBarContainer'
import useCareers from 'hooks/query/career/useCareers'
import { TabType } from 'pages/types'
import { TabsType } from 'pages/types'
import Loading from 'theme/Loading'
import { Box } from 'theme/base'
import ROUTES from 'utils/routes'

import { CareerOutletContextData } from './types'

const initialTabs: TabsType = [{ key: 0, path: '', value: <Trans>INTRODUCTION</Trans> }]

function Career() {
  // get job tab.path from url
  const { job } = useParams()
  // const { pathname } = useLocation()
  const navigate = useNavigate()
  // get all jobs then map to initialTabs
  const { data, isLoading } = useCareers()
  const tabs = useMemo(() => {
    const result: TabsType = [...initialTabs]
    data?.forEach((item: any, index: number) => {
      const tab: TabType = {
        value: formatTitleSidebar(item.title),
        queryId: item.id,
        path: genPath(item.title),
        key: index + 1,
      }
      result.push(tab)
    })
    return result
  }, [data])

  // define currentTab: tab.key from job: tab.path and tabs
  const [currentTab, setCurrentTab] = useState(0)
  const jobId = tabs[currentTab].queryId
  const currentCareer = data?.find((_d) => _d.id === jobId)

  // useEffect(() => {
  //   if (pathname !== ROUTES.CAREER.path) return
  //   if (!job) setCurrentTab(0)
  // }, [pathname, job])

  const firstLoaded = useRef(false)
  useEffect(() => {
    if (isLoading) return
    if (!isLoading && data) {
      if (firstLoaded.current) {
        navigate(tabs[currentTab].path ? ROUTES.CAREER.path + '/' + tabs[currentTab].path : ROUTES.CAREER.path, {
          replace: true,
        })
      } else {
        firstLoaded.current = true
        const tab = tabs.find((tab) => {
          return tab.path === job
        })
        if (!tab) return
        setCurrentTab(tab.key)
        navigate(ROUTES.CAREER.path + '/' + tab.path, {
          replace: true,
        })
      }
    }
    //eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [currentTab, isLoading, data])
  const sideBarClickHandler = (tab: TabType) => {
    setCurrentTab(tab.key)
  }

  const goNextHandler = (timeoutRef?: React.MutableRefObject<any>) => {
    setCurrentTab((prev) => {
      if (timeoutRef) {
        timeoutRef.current = null
      }
      if (prev >= tabs.length - 1) {
        return prev
      }
      return prev + 1
    })
  }
  const goPrevHandler = (timeoutRef?: React.MutableRefObject<any>) => {
    setCurrentTab((prev) => {
      if (timeoutRef) {
        timeoutRef.current = null
      }
      if (prev <= 0) {
        return prev
      }
      return prev - 1
    })
  }

  const outletContext: CareerOutletContextData = {
    careerDetails: currentCareer,
  }
  const component = () => <Outlet context={outletContext} />

  const sideBarWeb = () => {
    return <SideBarWeb tabs={tabs} currentTab={currentTab} onTabChange={sideBarClickHandler} />
  }
  const sideBarMobile = () => {
    return <SideBarMobile tabs={tabs} currentTab={currentTab} onTabChange={sideBarClickHandler} />
  }

  if (isLoading)
    return (
      <Box mt={4}>
        <Loading />
      </Box>
    )

  return (
    <MainContainer
      tabs={tabs}
      currentTab={currentTab}
      sideBarWeb={sideBarWeb}
      sideBarMobile={sideBarMobile}
      content={component}
      goNextHandler={goNextHandler}
      goPrevHandler={goPrevHandler}
    />
  )
}

function formatTitleSidebar(title: string) {
  return title.trim().toUpperCase()
  // let newTitle = title.trim()
  // if (newTitle === 'frontend developer' || newTitle === 'backend developer') {
  //   newTitle += '.ts'
  // } else if (newTitle === 'devops') {
  //   newTitle += '.yaml'
  // }
  // const newTitleArray = newTitle.split(' ').map((title) => capitalizeFirstLetter(title))
  // return newTitleArray.join('')
}
function genPath(str: string) {
  return str
    .split(' ')
    .filter((value) => !!value)
    .join('-')
    .toLowerCase()
}

// function capitalizeFirstLetter(str: string) {
//   return str.charAt(0).toUpperCase() + str.slice(1)
// }

export default Career
