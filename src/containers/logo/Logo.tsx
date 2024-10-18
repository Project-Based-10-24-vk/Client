import { FC } from 'react'

import Box, { BoxProps } from '@mui/material/Box'
import logoLight from '~/assets/logo-light.svg'
import logo from '~/assets/logo.svg'
import { ComponentEnum } from '~/types'

interface LogoProps extends BoxProps {
  light?: boolean
}

const Logo: FC<LogoProps> = ({ light = false, ...props }) => (
  <Box
    alt='logo'
    component={ComponentEnum.Img}
    src={light ? logoLight : logo}
    {...props}
  />
)

export default Logo
