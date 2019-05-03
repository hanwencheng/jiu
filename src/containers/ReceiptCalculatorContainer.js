import React, { Component } from 'react'
import _ from 'lodash'
import Element from '../components/Element'
import update from 'react-addons-update'
import { units } from '../constants/brewConstants'
import { calculate } from '../modules/calculator/calculator'
import { Box, Flex } from 'rebass'
import PropTypes from 'prop-types'
import {
  BasicButton,
  HalfBox,
  Title,
  FlexCenter,
  Separator,
} from '../components/basics'
import { InputNumber, Input } from '../components/Input'

const ElementBox = props => <FlexCenter {...props} width={1 / 5} />

export default class ReceiptCalculatorContainer extends Component {
  static propTypes = {
    selectedReceipt: PropTypes.string,
    list: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      gallon: 5,
      liter: 30,
      elements: {
        ipa: {
          name: 'ipa',
          inValue: 0,
          outValue: 0,
          unit: units.pound.name,
        },
      },
      addName: 'element name',
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedReceipt, list } = this.props
    if (prevProps.selectedReceipt === selectedReceipt) return
    if (_.isEmpty(selectedReceipt)) return

    const receiptData = _.find(list, { name: selectedReceipt })
    if (_.isEmpty(receiptData)) return

    this.setState({
      elements: _.reduce(
        receiptData.elements,
        (acc, element) =>
          _.assign(acc, {
            [element.name]: {
              name: element.name,
              inValue: element.value,
              outValue: 0,
              unit: units[element.unit].name,
            },
          }),
        {}
      ),
    })
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

    const onElementDelete = name => {
      this.setState(prevState => {
        return {
          elements: _.cloneDeep(_.omit(prevState.elements, name)),
        }
      })
    }

    const onElementChange = (name, value) => {
      this.setState(prevState => {
        return {
          elements: update(prevState.elements, {
            [name]: { inValue: { $set: value } },
          }),
        }
      })
    }

    const onElementUnitChange = (name, value) => {
      this.setState(prevState => {
        return {
          elements: update(prevState.elements, {
            [name]: { unit: { $set: value } },
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
                name: id,
                inValue: 0,
                outValue: 0,
                unit: units.pound.name,
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

    const ListItems = () => (
      <React.Fragment>
        {_.values(this.state.elements).map(element => (
          <Element
            {...element}
            key={element.name}
            onChange={onElementChange}
            onDelete={onElementDelete}
            onUnitChange={onElementUnitChange}
          />
        ))}
      </React.Fragment>
    )

    return (
      <div>
        <FlexCenter justifyContent="center">
          <BasicButton m={3} onClick={onCalculate}>
            Calculate
          </BasicButton>
        </FlexCenter>

        <Separator />

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
        </FlexCenter>

        <Separator />
        <ListItems />
      </div>
    )
  }
}
