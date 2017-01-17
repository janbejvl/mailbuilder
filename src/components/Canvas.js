import React, { PropTypes } from 'react'
import Element from './Element'

const styles = {borderStyle: 'solid', borderWidth: 4, borderColor: '#000000', height: 800}

const Canvas = ({ canvasElements, onElementClick }) => (
  
  
  <div style={styles}>
    {canvasElements.map((element, index) =>
      <Element
        key={index}
        {...element}
        onClick={() => onElementClick(element)}
      />
    )}
  </div>
)

Canvas.propTypes = {
  canvasElements: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    elementType: PropTypes.string.isRequired,
    contentType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onElementClick: PropTypes.func.isRequired
}

export default Canvas
