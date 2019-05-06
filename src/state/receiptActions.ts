import { ElementData, ElementsHashMap, VolumeData } from '../../types/receipt'

export const receiptActionsType = {
  ADD_ELEMENT: 'RECEIPT_ADD_ELEMENT',
  DELETE_ELEMENT: 'RECEIPT_DELETE_ELEMENT',
  UPDATE_ELEMENT: 'RECEIPT_UPDATE_ELEMENT',
  LOAD_ELEMENTS: 'RECEIPT_LOAD_ELEMENTS',
  CLEAR_ELEMENTS: 'RECEIPT_CLEAR_ELEMENTS',
  UPDATE_INPUT_VOLUME: 'RECEIPT_UPDATE__INPUT_VOLUME',
  UPDATE_OUTPUT_VOLUME: 'RECEIPT_UPDATE_OUTPUT_VOLUME',
}

export const receiptAction = {
  addElement: (element: ElementData) => ({
    type: receiptActionsType.ADD_ELEMENT,
    element,
  }),
  deleteElement: (elementName: string) => ({
    type: receiptActionsType.DELETE_ELEMENT,
    elementName,
  }),
  updateElement: (elementName: string, elementData: ElementData) => ({
    type: receiptActionsType.UPDATE_ELEMENT,
    elementName,
    elementData,
  }),
  loadElements: (elements: ElementsHashMap, volumeData: VolumeData) => ({
    type: receiptActionsType.LOAD_ELEMENTS,
    elements,
    volumeData,
  }),
  clearElements: () => ({ type: receiptActionsType.CLEAR_ELEMENTS }),
  updateInputVolume: (volume: number) => {
    debugger
    return {
      type: receiptActionsType.UPDATE_INPUT_VOLUME,
      volume,
    }
  },
  updateOutputVolume: (volume: number) => ({
    type: receiptActionsType.UPDATE_OUTPUT_VOLUME,
    volume,
  }),
}
