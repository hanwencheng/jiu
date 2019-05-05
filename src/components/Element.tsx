import * as React from "react";
import { units } from '../constants/brewConstants'
import { Box, Flex } from 'rebass'
import { BasicButton, Title, FlexCenter } from './basics'
import _ from 'lodash'
import { InputNumber } from './Input'
import { SelectBasic } from './Select'
import { upperCased } from '../utils/stringUtils'
import { bindActionCreators } from 'redux'
import { receiptAction } from '../state/receiptActions'
import { connect } from 'react-redux'
import { ElementData } from '../../types/receipt'

interface ElementProps {
  element: ElementData,
  updateElement: typeof receiptAction.updateElement,
  deleteElement: typeof receiptAction.deleteElement,
}

class Element extends React.Component<ElementProps> {

  render() {
    delete units['__filemeta']
    const options = _.map(units, unit => ({
      key: unit.name,
      value: upperCased(unit.name),
    }))
    const { element, updateElement, deleteElement } = this.props

    const PaddingBox = props => <FlexCenter {...props} p={1} /*width={1/4}*/ />
    return (
      <Flex p={1} justifyContent="space-between">
        <PaddingBox>
          <InputNumber
            value={element.inValue}
            onChange={value => {
              const elementData = _.assign({}, element, { inValue: value })
              updateElement(element.name, elementData)
            }}
          />
        </PaddingBox>
        <PaddingBox>
          <SelectBasic
            options={options}
            value={element.unit}
            onChange={value => {
              const elementData = _.assign(element, { unit: value })
              updateElement(element.name, elementData)
            }}
          />
        </PaddingBox>
        <PaddingBox>
          <Title name={element.outValue + ' g'} />
        </PaddingBox>
        <PaddingBox width={1 / 4}>
          <Title name={element.name} />
        </PaddingBox>

        <PaddingBox mr={0}>
          <BasicButton onClick={() => deleteElement(element.name)}>delete</BasicButton>
        </PaddingBox>
      </Flex>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = _.curry(bindActionCreators)({
  updateElement: receiptAction.updateElement,
  deleteElement: receiptAction.deleteElement,
  addElement: receiptAction.addElement,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Element)
