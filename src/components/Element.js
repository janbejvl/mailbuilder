import React, { PropTypes, Component } from 'react'
import { DragSource } from 'react-dnd'
import { ItemTypes } from './Constants'

const styles = { width: 200, height: 50, display: 'inline-block', borderStyle: 'solid', borderWidth: 4, borderColor: 'red' }

const elementSource = {
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

@DragSource(ItemTypes.ELEMENT, elementSource, (connect, monitor) => ({
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

    name: PropTypes.string.isRequired,
    elementType: PropTypes.string.isRequired,
    // onClick: PropTypes.func.isRequired
  };

	render() {
		const { isDragging, connectDragSource } = this.props
		const { name, elementType, onClick } = this.props

		return connectDragSource(
			<div onClick={onClick} style={styles}>
		    {name}
		  </div>
		)
	}

}
