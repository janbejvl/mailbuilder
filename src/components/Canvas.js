import React, { PropTypes, Component } from 'react'

import { DropTarget } from 'react-dnd'
import { ItemTypes } from './Constants'
import { ElementTypes } from './Constants'

import CanvasElement from './CanvasElement'
import { addElementToCanvas } from './../actions'
import OneColumnContainer from './OneColumnContainer'
import Text from './Text'


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
			byId: PropTypes.objectOf(PropTypes.shape({
				elementType: PropTypes.string.isRequired,
				contentType: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired,
				styles: PropTypes.object.isRequired,
				accepts: PropTypes.array.isRequired,
				childElements: PropTypes.array.isRequired
			}).isRequired).isRequired,
			allIds: PropTypes.array.isRequired
		}).isRequired,
		contentElements: PropTypes.shape({
			byId: PropTypes.objectOf(PropTypes.shape({
				elementType: PropTypes.string.isRequired,
				contentType: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired,
				styles: PropTypes.object.isRequired
			}).isRequired).isRequired,
			allIds: PropTypes.array.isRequired
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

		if (Object.keys(layoutElements.byId) > 0) {

			Object.keys(layoutElements.byId).forEach(key => {
				let o = layoutElements.byId[key]
				le.push(o)
			});

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
