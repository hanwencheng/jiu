import React from 'react'

import { Button, Box, Heading } from 'rebass'
import { ThemeProvider } from 'styled-components'
import { navigate } from 'gatsby'
import theme from '../utils/theme'
import { rhythm } from '../utils/typography'
import { Container, Header } from './basics'
import appConstant from '../constants/appConstant'
import Navigation from './Navigation'
import PropTypes from 'prop-types'
import _ from 'lodash';

class Layout extends React.Component {
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
          <Header py={5} mb={5}>
            <Heading fontSize={[5, 6]}>{title}</Heading>
            {!_.isEmpty(subtitle) && <Heading fontWeight={400}>{subtitle}!</Heading>}
          </Header>
          <Container>
            <main>{children}</main>
            <hr
              style={{
                marginTop: rhythm(1),
                marginBottom: rhythm(1),
              }}
            />
            <Box as="footer" mb={4}>
              © {new Date().getFullYear()}, Built By
              {` `}
              <a href="http://www.hanwencheng.com">Hanwen Cheng</a>
            </Box>
          </Container>
        </React.Fragment>
      </ThemeProvider>
    )
  }
}

export default Layout
