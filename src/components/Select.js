import React from 'react'
import { Box } from 'rebass'
import PropTypes from 'prop-types'

export const SelectBasic = class SelectBasic extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    options: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.options = []
  }

  render() {
    const { options, onChange, value } = this.props
    return (
      <Box>
        <select onChange={event => onChange(event.target.value)} value={value}>
          {options.map((option, i) => (
            <option value={options.key} key={i}>
              {option.value}
            </option>
          ))}
        </select>
      </Box>
    )
  }
}
