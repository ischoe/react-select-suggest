import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { ReactSelectSuggest } from './export.js';

const Demo = () => (
  <div>
    <ReactSelectSuggest
        placeholder="Search..."
        url="https://jsonplaceholder.typicode.com/todos"
        showAttr="title"
        boxHeight= "200"
        boxWidth="500"/>
  </div>
);

export default Demo;
