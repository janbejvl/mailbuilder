import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';
import VisibleElementList from './../containers/VisibleElementList'
import VisibleCanvas from './../containers/VisibleCanvas'

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    

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
        )
    }
}
