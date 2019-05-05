import { Box } from 'rebass'
import React from 'react';

interface SelectBasicProps {
  onChange: Function,
  value: string,
  options: Array<any>,
}

export class SelectBasic extends React.Component<SelectBasicProps> {

  render() {
    const { options, onChange, value } = this.props
    return (
      <Box>
        <select onChange={event => onChange(event.target.value)} value={value}>
          {options.map((option, i) => (
            <option value={option.key} key={option.key}>
              {option.value}
            </option>
          ))}
        </select>
      </Box>
    )
  }
}
