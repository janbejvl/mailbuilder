import React, { PropTypes, Component } from 'react'
import { DragSource } from 'react-dnd'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from './Constants'
import { ElementTypes } from './Constants'
import { addElementToColumn } from './../actions'


const canvasElementSource = {
  beginDrag(props) {
	return {
		id: props.id,
		elementType: props.elementType,
		contentType: props.contentType,
		name: props.name,
		styles: props.styles,
		accepts: props.accepts
	}
  }
}

const canvasElementTarget = {
  drop(props, monitor) {
    // Obtain the dragged item
    const item = monitor.getItem();
    const isOver = monitor.isOver();
    const isOverCurrent = monitor.isOver({ shallow: true });
    // console.log('add this item to Canvas', item);
    if(isOverCurrent) {
      console.log('item', item);      
      props.dispatch(addElementToColumn(item))
    }
  }
}

@DragSource(ItemTypes.CANVAS_ELEMENT, canvasElementSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@DropTarget(ElementTypes.TEXT, canvasElementTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
}))
export default class CanvasElement extends Component {

	constructor(props) {
		super(props)
	}

	static propTypes = {
    // Injected by React DnD:
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,

    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    elementType: PropTypes.string.isRequired,
    contentType: PropTypes.string.isRequired,
    styles: PropTypes.object.isRequired,
    accepts: PropTypes.array.isRequired
  };

	render() {
		const { isDragging, connectDragSource, connectDropTarget } = this.props
		const { name, elementType, contentType, styles, accepts, onClick } = this.props

		return connectDragSource(connectDropTarget(
		  <div style={styles}>
		    {name}
		  </div>
		))
	}

}
