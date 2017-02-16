import React, { PropTypes, Component } from 'react'

import { DropTarget } from 'react-dnd'
import { ItemTypes } from './Constants'
import { ElementTypes } from './Constants'

import CanvasElement from './CanvasElement'
import { addElementToCanvas } from './../actions'
import OneColumnContainer from './OneColumnContainer'
import Text from './Text'
import { denormalize, schema } from 'normalizr';


const canvasTarget = {
	drop(props, monitor) {
		// Obtain the dragged item
		const item = monitor.getItem();
		const isOver = monitor.isOver();
		const isOverCurrent = monitor.isOver({ shallow: true });

		if(isOverCurrent && item.appCtx === 'LIST') {
			props.dispatch(addElementToCanvas(item));
		}
	}
}


@DropTarget(props => props.accepts, canvasTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	isOverCurrent: monitor.isOver({ shallow: true }),
	canDrop: monitor.canDrop(),
	itemType: monitor.getItemType()
}))
export default class Canvas extends Component { 

	static propTypes = {
		layoutElements: PropTypes.shape({
			entities: PropTypes.objectOf(PropTypes.shape({
				elementType: PropTypes.string.isRequired,
				contentType: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired,
				styles: PropTypes.object.isRequired,
				accepts: PropTypes.array.isRequired,
				childElements: PropTypes.array.isRequired
			}).isRequired).isRequired,
			result: PropTypes.array.isRequired
		}).isRequired,
		contentElements: PropTypes.shape({
			entities: PropTypes.objectOf(PropTypes.shape({
				elementType: PropTypes.string.isRequired,
				contentType: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired,
				styles: PropTypes.object.isRequired
			}).isRequired).isRequired,
			result: PropTypes.array.isRequired
		}).isRequired,
		accepts: PropTypes.array.isRequired
		// onElementClick: PropTypes.func.isRequired
	}

	render() {
		// These props are injected by React DnD,
		// as defined by your `collect` function above:
		const { canDrop, isOver, isOverCurrent, connectDropTarget } = this.props
		const { layoutElements, contentElements, dispatch } = this.props

		let defaultStyles = {
			borderStyle: 'solid',
			borderWidth: 4,
			borderColor: '#000000',
			width: 600,
			height: 800,
			backgroundColor: isOver && isOverCurrent ? 'green' : 'white'
		}

		let le = []

		// const user = new schema.Entity('users');
		// const mySchema = { users: [ user ] }
		// const entities = { users: { '1': { id: 1 }, '2': { id: 2 } } };
		// const denormalizedData2 = denormalize({ users: [ 1, 2 ] }, mySchema, entities);
		// console.log('mySchema schema: ', mySchema)
		// console.log('entities: ', entities)
		// console.log('den data normalizr: ', denormalizedData2)

		
		
		// Object.keys(layoutElements.entities).forEach(id => {
			
		// 	if (layoutElements.entities[id].childElements.length > 0) {
		// 		childElements = layoutElements.entities[id].childElements.map(childId => {
		// 			return contentElements.entities[childId]
		// 		})
		// 	}
		// 	console.log('child elements: ', childElements)
		// })


		if (Object.keys(layoutElements.entities) > 0) {
			// let contentElements2 = new schema.Entity('contentElements2');
			// let layoutElements2 = {	entities: [contentElements2] }
			// let entities = contentElements.entities
			// let denormalizedData = denormalize(o.childElements, layoutElements2, entities)
			// console.log('layout schema: ', layoutElements2)
			// 	console.log('entities2: ', entities)
			// 	console.log('denormalized data: ', denormalizedData)
			Object.keys(layoutElements.entities).forEach(id => {
				let o = layoutElements.entities[id]
				let childElements = []
				if (layoutElements.entities[id].childElements.length > 0) {
					childElements = layoutElements.entities[id].childElements.map(childId => {
						return contentElements.entities[childId]
					})
				}
				
				// o['childElements'] = childElements
				console.log('object: ', o)
				le.push(o)
			})

		}

		

		return connectDropTarget(
			<div style={defaultStyles}>
				{le.map(element => {
					let accepts = []

					switch (element.elementType) {
						case 'OneColumnContainer':
							accepts = [ ElementTypes.TEXT ]
							console.log('rendering element...', element)
							return (<OneColumnContainer key={element.id} {...element} accepts={accepts} dispatch={dispatch} />)

						default:
					}

				})}
			</div>
					
			
		);

	} 

}
