import React, { Component } from 'react'
import _ from 'lodash'
import Element from '../components/Element'
import update from 'react-addons-update'
import { units } from '../constants/brewConstants'
import { calculate } from '../modules/calculator/calculator'
import { bindActionCreators } from 'redux'
import request from 'axios'

import PropTypes from 'prop-types'
import {
  BasicButton,
  HalfBox,
  Title,
  FlexCenter,
  Separator,
} from '../components/basics'
import { InputNumber, Input } from '../components/Input'
import DynamicListItem from '../components/DynamicListItem'
import { connect } from 'react-redux'
import { receiptAction } from '../state/receiptActions'

const ElementBox = props => <FlexCenter {...props} width={1 / 5} />

class ReceiptCalculatorContainer extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    inputVolume: PropTypes.number.isRequired,
    outputVolume: PropTypes.number.isRequired,
    elements: PropTypes.object.isRequired,

    updateInputVolume: PropTypes.func.isRequired,
    updateOutputVolume: PropTypes.func.isRequired,
    addElement: PropTypes.func.isRequired,
    loadElements: PropTypes.func.isRequired,
    clearElements: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      addName: 'element name',
      addReceiptName: 'new receipt',
    }
  }

  render() {
    const onAddNameChange = v => {
      this.setState({
        addName: v,
      })
    }

    const onAddReceiptNameChange = v => {
      this.setState({
        addReceiptName: v,
      })
    }

    const onAddElement = () => {
      const { addElement } = this.props
      const name = this.state.addName
      const id = name.trim()
      addElement({
        name: id,
        inValue: 0,
        outValue: 0,
        unit: units.pound.name,
      })
    }

    const onCalculate = () => {
      const { elements, inputVolume, outputVolume, loadElements } = this.props
      this.setState(prevState => {
        const newElements = _.mapValues(elements, (v, k) => {
          const newValue = _.cloneDeep(v)
          newValue.outValue = calculate(
            inputVolume,
            outputVolume,
            v.inValue,
            v.unit
          )
          return newValue
        })
        loadElements(newElements, {value: inputVolume, unit: units.gallon.name})
      })
    }
    
    const onSave = () => {
      const { addReceiptName } = this.state
      const { inputVolume, elements, clearElements } = this.props
      if(_.isEmpty(addReceiptName.trim()) || _.isEmpty(elements))
        return console.log('is not validate schema')
      const data = {
        name: addReceiptName,
        volume: {
          value: inputVolume,
          unit: 'gallon',
        },
        elements: _.map(elements, element => ({
          name: element.name,
          value: element.inValue,
          unit: element.unit,
        })),
      }

      request
        .post('http://127.0.0.1:3000/receipt', data)
        .then(function(response) {
          console.log(response)
          this.setState({
            addReceiptName: '',
          })
          clearElements()
        })
        .catch(function(error) {
          console.log(error)
        })

    }

    const {
      inputVolume,
      outputVolume,
      updateInputVolume,
      updateOutputVolume,
    } = this.props
    return (
      <div>
        <FlexCenter justifyContent="center">
          <BasicButton m={3} onClick={onCalculate}>
            Calculate
          </BasicButton>

          <HalfBox m={3}>
            <Input
              value={this.state.addReceiptName}
              onChange={onAddReceiptNameChange}
            />
          </HalfBox>

          <BasicButton m={3} onClick={onSave}>
            Save Receipt
          </BasicButton>
        </FlexCenter>

        <Separator />

        <FlexCenter p={1}>
          <ElementBox>
            <InputNumber value={inputVolume} onChange={updateInputVolume} />
          </ElementBox>
          <ElementBox>
            <Title name="Gallon" />
          </ElementBox>
          <ElementBox>
            <Title name="->>" />
          </ElementBox>
          <ElementBox>
            <InputNumber value={outputVolume} onChange={updateOutputVolume} />
          </ElementBox>
          <ElementBox>
            <Title name="Liter" />
          </ElementBox>
        </FlexCenter>

        <FlexCenter py={4} justifyContent="center">
          <HalfBox mx={3}>
            <Input value={this.state.addName} onChange={onAddNameChange} />
          </HalfBox>
          <HalfBox mx={3}>
            <BasicButton onClick={onAddElement}>Add Element</BasicButton>
          </HalfBox>
        </FlexCenter>

        <Separator />
        <DynamicListItem />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  inputVolume: state.receipt.input.value,
  outputVolume: state.receipt.output.value,
  elements: state.receipt.elements,
})

const mapDispatchToProps = _.curry(bindActionCreators)({
  updateInputVolume: receiptAction.updateInputVolume,
  updateOutputVolume: receiptAction.updateOutputVolume,
  addElement: receiptAction.addElement,
  loadElements: receiptAction.loadElements,
  clearElements: receiptAction.clearElements,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceiptCalculatorContainer)
