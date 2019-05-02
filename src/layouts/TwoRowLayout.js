import React from 'react'

import { Flex, Heading, Box } from 'rebass'
import { ThemeProvider } from 'styled-components'
import { navigate } from 'gatsby'
import theme from '../utils/theme'

import { Container, Header, Separator } from '../components/basics'
import Navigation from '../components/Navigation'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Footer } from '../components/Footer'

export default class TwoRowLayout extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
  }

  render() {
    const { children, title, subtitle } = this.props
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Navigation />
          <Header py={5} mb={2}>
            <Heading fontSize={[5, 6]}>{title}</Heading>
            {!_.isEmpty(subtitle) && (
              <Heading fontWeight={400}>{subtitle}!</Heading>
            )}
          </Header>
          <Flex>
            <Box width={1 / 4}>{children[0]}</Box>
            <Box width={1 / 2}>
              <main>{children[1]}</main>
              <Separator />
              <Footer />
            </Box>
            <Box width={1 / 4} />
          </Flex>
        </React.Fragment>
      </ThemeProvider>
    )
  }
}
