import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { ReactSelectSuggestRedux } from './export.js';
import { ReactSelectSuggest } from './export.js';
import './Demo.css';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem : '',
      selectedItemRedux: ''
    };
    this.showSelected = this.showSelected.bind(this);
    this.showSelectedRedux = this.showSelectedRedux.bind(this);
  }

  showSelected(val) {
    this.setState({
      selectedItem: val
    });
  }

  showSelectedRedux(val) {
    this.setState({
      selectedItemRedux: val
    });
  }

  render() {

    const items = [
        {
            title : '123'
        },
        {
            title: 'hi'
        }
    ];

    return(
      <div>
        <div className="specificWidth2">
          <ReactSelectSuggest
            placeholder="Search..."
            url="https://jsonplaceholder.typicode.com/todos"
            showAttr="title"
            boxHeight="200"
            onSelectedChanged={this.showSelected}/>
        </div>
        <br/>
        <span>Selected value : {this.state.selectedItem}</span>
        <br/>
        <br/>
        <div className="specificWidth specialStyle">
          <ReactSelectSuggestRedux
              namespace="reactSelectReducer1"
              placeholder="Search..."
              url="https://jsonplaceholder.typicode.com/todos"
              showAttr="title"
              boxHeight="300"
              boxWidth="200"
              freeTextSelection={false}
              items={items}
              onSelectedChanged={this.showSelectedRedux}/>
        </div>
        <br/>
        <span>Selected value : {this.state.selectedItemRedux}</span>
      </div>
    );
  }
}

export default Demo;
