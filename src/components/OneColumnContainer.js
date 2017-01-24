import React, { PropTypes, Component } from 'react'
import { DragSource } from 'react-dnd'
import { DropTarget } from 'react-dnd'

import { ItemTypes } from './Constants'
import { ElementTypes } from './Constants'

import { addElementToCanvas } from './../actions'
import { addContentToColumn } from './../actions'

import Text from './Text'

const defaultStyles = { width: 200, height: 50, display: 'inline-block', borderStyle: 'solid', borderWidth: 4, borderColor: 'red' }

const oneColumnContainerSource = {
  beginDrag(props) {
	return {
		id: props.id,
		elementType: props.elementType,
		contentType: props.contentType,
		name: props.name,
		styles: props.styles,
		accepts: props.accepts,
		appCtx: props.appCtx,
	}
  }
}

const oneColumnContainerTarget = {
	drop(props, monitor, component) {
		// Obtain the dragged item
		const item = monitor.getItem();
		const isOver = monitor.isOver();
		const isOverCurrent = monitor.isOver({ shallow: true });

		if(isOverCurrent) {
			console.log('component receiving', component.props)
			console.log('item adding', item)
			props.dispatch(addContentToColumn(item, component.props));
		}
	}
}


@DragSource(ElementTypes.ONE_COLUMN_CONTAINER, oneColumnContainerSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@DropTarget(props => props.accepts, oneColumnContainerTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	isOverCurrent: monitor.isOver({ shallow: true }),
	canDrop: monitor.canDrop(),
	itemType: monitor.getItemType()
}))
export default class OneColumnContainer extends Component {

	constructor(props) {
		super(props)
	}

	static propTypes = {
		// Injected by React DnD:
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,

		name: PropTypes.string.isRequired,
		elementType: PropTypes.string.isRequired,
		accepts: PropTypes.array.isRequired,
		// onClick: PropTypes.func.isRequired
	};

	render() {
		const { isDragging, connectDragSource, connectDropTarget } = this.props
		const { name, elementType, appCtx, onClick } = this.props
		const { childElements, accepts } = this.props
		const styles = (appCtx === 'CANVAS') ? this.props.styles : defaultStyles

		let elements = []
		if (childElements) {
			elements = childElements.map(childElement => {
				switch (childElement.elementType) {
					case 'Text':
						return (<Text key={childElement.id} {...childElement} />)
					default:
				}
				
			})
		}
		

		return connectDragSource(connectDropTarget(
			<div onClick={onClick} style={styles}>
		    {name}{' '}
		    {elements}
		  </div>
		))
	}

}
