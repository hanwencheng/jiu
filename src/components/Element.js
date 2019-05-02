import React, { Component } from 'react'
import { units } from '../constants/brewConstants'
import { Flex, Box } from 'rebass'
import { BasicButton, Title } from './basics'
import _ from 'lodash'
import { InputNumber } from './Input'
import { SelectBasic } from './Select'
import { upperCased } from '../utils/stringUtils'

const Element = ({
  id,
  name,
  inValue,
  outValue,
  unit,
  onChange,
  onDelete,
  onUnitChange,
}) => {
  const placeholder = `please input ${name}`
  const options = _.map(units, element => ({
    key: element.name,
    value: upperCased(element.name),
  }))

  return (
    <Flex p={1}>
      <Box span={6}>
        <Title name={name} />
      </Box>
      <Box span={4}>
        <InputNumber
          placeholder={placeholder}
          value={inValue}
          onChange={value => onChange(id, value)}
        />
      </Box>
      <Box span={4}>
        <SelectBasic
          options={options}
          value={unit}
          onChange={value => onUnitChange(id, value)}
        />
      </Box>
      <Box span={4}>
        <Title name={outValue + ' g'} />
      </Box>
      <Box span={4}>
        <BasicButton onClick={() => onDelete(id)}>delete</BasicButton>
      </Box>
    </Flex>
  )
}

export default Element
