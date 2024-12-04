import React, { ReactNode } from 'react'

import NumberInput from 'theme/Input/NumberInput'
import { InputProps, NumberInputProps } from 'theme/Input/types'
import { Box, Type } from 'theme/base'
import { SxProps } from 'theme/types'

const NumberInputField = ({
  label,
  block,
  sx,
  ...props
}: {
  label: ReactNode
} & NumberInputProps &
  SxProps &
  InputProps) => {
  return (
    <Box width={block ? '100%' : 'auto'} sx={sx}>
      <Type.Hairline2 color={props.hasError ? 'red1' : 'neutral4'} mb="12px">
        {label}
      </Type.Hairline2>
      <NumberInput {...props} block={block} />
    </Box>
  )
}

export default NumberInputField
