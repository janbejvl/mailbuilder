import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import VisibleElementList from './../containers/VisibleElementList';
import VisibleCanvas from './../containers/VisibleCanvas';


class App extends Component {  

  render() {
    return (
      <div className="row">
        <h1>Hello</h1>
        <div className="col-sm-4">
          <VisibleElementList />
        </div>
        <div className="col-sm-8">
          <VisibleCanvas />
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
