import { combineReducers } from 'redux'
import { ItemTypes } from './../components/Constants'

const elementList = [
	{
        id: 1,
        elementType: 'OneColumnContainer',
        contentType: 'LAYOUT',
        name: 'One Column',
        styles: {
        	flex: 1,
			height: 204,
			lineHeight: '40px',
			backgroundColor: '#d5d5d5',
            borderWidth: 2,
			borderStyle: 'solid',
            borderColor: '#CC00FF'
        },
        accepts: [
        	ItemTypes.TEXT
        ]
    },
    {
        id: 2,
        elementType: 'Text',
        contentType: 'CONTENT',
        name: 'Text',
        styles: {
        	color: 'black',
			borderWidth: 2,
			borderStyle: 'solid',
            borderColor: 'gray'
        },
        accepts: []
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