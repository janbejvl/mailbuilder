import { connect } from 'react-redux'
import { addElementToCanvas } from './../actions'
import ElementList from './../components/ElementList'

const getVisibleElements = (elements, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return elements
    case 'SHOW_LAYOUT':
      return elements.filter(el => el.contentType === 'LAYOUT')
    case 'SHOW_CONTENT':
      return elements.filter(el => el.contentType === 'CONTENT')
  }
}

const mapStateToProps = (state) => {
  return {
    elements: state.elements
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onElementClick: (element) => {
//       dispatch(addElementToCanvas(element))
//     }
//   }
// }

const VisibleElementList = connect(
  mapStateToProps,
  // mapDispatchToProps
)(ElementList)

export default VisibleElementList