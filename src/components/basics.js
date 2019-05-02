import styled from 'styled-components'
import { Box, Button, Text, Flex } from 'rebass'
import React from 'react'

export const Header = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${p => p.theme.colors.lightgray};
`

export const Container = styled(Box)`
  max-width: 720px;
  margin: 0 auto;
`

export const FlexCenter = props => <Flex {...props} alignItems='center'/>

export const BasicButton = props => <Button {...props} />

export const HalfBox = props => <Box {...props} width={[1 / 2, 1 / 2, 1 / 4]} />

export const Title = props => (
  <Text {...props} fontSize={[1, 2]} fontWeight="bold" textAlign="center">
    {props.name}
  </Text>
)
