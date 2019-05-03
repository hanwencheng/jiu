import React, { Component } from 'react'
import { Box } from 'rebass'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const NumberInputContainer = styled(Box)`
  max-width: 80px;
`

const NumberInputBar = styled.input`
  text-align: center;
`

export class Input extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = { value: props.value || '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { onChange } = this.props
    this.setState({ value: event.target.value })
    return onChange(event.target.value)
  }

  render() {
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
      />
    )
  }
}

export class InputNumber extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
  }

  static defaultProps = {
    min: 0,
    max: 10000,
    value: 0,
  }

  constructor(props) {
    super(props)
    this.state = { value: props.value }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { onChange, min, max } = this.props
    let value = parseFloat(event.target.value)
    if (_.isNaN(value)) value = 0

    if (value < min) {
      value = min
    } else if (value > max) {
      value = max
    }
    if (value === this.state.value) return
    this.setState({ value })
    return onChange(value)
  }

  render() {
    return (
      <NumberInputContainer justifyContent="center" alignItems="center">
        <NumberInputBar
          type="number"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </NumberInputContainer>
    )
  }
}
