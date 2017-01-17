export const ADD_ELEMENT_TO_CANVAS = 'ADD_ELEMENT_TO_CANVAS'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_LAYOUT: 'SHOW_LAYOUT',
  SHOW_CONTENT: 'SHOW_CONTENT'
}

/**
 * @param {[Object]} whole element being added to canvas
 * @return { [Object] } returns action object that represents action being dispatched and element object
 */
export function addElementToCanvas(element) {
	console.log('ADD_ELEMENT_TO_CANVAS', element)
  	return { type: ADD_ELEMENT_TO_CANVAS, element }
}

/**
 * @param {string} 
 * @return { Object } returns action object that represents action being dispatched with data about filter
 */
export function setVisibilityFilter(filter) {
	console.log('SET_VISIBILITY_FILTER', filter)
  	return { type: SET_VISIBILITY_FILTER, filter }
}
