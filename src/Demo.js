import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { ReactSelectSuggestRedux } from './export.js';

const Demo = () => (
  <div>
    <ReactSelectSuggestRedux
        placeholder="Search..."
        url="https://jsonplaceholder.typicode.com/todos"
        showAttr="title"
        boxHeight="200"
        boxWidth="500"/>
    <span>123</span>    
  </div>
);

export default Demo;
