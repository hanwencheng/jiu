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
  value: string
}

export class InputNumber extends React.Component<InputNumberProps, InputNumberState> {

  static defaultProps = {
    min: 0,
    max: 10000,
    value: "",
  }

  constructor(props) {
    super(props)
    this.state = {value: this.props.value.toString()}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { min, max } = this.props
    if(event.target.value === "")
      return this.setState({value: ""})

    let isValidateInput = /^\d*\.?\d*\.?$/.test(event.target.value);
    if(!isValidateInput) return;

    let value = parseFloat(event.target.value)
    if (_.isNaN(value)) return

    if (value < min) {
      value = min
    } else if (value > max) {
      value = max
    } else {
      value = event.target.value
    }

    this.setState({value: value.toString()})
  }

  render() {
    return (
      <NumberInputContainer justifyContent="center" alignItems="center">
        <NumberInputBar
          type="text"
          value={this.state.value.toString()}
          onChange={this.handleChange}
          onBlur={()=>{
            const number = parseFloat(_.isEmpty(this.state.value) ? "0" : this.state.value)
            this.props.onChange(number)
          }}
        />
      </NumberInputContainer>
    )
  }
}
