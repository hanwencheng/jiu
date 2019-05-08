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
import LayoutHeader from '../components/LayoutHeader'

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
          <LayoutHeader title={title} subtitle={subtitle} />
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
