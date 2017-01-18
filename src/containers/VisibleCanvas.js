import { connect } from 'react-redux'
import Canvas from './../components/Canvas'

const mapStateToProps = (state) => {
  return {
    canvasElements: state.canvasElements
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
