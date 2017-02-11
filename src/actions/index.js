export const ADD_COLUMN = 'ADD_COLUMN'
export const ADD_CONTENT = 'ADD_CONTENT'
export const MOVE_ELEMENT = 'MOVE_ELEMENT'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_LAYOUT: 'SHOW_LAYOUT',
  SHOW_CONTENT: 'SHOW_CONTENT'
}

let nextElementId = 0
/**
 * @param {[Object]} whole element being added to canvas
 * @return { [Object] } returns action object that represents action being dispatched and element object
 */
export function addElementToCanvas(element) {
	console.log('element', element)
  	return { 
  		type: ADD_COLUMN, 
  		id: ++nextElementId,
  		name: element.name,
  		elementType: element.elementType,
  		contentType: element.contentType,
  		styles: element.styles,
  		accepts: element.accepts,
  		appCtx: 'CANVAS'
  	}
}

export function addContentToColumn(sourceEl, targetEl) {
  sourceEl.id = ++nextElementId
    return { type: ADD_CONTENT, sourceEl, targetEl }
}

export function moveElement(dragIndex, hoverIndex) {
	return { type: MOVE_ELEMENT, dragIndex, hoverIndex }
}

/**
 * @param {string} 
 * @return { Object } returns action object that represents action being dispatched with data about filter
 */
export function setVisibilityFilter(filter) {
	console.log('SET_VISIBILITY_FILTER', filter)
  	return { type: SET_VISIBILITY_FILTER, filter }
}
