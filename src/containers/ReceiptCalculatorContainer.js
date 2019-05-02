import React, { Component } from 'react'
import _ from 'lodash'
import Element from '../components/Element'
import update from 'react-addons-update'
import { units } from '../constants/brewConstants'
import { calculate } from '../modules/calculator/calculator'
import { Box, Flex } from 'rebass'
import {
  BasicButton,
  HalfBox,
  Title,
  FlexCenter,
  Separator,
} from '../components/basics'
import { InputNumber, Input } from '../components/Input'

const ElementBox = props => (
  <FlexCenter {...props} width={1 / 5}/>
)

export default class ReceiptCalculatorContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gallon: 5,
      liter: 30,
      elements: {
        ipa: {
          id: 'ipa',
          name: 'ipa',
          inValue: 0,
          outValue: 0,
          unit: units.pounds.name,
        },
      },
      addName: 'element name',
    }
  }

  render() {
    const onInputChange = value => {
      this.setState({ gallon: value })
    }

    const onOutputChange = value => {
      this.setState({ liter: value })
    }

    const onAddNameChange = e => {
      this.setState({ addName: e.target.value })
    }

    const onElementDelete = id => {
      this.setState(prevState => {
        return {
          elements: _.cloneDeep(_.omit(prevState.elements, id)),
        }
      })
    }

    const onElementChange = (id, value) => {
      this.setState(prevState => {
        return {
          elements: update(prevState.elements, {
            [id]: { inValue: { $set: value } },
          }),
        }
      })
    }

    const onElementUnitChange = (id, value) => {
      this.setState(prevState => {
        return {
          elements: update(prevState.elements, {
            [id]: { unit: { $set: value } },
          }),
        }
      })
    }

    const onAddElement = () => {
      this.setState(prevState => {
        const name = this.state.addName
        const id = name.trim()
        return {
          elements: _.cloneDeep(
            _.assign(prevState.elements, {
              [id]: {
                id,
                name,
                inValue: 0,
                outValue: 0,
                unit: units.pounds.name,
              },
            })
          ),
        }
      })
    }

    const onCalculate = () => {
      this.setState(prevState => {
        const newElements = _.mapValues(prevState.elements, (v, k) => {
          const newValue = _.cloneDeep(v)
          newValue.outValue = calculate(
            this.state.gallon,
            this.state.liter,
            v.inValue,
            v.unit
          )
          return newValue
        })
        return { elements: newElements }
      })
    }

    const listItems = _.values(this.state.elements).map(element => (
      <Element
        {...element}
        key={element.id}
        onChange={onElementChange}
        onDelete={onElementDelete}
        onUnitChange={onElementUnitChange}
      />
    ))

    return (
      <div>
        <FlexCenter justifyContent="center">
          <BasicButton m={3} onClick={onCalculate}>
            Calculate
          </BasicButton>
        </FlexCenter>
        <FlexCenter p={1}>
          <ElementBox>
            <InputNumber value={this.state.gallon} onChange={onInputChange} />
          </ElementBox>
          <ElementBox>
            <Title name="Gallon" />
          </ElementBox>
          <ElementBox>
            <Title name="->>" />
          </ElementBox>
          <ElementBox>
            <InputNumber value={this.state.liter} onChange={onOutputChange} />
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

          <Separator />
        </FlexCenter>
        {listItems}
      </div>
    )
  }
}
