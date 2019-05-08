import { Heading, Flex, Image, Box } from 'rebass'
import _ from 'lodash'
import React from 'react'
import { Header } from './basics'
import favicon from '../../static/icons/gopherLogo.png'
import { IoIosMenu } from 'react-icons/io'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut, flip } from 'react-animations'

interface Props {
  title: string
  subtitle: string
}

interface showProps {
  show: boolean
}

const MenuIcon = styled(IoIosMenu)`
  
`
const MenuList = () => <Box></Box>

const AnimateMenuList = styled(MenuList)<showProps>`
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  animation: ${props => (props.show ? keyframes(fadeIn) : keyframes(fadeOut))}
    0.5s;
  display: inline-block;
  transition: visibility 0.5s;
`

const RightFlex = styled(Flex)`
  position: absolute;
  right: 0;
`

export default class LayoutHeader extends React.Component<Props> {
  render() {
    const { title, subtitle } = this.props
    return (
        <Header py={4} mb={2} >
          <Flex px={2}>
            <Image src={favicon} height={80}/>
          </Flex>
          <Flex px={2} flexDirection={"column"} alignItems="center">
            <Heading fontSize={[5, 6]}>{title}</Heading>
            {!_.isEmpty(subtitle) && (
              <Heading fontWeight={400}>{subtitle}!</Heading>
            )}
          </Flex>
          <RightFlex pr={3} alignSelf={"center"}>
            <MenuIcon/>
          </RightFlex>
        </Header>
    )
  }
}
