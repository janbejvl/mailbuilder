import React, { PropTypes } from 'react'
import Element from './Element'
import OneColumnContainer from './OneColumnContainer'
import Text from './Text'

const styles = {borderStyle: 'solid', borderWidth: 4, borderColor: '#d5d5d5', height: 800}
const appCtx = "LIST"

const ElementList = ({ elements, onElementClick }) => (
	

  <div style={styles}>
    {elements.map(element => {

      switch (element.elementType) {
        case 'OneColumnContainer':
          return (<OneColumnContainer key={element.id} {...element} appCtx={appCtx} onClick={() => onElementClick(element)}
          />) 
          case 'Text':
          return (<Text key={element.id} {...element} appCtx={appCtx} onClick={() => onElementClick(element)}
          />)
        default:
      }
      
    })}
  </div>
)

ElementList.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    elementType: PropTypes.string.isRequired,
    contentType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  // onElementClick: PropTypes.func.isRequired
}

export default ElementList
