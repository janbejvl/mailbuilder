import { combineReducers } from 'redux'
import layoutElements, * as fromLayoutElements  from './layoutElements'
import { ItemTypes } from './../components/Constants'
import { ElementTypes } from './../components/Constants'
import { ContentTypes } from './../components/Constants'

const elementList = [
	{
		id: 1,
		elementType: 'OneColumnContainer',
		contentType: 'LAYOUT',
		name: 'One Column',
		styles: {
			flex: 1,
			padding: 10,
			minHeight: 204,
			lineHeight: '40px',
			backgroundColor: '#ffffff',
			borderWidth: 2,
			borderStyle: 'solid',
			borderColor: '#CC00FF'
		},
		accepts: [
			ElementTypes.TEXT
		]
	},
	{
		id: 2,
		elementType: 'Text',
		contentType: 'CONTENT',
		name: 'Text',
		value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		styles: {
			lineHeight: 1.5,
			color: 'black',
			// borderWidth: 2,
			// borderStyle: 'solid',
		//   borderColor: 'gray',
			textAlign: 'left'
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

function contentElement(state, action) {
	switch (action.type) {
		case 'ADD_CONTENT':
			return {
				id: action.sourceEl.id,
				name: action.sourceEl.name,
				value: action.sourceEl.value ? action.sourceEl.value : "",
				elementType: action.sourceEl.elementType,
				contentType: action.sourceEl.contentType,
				styles: action.sourceEl.styles,
				appCtx: action.sourceEl.appCtx
			}
		default:
			return state
	}
}

const entities = (state = {}, action) => {
	switch(action.type) {
		case 'ADD_CONTENT':
			return {
				...state,
				[action.sourceEl.id]: contentElement(state[action.sourceEl.id], action)
			}
		default:
			return state
	}
}

const result = (state = [], action) => {
	switch(action.type) {
		case 'ADD_CONTENT':
			return [
				...state,
				action.sourceEl.id
			]
		default:
			return state
	}
}

const getAddedIds = state => {
	console.log('state: ', state)
	fromLayoutElements.getAddedIds(state.contentElements)
}
const getSingleElementById = (state, id) => fromLayoutElements.getSingleElementById(state.contentElements, id)

export const getChildElements = (state = {}) => {
	return getAddedIds(state.childElements).map(id => ({
		...getSingleElementById(state, id)
	}))
}



const contentElements = combineReducers({
	entities,
	result
})



const emailApp = combineReducers({
	elements,
	layoutElements,
	contentElements
})

export default emailApp
