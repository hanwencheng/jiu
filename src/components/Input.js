import React, { Component } from 'react'
import { Box } from 'rebass'
import PropTypes from 'prop-types'

export class Input extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = { value: props.value || '' }
  }

  handleChange(event) {
    const { onChange } = this.props
    this.setState({ value: event.target.value })
    return onChange(event.target.value)
  }

  render() {
    return (
      <Box>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </Box>
    )
  }
}

export class InputNumber extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { value: props.value || 0 }
  }

  handleChange(event) {
    const { onChange, min, max } = this.props
    let value = event.target.value
    if (value < min) {
      value = min
    } else if (value > max) {
      value = max
    }
    this.setState({ value })
    return onChange(value)
  }

  render() {
    return (
      <Box>
        <input
          type="number"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </Box>
    )
  }
}