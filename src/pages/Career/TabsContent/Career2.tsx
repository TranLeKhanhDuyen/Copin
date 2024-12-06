import parser from 'html-react-parser'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import styled from 'styled-components/macro'

import home_1 from 'assets/images/home_1.png'
import ApplyButton from 'components/common/ApplyButton'
import LargeHeading from 'components/common/LargeHeading'
import PublicTabContentContainer from 'components/common/PublicTabContentContainer'
import Spacer from 'components/common/Spacer'
import ApplyForm from 'components/layouts/PublicLayout/ApplyForm'
import Modal from 'theme/Modal'
import { Box, Flex } from 'theme/base'

import { CareerOutletContextData } from '../types'

const HorBar = styled(Box)`
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #08e6a5 0%, #27daf6 32.29%, #3e8aff 64.06%, rgba(62, 138, 255, 0) 100%);
  opacity: 0.5;
  transform: matrix(1, 0, 0, -1, 0, 0);
`
const ContentContainer = styled(Box)`
  max-width: 850px;
  & p {
    margin-bottom: 32px;
  }
  & h3 {
    font-size: 24px;
    margin-bottom: 24px;
  }
  & ul {
    margin-bottom: 32px;
  }
  & li {
    display: block;
    position: relative;
    padding-left: 16px;
    margin-bottom: 12px;
  }
  & li::after {
    position: absolute;
    content: '';
    top: 10px;
    left: 0;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: white;
  }
`

function Career2() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalOpenHandler = () => {
    setIsModalOpen((prev) => !prev)
  }

  const { careerDetails } = useOutletContext<CareerOutletContextData>()
  const heading = careerDetails ? formatTitle(careerDetails.title) : ''

  return (
    <>
      <PublicTabContentContainer image={home_1}>
        <Flex
          maxWidth="850px"
          flexDirection={['column', 'column', 'row', 'row']}
          alignItems={['', '', 'center', 'center']}
          justifyContent={['', '', 'space-between', 'space-between']}
          sx={{ gap: '24px' }}
        >
          <LargeHeading hasUnderline>{heading}</LargeHeading>
          <ApplyButton onClick={modalOpenHandler}>Apply</ApplyButton>
        </Flex>
        <Spacer mb={4} />
        <ContentContainer>{!!careerDetails?.description && parser(careerDetails.description)}</ContentContainer>
        <Modal maxWidth="850px" isOpen={isModalOpen} onDismiss={modalOpenHandler} hasClose title={'APPLY'}>
          <HorBar mb={['16px', '32px']} mt={['0', '16px']} />
          <ApplyForm jobId={careerDetails?.id || ''} onDismiss={modalOpenHandler} />
        </Modal>
      </PublicTabContentContainer>
    </>
  )
}

function formatTitle(title: string) {
  const newTitle = title.trim().toLowerCase()
  const newTitleArray = newTitle.split(' ').map((title) => capitalizeFirstLetter(title))
  return newTitleArray.join(' ')
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default Career2
