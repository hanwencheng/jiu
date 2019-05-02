import { Box } from 'rebass'
import React from 'react'

export const Footer = props => (
  <Box as="footer" mb={4}>
    © {new Date().getFullYear()}, Built By
    {` `}
    <a href="http://www.hanwencheng.com">Hanwen Cheng</a>
  </Box>
)
