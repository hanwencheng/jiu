import React from 'react'
import { Box, Button, Flex, Heading, Text } from 'rebass'
import { navigate } from 'gatsby'
import appConstant from '../constants/appConstant'
import favicon from '../../static/favicon.ico'
import { Header } from './basics'
import { ThemeProvider } from 'styled-components'
import theme from '../utils/theme'

export default class Navigation extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Flex py={1} mb={1} flexDirection="row">
          <Flex flexDirection="row" width={1 / 2}>
            {/*<Image source={favicon}>*/}
            <Text>{appConstant.name}</Text>
            <Text>{appConstant.slogan}</Text>
          </Flex>
          <Flex
            display="flex"
            mt={1}
            flexDirection="row"
            justifyContent="flex-end"
            width={1 / 2}
          >
            <Button variant="secondary" onClick={() => navigate('/')}>
              Home
            </Button>
            <Button ml={1} variant="secondary" onClick={() => navigate('/receiptCalculator')}>
              Receipt Calculator
            </Button>
            <Button ml={1} variant="secondary" onClick={() => navigate('/docs')}>
              Docs
            </Button>
          </Flex>
        </Flex>
      </ThemeProvider>
    )
  }
}
