import React, { PropTypes, Component } from 'react'

import { DropTarget } from 'react-dnd'
import { ItemTypes } from './Constants'
import { ElementTypes } from './Constants'

import CanvasElement from './CanvasElement'
import { addElementToCanvas } from './../actions'
import OneColumnContainer from './OneColumnContainer'
import Text from './Text'

const styles = { borderStyle: 'solid', borderWidth: 4, borderColor: '#000000', width: 600, height: 800 }

const canvasTarget = {
	drop(props, monitor) {
		// Obtain the dragged item
		const item = monitor.getItem();
		const isOver = monitor.isOver();
		const isOverCurrent = monitor.isOver({ shallow: true });

		if(isOverCurrent) {
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
		canvasElements: PropTypes.arrayOf(PropTypes.shape({
			elementType: PropTypes.string.isRequired,
			contentType: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			styles: PropTypes.object.isRequired,
			accepts: PropTypes.array.isRequired,
			childElements: PropTypes.array.isRequired,
		}).isRequired).isRequired,
		accepts: PropTypes.array.isRequired
		// onElementClick: PropTypes.func.isRequired
	}

	render() {
		console.log('...RE-RENDERING CANVAS...')
		// These props are injected by React DnD,
		// as defined by your `collect` function above:
		const { canDrop, isOver, isOverCurrent, connectDropTarget } = this.props
		const { canvasElements, dispatch } = this.props


		return connectDropTarget(
			<div style={styles}>
				{canvasElements.map(element => {
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
