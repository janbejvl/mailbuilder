import { connect } from 'react-redux'
import Canvas from './../components/Canvas'
import { getChildElements } from '../reducers'
import { mapEntities } from '../reducers/layoutElements'


const mapLayoutEntities = (entities, entities2) => {
  let arr = []
  Object.keys(entities).forEach(id => {
    let newObj = {
      ...entities[id], 
      childElements: entities[id].childElements.map(elementId => {
        return entities2[elementId]
      })
    }
    arr.push(newObj) 
  })

  return arr
}


const mapStateToProps = (state) => { 
  return {
    layoutElements: mapLayoutEntities(state.layoutElements.entities, state.contentElements.entities),
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
