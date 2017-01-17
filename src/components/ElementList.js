import React, { PropTypes } from 'react'
import Element from './Element'

const styles = {borderStyle: 'solid', borderWidth: 4, borderColor: '#d5d5d5', height: 800}

const ElementList = ({ elements, onElementClick }) => (
	

  <div style={styles}>
    {elements.map(element =>
      <Element
        key={element.id}
        {...element}
        onClick={() => onElementClick(element)}
      />
    )}
  </div>
)

ElementList.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    elementType: PropTypes.string.isRequired,
    contentType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onElementClick: PropTypes.func.isRequired
}

export default ElementList
