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
  addElement: element => ({ type: receiptActionsType.ADD_ELEMENT, element }),
  deleteElement: elementName => ({
    type: receiptActionsType.DELETE_ELEMENT,
    elementName,
  }),
  updateElement: (elementName, elementData) => ({
    type: receiptActionsType.UPDATE_ELEMENT,
    elementName,
    elementData,
  }),
  loadElements: (elements, volume) => ({
    type: receiptActionsType.LOAD_ELEMENTS,
    elements,
    volume,
  }),
  clearElements: () => ({ type: receiptActionsType.CLEAR_ELEMENTS }),
  updateInputVolume: volume => {
    debugger;
    return ({
      type: receiptActionsType.UPDATE_INPUT_VOLUME,
      volume,
    })
  },
  updateOutputVolume: volume => ({
    type: receiptActionsType.UPDATE_OUTPUT_VOLUME, volume,
  }),
}
