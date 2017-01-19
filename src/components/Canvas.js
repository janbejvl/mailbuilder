import React, { PropTypes, Component } from 'react'

import { DropTarget } from 'react-dnd'
import { ItemTypes } from './Constants'

import CanvasElement from './CanvasElement'
import { addElementToCanvas } from './../actions'

const styles = { borderStyle: 'solid', borderWidth: 4, borderColor: '#000000', width: 600, height: 800 }

const canvasTarget = {
    drop(props, monitor) {
        // Obtain the dragged item
        const item = monitor.getItem();
        const isOver = monitor.isOver();
        const isOverCurrent = monitor.isOver({ shallow: true });
        // console.log('add this item to Canvas', item);
        if(isOverCurrent) {
            props.dispatch(addElementToCanvas(item));            
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
    }
}


@DropTarget(ItemTypes.ELEMENT, canvasTarget, collect)
export default class Canvas extends Component { 

  static propTypes = {
    canvasElements: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      elementType: PropTypes.string.isRequired,
      contentType: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      styles: PropTypes.object.isRequired,
      accepts: PropTypes.array.isRequired
    }).isRequired).isRequired,
    // onElementClick: PropTypes.func.isRequired
  }

  render() {
    
    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { canDrop, isOver, isOverCurrent, connectDropTarget } = this.props;
    const { canvasElements, dispatch } = this.props;

    return connectDropTarget(
      <div style={styles}>
        {canvasElements.map((element, index) =>
          <CanvasElement
            key={index}
            {...element}
          />
        )}
      </div>
    );

  } 

}
