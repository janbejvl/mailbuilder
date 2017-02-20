import { combineReducers } from 'redux'

// namapuje objekt objektu do policka
// export const mapEntities = entities => (
//   Object.keys( entities ).map( id => entities[id] )
// )

// const getChildElements = elementIds => {
// 	return elementIds.map(id => content.entities[id]
// }

// const getObject = (item) => {
// 	return {
// 			...item,
// 			[item.childElements]: getChildElements(item.childElements)
// 		}
// }

// export const getCompleteTree = (layout, content) => {
// 	return for(let item in layout.entities) {
// 		getObject(item)
// 	}
// }



export const getAddedIds = state => state.entities.childElements
export const getSingleElementById = (state, id) => {
	return state.entities[id]
}

const addedIds = (state, action) => {
	 switch (action.type) {
    case 'ADD_CONTENT':
      if (state.indexOf(action.elementId) !== -1) {
        return state
      }
      return [ ...state, action.elementId ]
    default:
      return state
  }
}



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


const entities = (state = {}, action) => {
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
}

const result = (state = [], action) => {
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
	entities,
	result
})

export default layoutElements
