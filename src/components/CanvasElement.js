import React, { PropTypes, Component } from 'react'
import { DragSource } from 'react-dnd'
import { ItemTypes } from './Constants'


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

@DragSource(ItemTypes.CANVAS_ELEMENT, canvasElementSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Element extends Component {

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
		const { isDragging, connectDragSource } = this.props
		const { name, elementType, contentType, styles, accepts, onClick } = this.props

		return connectDragSource(
		  <div style={styles}>
		    {name}
		  </div>
		)
	}

}
