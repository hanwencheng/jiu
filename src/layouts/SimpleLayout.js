import React from 'react'

import { Heading } from 'rebass'
import { ThemeProvider } from 'styled-components'
import { navigate } from 'gatsby'
import theme from '../utils/theme'

import { Container, Header, Separator } from '../components/basics'
import Navigation from '../components/Navigation'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Footer } from '../components/Footer'
import LayoutHeader from '../components/LayoutHeader'

export default class SimpleLayout extends React.Component {
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
          <LayoutHeader title={title} subtitle={subtitle}/>
          <Container>
            <main>{children}</main>
            <Separator />
            <Footer />
          </Container>
        </React.Fragment>
      </ThemeProvider>
    )
  }
}
