import React, { PropTypes, Component } from 'react'
import { DragSource } from 'react-dnd'
import { ItemTypes } from './Constants'
import { ElementTypes } from './Constants'



const textSource = {
  beginDrag(props) {
		return {
			id: props.id,
			elementType: props.elementType,
			contentType: props.contentType,
			name: props.name,
			value: props.value,
			styles: props.styles,
			accepts: props.accepts,
			appCtx: props.appCtx
		}
  }
}

@DragSource(ElementTypes.TEXT, textSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Text extends Component {

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
		const { name, value, elementType, appCtx, onClick } = this.props
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

		const content = (appCtx === 'CANVAS') ? this.props.value : name

		return connectDragSource(
			<div onClick={onClick} style={styles}>
		    {content}
		  </div>
		)
	}

}
