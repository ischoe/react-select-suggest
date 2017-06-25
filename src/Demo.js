import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { ReactSelectSuggestRedux } from './export.js';
import { ReactSelectSuggest } from './export.js';
import './Demo.css';


const Demo = () => (
  <div>
    <div className="specificWidth2">
      <ReactSelectSuggest
        placeholder="Search..."
        url="https://jsonplaceholder.typicode.com/todos"
        showAttr="title"
        boxHeight="200"/>
    </div>    
    <br/>
      <ReactSelectSuggest
        placeholder="Search..."
        url="https://jsonplaceholder.typicode.com/todos"
        showAttr="title"
        boxHeight="200"
        boxWidth="500"/>
    <br/>
    <div className="specificWidth">
      <ReactSelectSuggestRedux
          namespace="reactSelectReducer1"
          placeholder="Search..."
          url="https://jsonplaceholder.typicode.com/todos"
          showAttr="title"
          boxHeight="300"/>
    </div>
    <br/>
    <ReactSelectSuggestRedux
          namespace="reactSelectReducer2"
          placeholder="Search..."
          url="https://jsonplaceholder.typicode.com/todos"
          showAttr="title"
          boxWidth="400"
          boxHeight="300"/>
    <br/>
    <ReactSelectSuggestRedux
          placeholder="Search..."
          url="https://jsonplaceholder.typicode.com/todos"
          showAttr="title"
          boxWidth="600"
          boxHeight="600"/>      

  </div>
);

export default Demo;
