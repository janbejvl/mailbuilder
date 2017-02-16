import { connect } from 'react-redux'
import Canvas from './../components/Canvas'



const mapStateToProps = (state) => {

  return {
    layoutElements: state.layoutElements,
    contentElements: state.contentElements
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onElementClick: (element) => {
//       dispatch(() => {})
//     }
//   }
// }

const VisibleCanvas = connect(
  mapStateToProps
)(Canvas)

export default VisibleCanvas
