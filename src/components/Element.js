import React, { PropTypes } from 'react'

const Element = ({ onClick, elementType, name }) => (

	

  <div onClick={onClick} style={{borderStyle: 'solid',
		borderWidth: 4,
		borderColor: 'red'}}>
    {name}
  </div>
)

Element.propTypes = {
  onClick: PropTypes.func.isRequired,
  elementType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Element
