import { combineReducers } from 'redux'

function layoutElement(state, action) {
	switch (action.type) {
		case 'ADD_COLUMN':
			return {
				id: action.id,
				name: action.name,
				elementType: action.elementType,
				contentType: action.contentType,
				styles: action.styles,
				accepts: action.accepts,
				appCtx: action.appCtx,
				childElements: []
			}
		case 'ADD_CONTENT':
			if (state.id !== action.targetEl.id) return state
			action.sourceEl.appCtx = action.targetEl.appCtx
			return {
				...state,
				childElements: [
					...state.childElements,
					action.sourceEl.id
				]
			}
		default:
			return state
	}
}


const byId = (state = {}, action) => {
	switch(action.type) {
		case 'ADD_COLUMN':
			return {
				...state,
				[action.id]: layoutElement(state[action.id], action)
			}
		case 'ADD_CONTENT':
			console.log('updating el with id: ', action.targetEl.id)
			return {
				...state,
				[action.targetEl.id]: layoutElement(state[action.targetEl.id], action)
			}
		default:
			return state
	}
	return state;
}

const allIds = (state = [], action) => {
	switch(action.type) {
		case 'ADD_COLUMN':
			return [
				...state,
				action.id
			]
		default:
			return state
	}
}

const layoutElements = combineReducers({
	byId,
	allIds
})

export default layoutElements
