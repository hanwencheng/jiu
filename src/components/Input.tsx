import { Box } from 'rebass'
import styled from 'styled-components'
import * as React from "react";
import _ from 'lodash'

const NumberInputContainer = styled(Box)`
  max-width: 80px;
`

const NumberInputBar = styled.input`
  text-align: center;
`

type InputProps = {
  onChange: Function,
  value: string,
}

type InputState = {
  value: string
}

export class Input extends React.Component<InputProps, InputState> {

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

type InputNumberProps = {
  onChange: Function,
  value: number,
  min: number,
  max: number
}

type InputNumberState = {
  value: number
}

export class InputNumber extends React.Component<InputNumberProps, InputNumberState> {

  static defaultProps = {
    min: 0,
    max: 10000,
    value: 0,
  }

  constructor(props) {
    super(props)
    this.state = {value: this.props.value}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { min, max } = this.props
    let value = parseFloat(event.target.value)
    if (_.isNaN(value)) value = 0

    if (value < min) {
      value = min
    } else if (value > max) {
      value = max
    }
    this.setState({value})
  }

  render() {
    return (
      <NumberInputContainer justifyContent="center" alignItems="center">
        <NumberInputBar
          type="number"
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={()=>this.props.onChange(this.state.value)}
        />
      </NumberInputContainer>
    )
  }
}
