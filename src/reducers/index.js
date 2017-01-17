import { combineReducers } from 'redux'

const elementList = [
	{
        id: 1,
        elementType: 'OneColumnContainer',
        contentType: 'LAYOUT',
        name: 'One Column'
    },
    {
        id: 2,
        elementType: 'Text',
        contentType: 'CONTENT',
        name: 'Text'
    }
]

function elements(state = elementList, action) {
	switch(action.type) {
		default:
			return state
	}
}

function canvasElements(state = [], action) {
	switch(action.type) {
		case 'ADD_ELEMENT_TO_CANVAS':
			return [
				...state,
		        action.element
			]
		default:
			return state
	}
	return state;
}


const emailApp = combineReducers({
	elements,
  	canvasElements
})

export default emailApp