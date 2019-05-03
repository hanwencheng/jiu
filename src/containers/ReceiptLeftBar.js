import React from 'react'
import { Link, graphql, navigate } from 'gatsby'
import PropTypes from 'prop-types'
import { FlexCenter } from '../components/basics'
import { Text, Box } from 'rebass'
import strings from '../constants/strings'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import styled from 'styled-components'

const Title = ({ onClick, className, text, withIcon }) => (
  <FlexCenter className={className} my={3} onClick={() => onClick()}>
    <Text fontSize={[2, 3]}>{text}</Text>
    {withIcon && (
      <FlexCenter mx={2}>
        <IoIosArrowDown />
      </FlexCenter>
    )}
  </FlexCenter>
)

const HoverTitle = styled(Title)`
  :hover {
    color: lightgrey;
    cursor: pointer;
  }
`

const ReceiptList = ({ list, onClick }) => (
  <FlexCenter flexDirection="column">
    {list.map(node => {
      return (
        <FlexCenter key={node.name}>
          <HoverTitle text={node.name} onClick={() => onClick(node.name)} />
        </FlexCenter>
      )
    })}
  </FlexCenter>
)

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
          />
          {this.state.isListOpen && (
            <ReceiptList
              list={list}
              onClick={receiptName => this.props.onClick(receiptName)}
            />
          )}
        </Box>
      </FlexCenter>
    )
  }
}
