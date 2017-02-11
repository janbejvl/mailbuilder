import React, { PropTypes, Component } from 'react'
import { DragSource } from 'react-dnd'
import { DropTarget } from 'react-dnd'

import { ItemTypes } from './Constants'
import { ElementTypes } from './Constants'

import { addElementToCanvas } from './../actions'
import { addContentToColumn } from './../actions'

import Text from './Text'


const oneColumnContainerSource = {
  beginDrag(props) {
		return {
			id: props.id,
			elementType: props.elementType,
			contentType: props.contentType,
			name: props.name,
			value: props.value,
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
		console.log('item dropping', item)
		if(isOverCurrent && item.appCtx === 'LIST') {
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
		const { isDragging, connectDragSource, connectDropTarget, isOver, isOverCurrent ,canDrop } = this.props
		const { name, elementType, appCtx, onClick } = this.props
		const { childElements, accepts } = this.props

		const defaultStyles = {
			width: 200,
			height: 50,
			display: 'inline-block',
			borderStyle: 'solid',
			borderWidth: 4,
			borderColor: 'red',
			cursor: 'move',
			opacity: isDragging ? 0 : 1
		}
		const styles = (appCtx === 'CANVAS') ? this.props.styles : defaultStyles

		let backgroundColor = isOver && isOverCurrent ? 'aliceblue' : 'white'

		let innerContainerStyles = {
			flex: (appCtx === 'CANVAS') ? 1 : 0,
			lineHeight: (appCtx === 'CANVAS') ? '64px' : 'inherit',
			minHeight: (appCtx === 'CANVAS') ? 64 : 0,
			borderStyle: (appCtx === 'CANVAS') ? 'dashed' : 'solid',
			borderWidth: (appCtx === 'CANVAS') ? 2 : 0,
			color: (appCtx === 'CANVAS') ? 'lightgray' : 'black',
			textAlign: 'center',
			verticalAlign: (appCtx !== 'CANVAS') ? 'baseline' : 'middle'
		}

		let borderColor = (appCtx === 'CANVAS' && isOver && isOverCurrent) ? 'deepskyblue' : 'gainsboro'

		let content
		let elements = []
		let dropArea
		const dropContent = <div style={{ textAlign: 'center', fontSize: 24 }}>Drop here</div>


		if (appCtx === 'CANVAS') {

			if (childElements.length > 0) {
				elements = childElements.map(childElement => {
					switch (childElement.elementType) {
						case 'Text':
							return (<Text key={childElement.id} {...childElement} />)
						default:
					}
				})

				content = elements
				dropArea = dropContent
			}
			else {
				dropArea = dropContent
			}
		}
		else {
			content = name
		}
		

		return connectDragSource(connectDropTarget(
			<div onClick={onClick} style={styles}>
				{content}
				<div style={{...innerContainerStyles, borderColor, backgroundColor}}>
					{dropArea}
				</div>
		  </div>
		))
	}

}
