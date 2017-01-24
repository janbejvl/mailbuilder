import { combineReducers } from 'redux'
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
			height: 204,
			lineHeight: '40px',
			backgroundColor: '#d5d5d5',
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

function canvasElement(state, action) {
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
        childElements: [ ...state.childElements, action.sourceEl ]
      }
    default:
      return state
  }
}


function canvasElements(state = [], action) {
  switch(action.type) {
    case 'ADD_COLUMN':        
      return [
        ...state,
        canvasElement(state, action)
      ]
    case 'ADD_CONTENT':        
      return state.map(c =>
        canvasElement(c, action)
      )
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