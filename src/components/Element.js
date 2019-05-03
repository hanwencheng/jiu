import React, { Component } from 'react'
import { units } from '../constants/brewConstants'
import { Box, Flex } from 'rebass'
import { BasicButton, Title, FlexCenter } from './basics'
import _ from 'lodash'
import { InputNumber } from './Input'
import { SelectBasic } from './Select'
import { upperCased } from '../utils/stringUtils'

const Element = ({
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

  const PaddingBox = props => <FlexCenter {...props} p={1} />

  return (
    <Flex p={1} justifyContent="space-between">
      <PaddingBox>
        <InputNumber
          value={inValue}
          onChange={value => onChange(name, value)}
        />
      </PaddingBox>
      <PaddingBox>
        <SelectBasic
          options={options}
          value={unit}
          onChange={value => {
            onUnitChange(name, value)
          }}
        />
      </PaddingBox>
      <PaddingBox>
        <Title name={outValue + ' g'} />
      </PaddingBox>
      <PaddingBox width={1 / 4}>
        <Title name={name} />
      </PaddingBox>

      <PaddingBox mr={0}>
        <BasicButton onClick={() => onDelete(name)}>delete</BasicButton>
      </PaddingBox>
    </Flex>
  )
}

export default Element
