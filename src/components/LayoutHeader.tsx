import { Heading, Flex, Image, Box, Button } from 'rebass'
import _ from 'lodash'
import React, { useState } from 'react'
import { Header } from './basics'
import logoImage from '../../static/icons/gopherBeerLogo.png'
import { IoIosMenu } from 'react-icons/io'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut, flip } from 'react-animations'
import { navigate } from 'gatsby'

interface Props {
  title: string
  subtitle: string
}

interface showProps {
  show: boolean
}

const MenuIcon = styled(IoIosMenu)`
  font-size: ${props => props.theme.fontSizes[5] }
`
const MenuList = ({ className }) => (
  <Flex className={className} mt={1} flexDirection="column" justifyContent="space-around" width={1}>
    <Button m={2} variant="secondary" onClick={() => navigate('/')}>
      Home
    </Button>
    <Button
      m={2}
      variant="secondary"
      onClick={() => navigate('/receiptCalculator')}
    >
      Receipt Calculator
    </Button>
    <Button
      ml={2}
      variant="secondary"
      onClick={() => navigate('/ibuCalculator')}
    >
      IBU Calculator
    </Button>
    <Button m={2}variant="secondary" onClick={() => navigate('/docs')}>
      Docs
    </Button>
  </Flex>
)

const AnimateMenuList = styled(MenuList)<showProps>`
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  animation: ${props => (props.show ? keyframes(fadeIn) : keyframes(fadeOut))}
    0.5s;
  display: inline-block;
  transition: visibility 0.5s;
  position: absolute;
  right: 100px;
  top: 20px;
`

const RightFlex = styled(Flex)`
  position: absolute;
  right: 0;
`

export default function LayoutHeader<Props>({ title, subtitle }) {
  const [isMenuOpen, setMenuVisible] = useState<boolean>(false)

  console.log('is menu opened', isMenuOpen)

  return (
    <Header py={3} mb={4}>
      <Flex px={2}>
        <Image src={logoImage} height={100} />
      </Flex>
      <Flex px={2} flexDirection={'column'} alignItems="center">
        <Heading fontSize={[5, 6]}>{title}</Heading>
        {!_.isEmpty(subtitle) && (
          <Heading fontWeight={400}>{subtitle}!</Heading>
        )}
      </Flex>
      <RightFlex
        pr={3}
        alignSelf={'center'}
        onClick={() => setMenuVisible(!isMenuOpen)}
      >
        <MenuIcon size={32}/>
        <AnimateMenuList show={isMenuOpen} />
      </RightFlex>
    </Header>
  )
}
