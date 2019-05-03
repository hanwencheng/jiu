import React from 'react'
import { Link, graphql, navigate } from 'gatsby'
import PropTypes from 'prop-types'
import { FlexCenter } from '../components/basics'
import { Text, Box } from 'rebass'
import strings from '../constants/strings'
import { fadeIn, fadeOut, flip } from 'react-animations'
import {
  IoIosArrowDown,
} from 'react-icons/io'
import styled, { keyframes } from 'styled-components'
import { secondary } from '../utils/colors'

const AnimatedArrow = styled(IoIosArrowDown)`
  transform: ${props => props.flip ?  "rotateX(180deg)" : ""};
  animation: keyframes(flip) 0.5s;
  transition: transform 0.5s;
`

const Title = ({ onClick, className, text, withIcon, isListOpen }) => (
  <FlexCenter className={className} my={3} onClick={() => onClick()}>
    <Text fontSize={[2, 3]}>{text}</Text>
    {withIcon && (
      <FlexCenter mx={2}>
        <AnimatedArrow flip={isListOpen}/>
      </FlexCenter>
    )}
  </FlexCenter>
)

const HoverTitle = styled(Title)`
  :hover {
    color: ${secondary};
    cursor: pointer;
  }
  transition: color 0.2s linear;
`

const ReceiptList = ({ className, list, onClick }) => (
  <FlexCenter className={className} flexDirection="column">
    {list.map(node => {
      return (
        <FlexCenter key={node.name}>
          <HoverTitle text={node.name} onClick={() => onClick(node.name)} />
        </FlexCenter>
      )
    })}
  </FlexCenter>
)

const AnimateReceiptList = styled(ReceiptList)`
  visibility: ${props => props.show ?  'visible': 'hidden'};
  animation: ${props => props.show ?  keyframes(fadeIn) : keyframes(fadeOut)} 0.5s;
  display: inline-block;
  transition: visibility 0.5s;
`

export default class ReceiptLeftBar extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isListOpen: false,
    }
  }

  handleOnTitleClick() {
    const currentOpenState = this.state.isListOpen
    this.setState({ isListOpen: !currentOpenState })
  }

  render() {
    const { list } = this.props

    return (
      <FlexCenter>
        <Box>
          <HoverTitle
            onClick={() => this.handleOnTitleClick()}
            text={strings.RECEIPT_TITLE}
            withIcon
            isListOpen={this.state.isListOpen}
          />
          <AnimateReceiptList
            show={this.state.isListOpen}
            list={list}
            onClick={receiptName => this.props.onClick(receiptName)}
          />
        </Box>
      </FlexCenter>
    )
  }
}
