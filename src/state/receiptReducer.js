import { receiptActionsType } from './receiptActions'
import _ from 'lodash'
import { units, volumeUnits } from '../constants/brewConstants'

export const INIT_VALUE = {
  elements: {
    ipa: {
      name: 'ipa',
      inValue: 10,
      outValue: 0,
      unit: units.ounce.name,
    },
  },
  input: { volume: 5, unit: volumeUnits.gallon.name },
  output: { volume: 30, unit: volumeUnits.liter.name },
}

export const receiptReducer = (state = INIT_VALUE, action) => {
  switch (action.type) {
    case receiptActionsType.ADD_ELEMENT: {
      const elements = _.assign({}, state.elements, {
        [action.element.name]: action.element,
      })
      return {
        ...state,
        elements,
      }
    }
    case receiptActionsType.DELETE_ELEMENT: {
      const elements = _.omit(state, action.elementName)
      return {
        ...state,
        elements,
      }
    }
    case receiptActionsType.UPDATE_ELEMENT: {
      const elements = _.merge({}, state.elements, {
        [action.elementName]: action.elementData,
      })
      return {
        ...state,
        elements,
      }
    }
    case receiptActionsType.LOAD_ELEMENTS: {
      return {
        ...state,
        elements: action.elements,
        volume: action.volume,
      }
    }
    case receiptActionsType.CLEAR_ELEMENTS: {
      return INIT_VALUE
    }
    case receiptActionsType.UPDATE_INPUT_VOLUME: {
      return {
        ...state,
        input: { volume: action.volume, unit: INIT_VALUE.input.unit },
      }
    }
    case receiptActionsType.UPDATE_OUTPUT_VOLUME: {
      return {
        ...state,
        output: { volume: action.volume, unit: INIT_VALUE.output.unit },
      }
    }

    default:
      return state
  }
}
